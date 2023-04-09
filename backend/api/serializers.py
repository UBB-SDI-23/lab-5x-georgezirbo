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


class StudentSerializerList(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'


class StudentSerializerDetails(serializers.ModelSerializer):
    grades = GradeSerializerList(source='student_grades', read_only=True, required=False, many=True)

    class Meta:
        model = Student
        fields = ('sid', 'fname', 'lname', 'cnp', 'email', 'phone', 'grades')
        depth = 1

class CourseSerializerList(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class CourseSerializerDetails(serializers.ModelSerializer):
    grades = GradeSerializerList(source='course_grades', required=False, many=True)

    class Meta:
        model = Course
        fields = ('cid', 'name', 'university', 'faculty', 'department', 'teacher', 'year', 'grades')
        depth=1

class TeacherSerializerList(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = '__all__'

class TeacherSerializerDetails(serializers.ModelSerializer):
    courses = CourseSerializerList(source='teacher_courses', required=False, many=True)
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
