#Get, Update or Delete a student
from rest_framework import \
    generics

from backend.api.models import \
    Course
from backend.api.serializers import \
    CourseSerializerDetails


class CourseDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CourseSerializerDetails
    queryset = Course.objects.all()