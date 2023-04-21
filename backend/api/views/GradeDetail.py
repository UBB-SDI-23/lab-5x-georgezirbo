from rest_framework import \
    generics

from api.models import \
    Grade
from api.serializers import \
    GradeSerializerDetails


#Get, Update or Delete a student
class GradeDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = GradeSerializerDetails
    queryset = Grade.objects.all()