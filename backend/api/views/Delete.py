from rest_framework import \
    status
from rest_framework.response import \
    Response
from rest_framework.views import \
    APIView

from api.models import \
    Student, \
    Course, \
    Teacher, \
    Grade


class DeleteStudents(APIView):
    def delete(self, request, *args, **kwargs):
        ids = request.data.get('ids', [])
        try:
            Student.objects.filter(sid__in=ids).delete()
            return Response({'message': 'Students deleted successfully'})
        except Student.DoesNotExist:
            return Response({'error': 'The list contains id of inexistent students'}, status=status.HTTP_404_NOT_FOUND)

class DeleteCourses(APIView):
    def delete(self, request, *args, **kwargs):
        ids = request.data.get('ids', [])
        try:
            Course.objects.filter(cid__in=ids).delete()
            return Response({'message': 'Courses deleted successfully'})
        except Course.DoesNotExist:
            return Response({'error': 'The list contains id of inexistent courses'}, status=status.HTTP_404_NOT_FOUND)

class DeleteTeachers(APIView):
    def delete(self, request, *args, **kwargs):
        ids = request.data.get('ids', [])
        try:
            Teacher.objects.filter(tid__in=ids).delete()
            return Response({'message': 'Teachers deleted successfully'})
        except Teacher.DoesNotExist:
            return Response({'error': 'The list contains id of inexistent teachers'}, status=status.HTTP_404_NOT_FOUND)

class DeleteGrades(APIView):
    def delete(self, request, *args, **kwargs):
        ids = request.data.get('ids', [])
        try:
            Grade.objects.filter(gid__in=ids).delete()
            return Response({'message': 'Grades deleted successfully'})
        except Grade.DoesNotExist:
            return Response({'error': 'The list contains id of inexistent grades'}, status=status.HTTP_404_NOT_FOUND)

