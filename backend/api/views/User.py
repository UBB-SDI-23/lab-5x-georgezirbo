import \
    random
import \
    time

from faker import \
    Faker
from rest_framework import \
    generics, \
    status
from rest_framework.response import \
    Response
from rest_framework.views import \
    APIView
from tqdm import \
    tqdm

from api.models import \
    User, \
    Profile
from api.pagination import \
    CustomPagination
from api.serializers import \
    UserSerializer


class UserView(generics.GenericAPIView):
    serializer_class = UserSerializer
    pagination_class = CustomPagination
    queryset = User.objects.all().order_by('id')

    def get(self, request, *args, **kwargs):
        start_time = time.time()
        serializer = UserSerializer(self.paginate_queryset(self.queryset), many=True, exclude_fields=['date_joined', 'first_name', 'email', 'last_name', 'last_login', 'groups', 'user_permissions'])
        elapsed_time = time.time() - start_time
        print(f"GET USERS: {elapsed_time}")
        return self.get_paginated_response(serializer.data)


    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserDetailView(generics.GenericAPIView):
    serializer_class = UserSerializer
    pagination_class = CustomPagination
    queryset = User.objects.all().order_by('id')

    def get(self, request, pk, *args, **kwargs):
        try:
            user = User.objects.get(pk=pk)
            serializer = self.get_serializer(user)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({'error': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk, *args, **kwargs):
        try:
            user = User.objects.get(pk=pk)
            serializer = self.get_serializer(user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except user.DoesNotExist:
            return Response({'error': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk, *args, **kwargs):
        try:
            user = User.objects.get(pk=pk)
            user.delete()
            return Response({'message': 'User deleted'}, status=status.HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return Response({'error': 'User does not exist'}, status=404)

