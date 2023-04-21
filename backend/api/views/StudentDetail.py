#Get, Update or Delete a student
from rest_framework import \
    generics

from api.models import \
    Student
from api.serializers import \
    StudentSerializerDetails


class StudentDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = StudentSerializerDetails
    queryset = Student.objects.all()
