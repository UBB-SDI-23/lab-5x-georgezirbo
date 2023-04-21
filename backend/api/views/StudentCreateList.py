#Create a student or list all students
from rest_framework import \
    generics

from api.models import \
    Student
from api.serializers import \
    StudentSerializerList


class StudentCreateList(generics.ListCreateAPIView):
    serializer_class = StudentSerializerList
    queryset = Student.objects.all()