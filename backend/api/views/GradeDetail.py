from rest_framework import \
    generics

from backend.api.models import \
    Grade
from backend.api.serializers import \
    GradeSerializerDetails


#Get, Update or Delete a student
class GradeDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = GradeSerializerDetails
    queryset = Grade.objects.all()