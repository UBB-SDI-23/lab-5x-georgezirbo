from django.db.models import fields
from rest_framework import serializers
from .models import *


class GradeSerializerList(serializers.ModelSerializer):

    class Meta:
        model = Grade
        fields = '__all__'



class GradeSerializerDetailsPartial(serializers.ModelSerializer):
    course_name = serializers.CharField(source='course.name', read_only=True)
    student_fname = serializers.CharField(source='student.fname', read_only=True)
    student_lname = serializers.CharField(source='student.lname', read_only=True)

    class Meta:
        model = Grade
        fields = ('gid', 'course', 'course_name', 'student', 'student_fname', 'student_lname','session', 'retake')

class StudentSerializerList(serializers.ModelSerializer):
    no_courses = serializers.IntegerField(read_only=True, required=False)
    class Meta:
        model = Student
        fields = ('sid', 'fname', 'lname', 'cnp', 'email', 'phone', 'no_courses')


class StudentSerializerDetails(serializers.ModelSerializer):
    grades = GradeSerializerDetailsPartial(source='student_grades', read_only=True, required=False, many=True)

    class Meta:
        model = Student
        fields = ('sid', 'fname', 'lname', 'cnp', 'email', 'phone', 'grades')
        depth = 1

class CourseSerializerList(serializers.ModelSerializer):
    teacher_fname = serializers.CharField(source='teacher.fname',read_only=True, required=False)
    teacher_lname = serializers.CharField(source='teacher.lname',read_only=True, required=False)
    no_students = serializers.IntegerField(read_only=True, required=False)
    class Meta:
        model = Course
        fields = ('cid', 'name', 'university', 'faculty', 'department', 'teacher','teacher_fname', 'teacher_lname', 'year', 'no_students')

class CourseSerializerListSimple(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('cid', 'name', 'university', 'faculty', 'department', 'teacher', 'year')

class CourseSerializerDetails(serializers.ModelSerializer):
    grades = GradeSerializerDetailsPartial(source='course_grades', read_only=True, required=False, many=True)

    class Meta:
        model = Course
        fields = ('cid', 'name', 'university', 'faculty', 'department', 'teacher', 'year', 'grades')
        #depth=1


class GradeSerializerDetails(serializers.ModelSerializer):
    student_fname = serializers.CharField(source='student.fname',read_only=True, required=False)
    student_lname = serializers.CharField(source='student.lname',read_only=True, required=False)
    course_name = serializers.CharField(source='course.name',read_only=True, required=False)
    class Meta:
        model = Grade
        fields = ('gid', 'course', 'course_name', 'student', 'student_fname', 'student_lname', 'session', 'retake')

class TeacherSerializerList(serializers.ModelSerializer):
    no_courses = serializers.IntegerField(read_only=True, required=False)
    class Meta:
        model = Teacher
        fields = ('tid', 'fname', 'lname', 'rank', 'no_courses')

class TeacherSerializerDetails(serializers.ModelSerializer):
    courses = CourseSerializerListSimple(source='teacher_courses', read_only=True, required=False, many=True)
    class Meta:
        model = Teacher
        fields = ('fname', 'lname', 'rank', 'courses')

class StudentAverageSerializer(serializers.ModelSerializer):
    avg_grade = serializers.FloatField()
    class Meta:
        model = Student
        fields = ('sid', 'fname', 'lname', 'cnp', 'email', 'phone', 'avg_grade')

class CourseNoStudentsSerializer(serializers.ModelSerializer):
    no_students = serializers.IntegerField()
    class Meta:
        model = Course
        fields = ('cid', 'name', 'university', 'faculty', 'department', 'teacher', 'year', 'no_students')

