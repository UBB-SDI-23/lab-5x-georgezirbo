import \
    time

from django.db.models import \
    Count, \
    Avg, \
    Q,\
    F
from django.db.models.functions import \
    Round, \
    Greatest

from rest_framework import \
    status, \
    generics
from rest_framework.response import \
    Response

from api.models import \
    Student
from api.serializers import \
    StudentSerializer
from api.pagination import \
    CustomPagination


class StudentView(generics.GenericAPIView):

    serializer_class = StudentSerializer
    pagination_class = CustomPagination
    queryset = Student.objects.all().order_by('sid')

    def get(self, request, *args, **kwargs):
        start_time = time.time()
        queryset = self.paginate_queryset(Student.objects.all().order_by('sid'))
        serializer = StudentSerializer(queryset, many=True, exclude_fields=['courses', 'grades'])
        for student in serializer.data:
            student['no_courses'] = Student.objects.filter(pk=student['sid']).annotate(no_courses=Count('courses')).values_list('no_courses', flat=True)[0]
        elapsed_time = time.time() - start_time
        print(f"GET STUDENTS: {elapsed_time}")
        return self.get_paginated_response(serializer.data)


    def post(self, request, *args, **kwargs):
        serializer = StudentSerializer(data=request.data, exclude_fields=['courses', 'grades'])
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StudentDetailView(generics.GenericAPIView):
    serializer_class = StudentSerializer
    queryset = Student.objects.all()

    def get(self, request, pk, *args, **kwargs):
        try:
            student = Student.objects.filter(pk=pk).annotate(avg_grade=Round(Avg(Greatest('student_grades__session', 'student_grades__retake')),2))
            serializer = StudentSerializer(student, many=True, exclude_fields=['courses', 'no_courses'])
            return Response(serializer.data[0])
        except Student.DoesNotExist:
            return Response({'Error': 'Student does not exist'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk, *args, **kwargs):
        try:
            student = Student.objects.get(pk=pk)
            serializer = StudentSerializer(student, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Student.DoesNotExist:
            return Response({'error': 'Student does not exist'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk, *args, **kwargs):
        try:
            student = Student.objects.get(pk=pk)
            student.delete()
            return Response({'message': 'Student deleted'}, status=status.HTTP_204_NO_CONTENT)
        except Student.DoesNotExist:
            return Response({'error': 'Student does not exist'}, status=status.HTTP_404_NOT_FOUND)

class StudentByAverageView(generics.GenericAPIView):
    serializer_class = StudentSerializer
    pagination_class = CustomPagination
    queryset = Student.objects.all()\
            .annotate(avg_grade=Round(Avg(Greatest('student_grades__session', 'student_grades__retake')), 2))\
            .order_by(F('avg_grade').desc(nulls_last=True))

    def get(self, request, *args, **kwargs):
        start_time = time.time()
        print(self.get_queryset().explain())
        serializer = self.get_serializer(self.paginate_queryset(self.get_queryset()), many=True, exclude_fields=['courses', 'grades'])
        elapsed_time = time.time() - start_time  # Calculate the elapsed time
        print(f"GET STUDEENTS BY AVERAGE: {elapsed_time}")
        return self.get_paginated_response(serializer.data)


class StudentAutocompleteView(generics.GenericAPIView):
    serializer_class = StudentSerializer

    def get_queryset(self):
        start_time = time.time()
        query = self.request.GET.get('query')
        # SELECT * FROM student WHERE to_tsvector(name) @@ to_tsquery(query)
        queryset = Student.objects.filter(
            Q(fname__icontains=query) | Q(lname__icontains=query)
        ).order_by('fname').order_by('sid')[:20]
        elapsed_time = time.time() - start_time  # Calculate the elapsed time
        print(f"GET STUDENTS AUTCOMPLETE: {elapsed_time}")
        return queryset

    def get(self, request, *args, **kwargs):
        serializer = StudentSerializer(self.get_queryset(), many=True, exclude_fields=['email', 'phone', 'grades', 'courses', 'no_courses', 'avg_grade'])
        return Response(serializer.data)