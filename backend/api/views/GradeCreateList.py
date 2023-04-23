#Create a student or list all students
from django.db.models import \
    Q
from rest_framework import \
    generics

from api.models import \
    Grade
from api.serializers import \
    GradeSerializerDetailsPartial


class GradeCreateList(generics.ListCreateAPIView):
    serializer_class = GradeSerializerDetailsPartial
    queryset = Grade.objects.all()

    def get_queryset(self):
        queryset = Grade.objects.all()
        min_grade = self.request.query_params.get('final-gte')
        if min_grade is not None:
            queryset = queryset.filter(Q(session__gte=min_grade) | Q(retake__gte=min_grade))
        return queryset