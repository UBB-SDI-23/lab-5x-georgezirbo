#Create a teacher or list all teachers
from rest_framework import \
    generics

from api.models import \
    Teacher
from api.serializers import \
    TeacherSerializerList


class TeacherCreateList(generics.ListCreateAPIView):
    serializer_class = TeacherSerializerList
    queryset = Teacher.objects.all()