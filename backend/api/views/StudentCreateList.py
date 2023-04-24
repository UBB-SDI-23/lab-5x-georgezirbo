#Create a student or list all students
from django.db.models import \
    Count
from rest_framework import \
    generics

from api.models import \
    Student
from api.serializers import \
    StudentSerializerList


class StudentCreateList(generics.ListCreateAPIView):
    serializer_class = StudentSerializerList
    def get_queryset(self):
        queryset = Student.objects\
            .annotate(no_courses=Count('student_grades__course'))
        return queryset[:100]