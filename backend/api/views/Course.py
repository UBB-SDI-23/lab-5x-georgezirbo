import \
    time

from django.db.models import \
    Q, \
    Count
from django.forms import \
    model_to_dict
from rest_framework import \
    generics, \
    status
from rest_framework.permissions import \
    IsAuthenticatedOrReadOnly
from rest_framework.response import \
    Response

from api.models import \
    Course, \
    Teacher
from api.pagination import \
    CustomPagination
from api.permissions import \
    HasEditPermissionOrReadOnly
from api.serializers import \
    CourseSerializer


class CourseView(generics.GenericAPIView):
    serializer_class = CourseSerializer
    pagination_class = CustomPagination
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Course.objects.all().order_by('cid')

    def get(self, request, *args, **kwargs):
        start_time = time.time()
        queryset = self.paginate_queryset(Course.objects.all().order_by('cid'))
        serializer = CourseSerializer(queryset, many=True, exclude_fields=['grades'])
        for course in serializer.data:
            course['no_students'] = Course.objects.filter(pk=course['cid']).annotate(no_students=Count('students')).values_list('no_students', flat=True)[0]
        elapsed_time = time.time() - start_time
        print(f"GET COURSES: {elapsed_time}")
        return self.get_paginated_response(serializer.data)


    def post(self, request, *args, **kwargs):
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CourseDetailView(generics.GenericAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly, HasEditPermissionOrReadOnly]
    serializer_class = CourseSerializer

    def get(self, request, pk, *args, **kwargs):
        try:
            student = Course.objects.get(pk=pk)
            serializer = self.get_serializer(student, exclude_fields=['no_students'])
            return Response(serializer.data)
        except Course.DoesNotExist:
            return Response({'error': 'Course does not exist'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk, *args, **kwargs):
        try:
            course = Course.objects.get(pk=pk)
            self.check_object_permissions(request, course)
            serializer = self.get_serializer(course, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Course.DoesNotExist:
            return Response({'error': 'Course does not exist'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk, *args, **kwargs):
        try:
            course = Course.objects.get(pk=pk)
            self.check_object_permissions(request, course)
            course.delete()
            return Response({'message': 'Course deleted'}, status=status.HTTP_204_NO_CONTENT)
        except Course.DoesNotExist:
            return Response({'error': 'Course does not exist'}, status=404)

class CoursesNoStudentsView(generics.GenericAPIView):
    serializer_class = CourseSerializer
    pagination_class = CustomPagination
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Course.objects.all()\
            .prefetch_related('course_grades')\
            .annotate(no_students=Count('course_grades__student'))\
            .order_by('-no_students')

    def get(self, request, *args, **kwargs):
        start_time = time.time()
        print(self.get_queryset().explain())
        serializer = self.get_serializer(self.paginate_queryset(self.get_queryset()), exclude_fields=['grades', 'teacher'], many=True)
        elapsed_time = time.time() - start_time  # Calculate the elapsed time
        print(f"GET COURSES BY NO STUDENTS: {elapsed_time}")
        return self.get_paginated_response(serializer.data)

class CourseAutocompleteView(generics.GenericAPIView):
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, *args, **kwargs):
        start_time = time.time()
        serializer = CourseSerializer(self.get_queryset(),many=True, exclude_fields=['teacher', 'grades', 'teacher_name'])
        elapsed_time = time.time() - start_time  # Calculate the elapsed time
        print(f"GET COURSES AUTOCOMPLETE: {elapsed_time}")
        return Response(serializer.data)

    def get_queryset(self):
        query = self.request.GET.get('query')
        # SELECT * FROM course WHERE to_tsvector(name) @@ to_tsquery(query)
        courses = Course.objects.filter(name__icontains=query).order_by('name')[:20]
        return courses
