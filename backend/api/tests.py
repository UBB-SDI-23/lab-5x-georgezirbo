import json
from rest_framework import status
from rest_framework.test import APITestCase
from .serializers import *

class UnitTests(APITestCase):

    def setUp(self):
        Student.objects.create(sid=1, fname='Sam', lname='Zirbo', cnp='5021020125794', email='sam.zirbo@stud.com', phone='0751934147')
        Student.objects.create(sid=2, fname='Luke', lname='Jordan', cnp='1650421519333', email='luke.jordan@stud.com', phone='0760926418')
        Student.objects.create(sid=3, fname='Lydia', lname='Alvarado', cnp='2611002971531', email='lydia.alvarado@stud.com', phone='0744438919')
        Student.objects.create(sid=4, fname='Hadley', lname='Vu', cnp='2010326611070', email='hadley.vu@stud.com',phone='0775566706')
        Student.objects.create(sid=5, fname='Peyton', lname='Valdez', cnp='6171129592270',email='peyton.valdez@stud.com', phone='0710063307')
        Teacher.objects.create(tid=1, fname='Anna', lname='Adams', rank='L')
        Course.objects.create(cid=1, name='Systems for Design and Implementation', university='UBB', faculty='Mathematics and Computer Science', department='Computer Science', year=2022,teacher_id=1)
        Course.objects.create(cid=2, name='Artificial Intelligence', university='UBB', faculty='Mathematics and Computer Science', department='Computer Science', year=2022,teacher_id=1)
        Course.objects.create(cid=3, name='Databases', university='UBB', faculty='Mathematics and Computer Science', department='Computer Science', year=2022,teacher_id=1)
        Grade.objects.create(gid=1, course_id=1, student_id=1, session=5.6, retake=7.4)
        Grade.objects.create(gid=2, course_id=1, student_id=2, session=7.5)
        Grade.objects.create(gid=3, course_id=2, student_id=3, session=4.3, retake=5.9)
        Grade.objects.create(gid=4, course_id=2, student_id=4, session=8.9)
        Grade.objects.create(gid=5, course_id=2, student_id=5, session=9.2, retake=10)

    def test_filtering(self):
        min_grade = 6
        response = self.client.get('/api/grade/?session-gte='+ str(min_grade))
        data = json.loads(response.content)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(data), 3)
        self.assertEqual(data[0]['gid'], 2)
        self.assertEqual(data[1]['gid'], 4)
        self.assertEqual(data[2]['gid'], 5)

        # expected = list(Grade.objects.filter(session__gte=min_grade).values('gid', 'session', 'retake', 'course', 'student'))
        # self.assertEqual(response, expected)

    def test_students_by_average(self):
        response = self.client.get('/api/student/by-average/')
        data = json.loads(response.content)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(data), 5)
        self.assertEqual(data[0]['sid'], 5)
        self.assertEqual(data[1]['sid'], 4)
        self.assertEqual(data[2]['sid'], 2)
        self.assertEqual(data[3]['sid'], 1)
        self.assertEqual(data[4]['sid'], 3)

    def test_courses_by_no_students(self):
        response = self.client.get('/api/course/no-students/')
        data = json.loads(response.content)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(data), 3)
        self.assertEqual(data[0]['cid'], 2)
        self.assertEqual(data[1]['cid'], 1)
        self.assertEqual(data[2]['cid'], 3)

