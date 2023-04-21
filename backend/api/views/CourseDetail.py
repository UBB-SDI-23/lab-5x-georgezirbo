#Get, Update or Delete a student
from rest_framework import \
    generics

from api.models import \
    Course
from api.serializers import \
    CourseSerializerDetails


class CourseDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CourseSerializerDetails
    queryset = Course.objects.all()