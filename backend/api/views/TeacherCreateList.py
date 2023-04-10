#Create a teacher or list all teachers
from rest_framework import \
    generics

from backend.api.models import \
    Teacher
from backend.api.serializers import \
    TeacherSerializerList


class TeacherCreateList(generics.ListCreateAPIView):
    serializer_class = TeacherSerializerList
    queryset = Teacher.objects.all()