from django.db.models import \
    Count
from rest_framework import \
    generics

from api.models import \
    Course
from api.serializers import \
    CourseSerializerList


class CoursesNoStudents(generics.ListAPIView):
    serializer_class = CourseSerializerList

    def get_queryset(self):
        queryset = Course.objects\
            .annotate(no_students=Count('course_grades__student'))\
            .order_by('-no_students')
        return queryset

