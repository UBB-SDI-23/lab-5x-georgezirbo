#Create a student or list all students
from rest_framework import \
    generics

from api.models import \
    Course
from api.serializers import \
    CourseSerializerList


class CourseCreateList(generics.ListCreateAPIView):
    serializer_class = CourseSerializerList
    queryset = Course.objects.all()