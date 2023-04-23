#Create a teacher or list all teachers
from django.db.models import \
    Count
from rest_framework import \
    generics

from api.models import \
    Teacher
from api.serializers import \
    TeacherSerializerList


class TeacherCreateList(generics.ListCreateAPIView):
    serializer_class = TeacherSerializerList
    def get_queryset(self):
        queryset = Teacher.objects\
            .annotate(no_courses=Count('teacher_courses'))
        return queryset