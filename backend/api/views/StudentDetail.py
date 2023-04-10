#Get, Update or Delete a student
from rest_framework import \
    generics

from backend.api.models import \
    Student
from backend.api.serializers import \
    StudentSerializerDetails


class StudentDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = StudentSerializerDetails
    queryset = Student.objects.all()
