from django.db.models import \
    Count
from rest_framework import \
    generics

from api.models import \
    Course
from api.serializers import \
    CourseSerializerList
from api.views.Pagination import \
    CustomPagination


class CoursesNoStudents(generics.ListAPIView):
    serializer_class = CourseSerializerList
    pagination_class = CustomPagination

    def get_queryset(self):
        page = self.request.query_params.get('page')
        page_size= self.request.query_params.get('page_size')
        queryset = Course.objects\
            .annotate(no_students=Count('course_grades__student'))\
            .order_by('-no_students')
        return queryset

