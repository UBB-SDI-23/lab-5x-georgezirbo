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
        serializer = UserSerializer(self.paginate_queryset(self.queryset), many=True, exclude_fields=['date_joined', 'first_name', 'email', 'last_name', 'is_staff', 'is_active', 'is_superuser', 'last_login', 'groups', 'user_permissions'])
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

class GenerateUsers(APIView):

    def get(self, request, *args, **kwargs):
        n = int(request.GET.get('n'))
        fake = Faker(['en_AU', 'en_CA', 'en_US', 'es_AR', 'fr_FR', 'es_CO', 'es_ES', 'it_IT', 'de_DE'])
        fake_en = Faker(['en_AU', 'en_CA', 'en_US'])

        for _ in tqdm(range(n)):
            fname = fake.first_name()
            lname = fake.last_name()
            gender = random.choice(['M', 'F'])
            bio = ' '.join(fake_en.words(10))
            age = random.randint(1, 80)

            #create users
            username = ((fname + lname).lower() + str(random.randint(0,9))).replace(" ", "")
            while User.objects.filter(username=username):
                username = ((fname + lname).lower() + str(random.randint(0,9))).replace(" ", "")
            password = "Password2"
            user = User.objects.create_user(username=username, password=password, is_active=True)

            #create profile
            profile = Profile.objects.create(fname=fname, lname=lname, bio=bio, age=age, gender=gender, user=user)

        return Response({"message": f"{n} users created successfully"}, status=status.HTTP_201_CREATED)
