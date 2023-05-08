import \
    time
from rest_framework import \
    generics, \
    status
from rest_framework.response import \
    Response

from api.models import \
    User, \
    Profile, \
    Student, \
    Grade, \
    Course, \
    Teacher
from api.pagination import \
    CustomPagination
from api.serializers import \
    UserSerializer, \
    ProfileSerializer


class ProfileView(generics.GenericAPIView):
    serializer_class = ProfileSerializer
    pagination_class = CustomPagination
    queryset = Profile.objects.all().order_by('pid')

    def get(self, request, *args, **kwargs):
        start_time = time.time()
        serializer = ProfileSerializer(self.paginate_queryset(self.queryset), many=True)
        elapsed_time = time.time() - start_time
        print(f"GET PROFILES: {elapsed_time}")
        return self.get_paginated_response(serializer.data)


    def post(self, request, *args, **kwargs):
        serializer = ProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProfileDetailView(generics.GenericAPIView):
    serializer_class = ProfileSerializer
    pagination_class = CustomPagination
    queryset = Profile.objects.all().order_by('pid')

    def get(self, request, username, *args, **kwargs):
        try:
            user = User.objects.get(username=username)
            profile = Profile.objects.get(user_id=user.id)
            serializer = self.get_serializer(profile)
            profile = serializer.data
            profile['no_students'] = Student.objects.filter(user_id=user.id).count()
            profile['no_grades'] = Grade.objects.filter(user_id=user.id).count()
            profile['no_courses'] = Course.objects.filter(user_id=user.id).count()
            profile['no_teacher'] = Teacher.objects.filter(user_id=user.id).count()
            return Response(profile)
        except Profile.DoesNotExist:
            return Response({'error': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, username, *args, **kwargs):
        try:
            user = User.objects.get(username=username)
            profile = Profile.objects.get(user_id=user.id)
            serializer = self.get_serializer(profile, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Profile.DoesNotExist:
            return Response({'error': 'Profile does not exist'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, username, *args, **kwargs):
        try:
            user = User.objects.get(username=username)
            profile = Profile.objects.get(user_id=user.id)
            profile.delete()
            return Response({'message': 'Profile deleted'}, status=status.HTTP_204_NO_CONTENT)
        except Profile.DoesNotExist:
            return Response({'error': 'Profile does not exist'}, status=404)