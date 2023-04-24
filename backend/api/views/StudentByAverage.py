from django.db.models import \
    Avg
from django.db.models.functions import \
    Round, \
    Greatest
from django.db.models import F

from rest_framework import \
    generics

from api.models import \
    Student
from api.serializers import \
    StudentAverageSerializer
from api.views.Pagination import \
    CustomPagination


class StudentByAverage(generics.ListAPIView):
    serializer_class = StudentAverageSerializer
    pagination_class = CustomPagination
    def get_queryset(self):
        queryset = Student.objects\
            .annotate(avg_grade=Round(Avg(Greatest('student_grades__session', 'student_grades__retake')),2))\
            .order_by(F('avg_grade').desc(nulls_last=True))
        return queryset
