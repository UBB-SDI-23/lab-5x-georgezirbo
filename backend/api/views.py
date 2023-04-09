from django.db.models.functions import \
    Greatest, \
    Round
from rest_framework import \
    generics, \
    status
from rest_framework.response import \
    Response

from .serializers import *
from django.db.models import Q, Avg, Max, F, Count


#Create a student or list all students
class StudentCreateList(generics.ListCreateAPIView):
    serializer_class = StudentSerializerList
    queryset = Student.objects.all()

#Get, Update or Delete a student
class StudentDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = StudentSerializerDetails
    queryset = Student.objects.all()

#Create a student or list all students
class GradeCreateList(generics.ListCreateAPIView):
    serializer_class = GradeSerializerList
    queryset = Grade.objects.all()

    def get_queryset(self):
        queryset = Grade.objects.all()
        min_grade = self.request.query_params.get('session-gte')
        if min_grade is not None:
            queryset = queryset.filter(session__gte=min_grade)
        return queryset

#Get, Update or Delete a student
class GradeDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = GradeSerializerDetails
    queryset = Grade.objects.all()


#Create a student or list all students
class CourseCreateList(generics.ListCreateAPIView):
    serializer_class = CourseSerializerList
    queryset = Course.objects.all()

#Get, Update or Delete a student
class CourseDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CourseSerializerDetails
    queryset = Course.objects.all()

#Create a teacher or list all teachers
class TeacherCreateList(generics.ListCreateAPIView):
    serializer_class = TeacherSerializerList
    queryset = Teacher.objects.all()

class TeacherDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TeacherSerializerDetails
    queryset = Teacher.objects.all()

class StudentByAverage(generics.ListAPIView):
    serializer_class = StudentAverageSerializer

    def get_queryset(self):
        queryset = Student.objects\
            .annotate(avg_grade=Round(Avg(Greatest('student_grades__session', 'student_grades__retake')),2))\
            .order_by(F('avg_grade').desc(nulls_last=True))
        return queryset

class CoursesNoStudents(generics.ListAPIView):
    serializer_class = CourseNoStudentsSerializer

    def get_queryset(self):
        queryset = Course.objects\
            .annotate(no_students=Count('course_grades__student'))\
            .order_by('-no_students')
        return queryset

