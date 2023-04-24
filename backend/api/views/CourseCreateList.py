#Create a student or list all students
from django.db.models import \
    Count
from drf_spectacular.utils import \
    F
from rest_framework import \
    generics

from api.models import \
    Course
from api.serializers import \
    CourseSerializerList


class CourseCreateList(generics.ListCreateAPIView):
    serializer_class = CourseSerializerList
    def get_queryset(self):
        queryset = Course.objects\
            .annotate(no_students=Count('course_grades__student'))
        return queryset[:200]