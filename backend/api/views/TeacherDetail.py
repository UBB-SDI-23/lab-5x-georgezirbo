from rest_framework import \
    generics

from api.models import \
    Teacher
from api.serializers import \
    TeacherSerializerDetails


class TeacherDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TeacherSerializerDetails
    queryset = Teacher.objects.all()