from django.db.models import fields
from rest_framework import serializers
from .models import *


class GradeSerializerList(serializers.ModelSerializer):

    class Meta:
        model = Grade
        fields = '__all__'


class GradeSerializerDetails(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = '__all__'
        depth = 1

class GradeSerializerDetailsPartial(serializers.ModelSerializer):
    course_name = serializers.CharField(source='course.name', read_only=True)
    student_fname = serializers.CharField(source='student.fname', read_only=True)
    student_lname = serializers.CharField(source='student.lname', read_only=True)

    class Meta:
        model = Grade
        fields = ('gid', 'course', 'course_name', 'student', 'student_fname', 'student_lname','session', 'retake')

class StudentSerializerList(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'


class StudentSerializerDetails(serializers.ModelSerializer):
    grades = GradeSerializerDetailsPartial(source='student_grades', read_only=True, required=False, many=True)

    class Meta:
        model = Student
        fields = ('sid', 'fname', 'lname', 'cnp', 'email', 'phone', 'grades')
        depth = 1

class CourseSerializerList(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class CourseSerializerDetails(serializers.ModelSerializer):
    grades = GradeSerializerDetailsPartial(source='course_grades', read_only=True, required=False, many=True)

    class Meta:
        model = Course
        fields = ('cid', 'name', 'university', 'faculty', 'department', 'teacher', 'year', 'grades')
        depth=1

class TeacherSerializerList(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = '__all__'

class TeacherSerializerDetails(serializers.ModelSerializer):
    courses = CourseSerializerList(source='teacher_courses', read_only=True, required=False, many=True)
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
        fields = ('cid', 'name', 'university', 'faculty', 'teacher', 'no_students')

