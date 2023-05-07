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
    Grade
from api.pagination import \
    CustomPagination
from api.serializers import \
    GradeSerializer


class GradeView(generics.GenericAPIView):
    serializer_class = GradeSerializer
    pagination_class = CustomPagination

    def get(self, request, *args, **kwargs):
        start_time = time.time()
        serializer = GradeSerializer(self.paginate_queryset(self.get_queryset()), many=True)
        elapsed_time = time.time() - start_time  # Calculate the elapsed time
        print(f"GET GRADES: {elapsed_time}")
        return self.get_paginated_response(serializer.data)


    def post(self, request, *args, **kwargs):
        serializer = GradeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_queryset(self):
        queryset = Grade.objects.all().order_by('gid')
        min_grade = self.request.query_params.get('final-gte')
        if min_grade is not None and min_grade != 0:
            queryset = queryset.filter(Q(session__gte=min_grade) | Q(retake__gte=min_grade))
        return queryset


class GradeDetailView(generics.GenericAPIView):
    serializer_class = GradeSerializer

    def get(self, request, pk, *args, **kwargs):
        try:
            student = Grade.objects.get(pk=pk)
            serializer = GradeSerializer(student)
            return Response(serializer.data)
        except Grade.DoesNotExist:
            return Response({'error': 'Grade does not exist'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk, *args, **kwargs):
        try:
            student = Grade.objects.get(pk=pk)
            serializer = GradeSerializer(student, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Grade.DoesNotExist:
            return Response({'error': 'Grade does not exist'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk, *args, **kwargs):
        try:
            student = Grade.objects.get(pk=pk)
            student.delete()
            return Response({'message': 'Grade deleted'}, status=status.HTTP_204_NO_CONTENT)
        except Grade.DoesNotExist:
            return Response({'error': 'Grade does not exist'}, status=404)