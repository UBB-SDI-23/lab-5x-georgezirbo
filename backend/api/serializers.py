from django.db.models import fields
from rest_framework import serializers
from rest_framework_simplejwt.serializers import \
    TokenObtainPairSerializer

from .models import *

class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` argument that
    controls which fields should be displayed.
    """

    def __init__(self, *args, **kwargs):
        kwargs.pop('fields', None)
        include_fields = kwargs.pop('include_fields', None)
        exclude_fields = kwargs.pop('exclude_fields', None)

        # Instantiate the superclass normally
        super().__init__(*args, **kwargs)

        if include_fields is not None:
            for field in include_fields:
                self.fields.__setitem__(field, self.fields[field])
        if exclude_fields is not None:
            for field in exclude_fields:
                split = field.split('__')
                to_access = self.fields
                for i in range(len(split)-1):
                    to_access = to_access.get(split[i])
                if isinstance(to_access, serializers.ListSerializer):
                    to_access = to_access.child
                to_access.fields.pop(split[-1])

class NameSerializerField(serializers.Field):
    def to_representation(self, value):
        return f"{value.fname} {value.lname}"

class GradeSerializer(DynamicFieldsModelSerializer):
    username = serializers.CharField(max_length=50, read_only=True, source='user.username')
    course_name = serializers.CharField(source='course.name', read_only=True)
    student_name = NameSerializerField(source='student', read_only=True)

    class Meta:
        model = Grade
        fields = ('gid', 'course', 'course_name', 'student', 'student_name', 'session', 'retake', 'user', 'username')

class StudentSerializer(DynamicFieldsModelSerializer):
    username = serializers.CharField(max_length=50, read_only=True, source='user.username')
    avg_grade = serializers.FloatField(read_only=True)
    no_courses = serializers.IntegerField(read_only=True)
    grades = GradeSerializer(source='student_grades', exclude_fields=['student', 'student_name'], read_only=True, required=False, many=True)

    class Meta:
        model = Student
        fields = ('sid', 'fname', 'lname', 'cnp', 'email', 'phone', 'avg_grade','grades', 'courses', 'no_courses', 'user', 'username')


class CourseSerializer(DynamicFieldsModelSerializer):
    username = serializers.CharField(max_length=50, read_only=True, source='user.username')
    teacher_name = NameSerializerField(source='teacher',read_only=True, required=False)
    no_students = serializers.IntegerField(read_only=True, required=False)
    grades = GradeSerializer(source='course_grades', exclude_fields=['course_name', 'course', 'student'], read_only=True, required=False, many=True)

    class Meta:
        model = Course
        fields = ('cid', 'name', 'university', 'faculty', 'department', 'teacher', 'teacher_name', 'year', 'no_students', 'grades', 'user', 'username')

class TeacherSerializer(DynamicFieldsModelSerializer):
    username = serializers.CharField(max_length=50, read_only=True, source='user.username')
    no_courses = serializers.IntegerField(read_only=True, required=False)
    courses = CourseSerializer(source='teacher_courses', exclude_fields=['teacher', 'teacher_name', 'no_students', 'grades'], read_only=True, required=False, many=True)
    class Meta:
        model = Teacher
        fields = ('tid', 'fname', 'lname', 'rank', 'no_courses', 'courses', 'descr', 'user', 'username')

class UserSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class ProfileSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class DefaultPageSizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DefaultPageSize
        fields = '__all__'

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['is_superuser'] = user.is_superuser
        token['is_staff'] = user.is_staff
        token['is_active'] = user.is_active
        return token


