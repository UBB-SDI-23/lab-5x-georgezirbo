#Create a student or list all students
from rest_framework import \
    generics

from backend.api.models import \
    Grade
from backend.api.serializers import \
    GradeSerializerList


class GradeCreateList(generics.ListCreateAPIView):
    serializer_class = GradeSerializerList
    queryset = Grade.objects.all()

    def get_queryset(self):
        queryset = Grade.objects.all()
        min_grade = self.request.query_params.get('session-gte')
        if min_grade is not None:
            queryset = queryset.filter(session__gte=min_grade)
        return queryset