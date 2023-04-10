from rest_framework import \
    generics

from backend.api.models import \
    Teacher
from backend.api.serializers import \
    TeacherSerializerDetails


class TeacherDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TeacherSerializerDetails
    queryset = Teacher.objects.all()