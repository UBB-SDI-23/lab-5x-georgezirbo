import \
    time

from django.db.models import \
    Count, \
    Q
from rest_framework import \
    generics, \
    status
from rest_framework.response import \
    Response

from api.models import \
    Teacher
from api.pagination import \
    CustomPagination
from api.serializers import \
    TeacherSerializer


class TeacherView(generics.GenericAPIView):
    serializer_class = TeacherSerializer
    pagination_class = CustomPagination
    queryset = Teacher.objects.all().order_by('tid')

    def get(self, request, *args, **kwargs):
        start_time = time.time()
        queryset = self.paginate_queryset(Teacher.objects.all().order_by('tid'))
        serializer = TeacherSerializer(queryset, many=True, exclude_fields=['courses'])
        for teacher in serializer.data:
            teacher['no_courses'] = Teacher.objects.filter(pk=teacher['tid']).annotate(no_courses=Count('teacher_courses')).values_list('no_courses', flat=True)[0]
        elapsed_time = time.time() - start_time  # Calculate the elapsed time
        print(f"GET TEACHERS: {elapsed_time}")
        return self.get_paginated_response(serializer.data)


    def post(self, request, *args, **kwargs):
        serializer = TeacherSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TeacherDetailView(generics.GenericAPIView):
    serializer_class = TeacherSerializer

    def get(self, request, pk, *args, **kwargs):
        try:
            teacher = Teacher.objects.get(pk=pk)
            serializer = self.get_serializer(teacher, exclude_fields=['no_courses'])
            return Response(serializer.data)
        except Teacher.DoesNotExist:
            return Response({'error': 'Teacher does not exist'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk, *args, **kwargs):
        try:
            teacher = Teacher.objects.get(pk=pk)
            serializer = self.get_serializer(teacher, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Teacher.DoesNotExist:
            return Response({'error': 'Teacher does not exist'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk, *args, **kwargs):
        try:
            teacher = Teacher.objects.get(pk=pk)
            teacher.delete()
            return Response({'message': 'Teacher deleted'}, status=status.HTTP_204_NO_CONTENT)
        except Teacher.DoesNotExist:
            return Response({'error': 'Teacher does not exist'}, status=404)

class TeacherAutocompleteView(generics.GenericAPIView):
    serializer_class = TeacherSerializer

    def get(self, request, *args, **kwargs):
        start_time = time.time()
        serializer = TeacherSerializer(self.get_queryset(), many=True)
        elapsed_time = time.time() - start_time  # Calculate the elapsed time
        print(f"GET TEACHER AUTOCOMPLETE: {elapsed_time}")
        return Response(serializer.data)

    def get_queryset(self):
        query = self.request.GET.get('query')
        # SELECT * FROM teacher WHERE to_tsvector(name) @@ to_tsquery(query)
        teachers = Teacher.objects.filter(
            Q(fname__icontains=query) | Q(lname__icontains=query)
        ).order_by('fname')[:20]
        return teachers
