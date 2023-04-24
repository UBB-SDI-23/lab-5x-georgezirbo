#Create a teacher or list all teachers
from django.db.models import \
    Count
from rest_framework import \
    generics

from api.models import \
    Teacher
from api.serializers import \
    TeacherSerializerList
from api.views.Pagination import \
    CustomPagination


class TeacherCreateList(generics.ListCreateAPIView):
    serializer_class = TeacherSerializerList
    pagination_class = CustomPagination
    def get_queryset(self):
        queryset = Teacher.objects\
            .annotate(no_courses=Count('teacher_courses'))
        return queryset