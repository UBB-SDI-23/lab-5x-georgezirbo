from django.db.models import \
    Count
from rest_framework import \
    generics

from backend.api.models import \
    Course
from backend.api.serializers import \
    CourseNoStudentsSerializer


class CoursesNoStudents(generics.ListAPIView):
    serializer_class = CourseNoStudentsSerializer

    def get_queryset(self):
        queryset = Course.objects\
            .annotate(no_students=Count('course_grades__student'))\
            .order_by('-no_students')
        return queryset

