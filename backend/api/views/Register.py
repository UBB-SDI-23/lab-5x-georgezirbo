import datetime
import \
    random
import \
    string
from django.utils import timezone
from rest_framework import \
    generics, \
    status
from rest_framework.response import \
    Response
from rest_framework.views import \
    APIView

from api.models import \
    User, \
    Profile

from datetime import datetime

from django.core.exceptions import ValidationError


def validate_password(password):
    if not any(char.isdigit() for char in password):
        raise ValidationError("Password must contain at least one digit.")
    if not any(char.isupper() for char in password):
        raise ValidationError("Password must contain at least one uppercase letter.")
    if not any(char.islower() for char in password):
        raise ValidationError("Password must contain at least one lowercase letter.")
    special_characters = "!@#$%^&*()_+{}[]|\:;'\"<>,.?/~`"
    if  any(char in special_characters for char in password):
        raise ValidationError("Password must not contain any special character.")


class RegisterView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        if User.objects.filter(username=username).exists():
            return Response({'username': 'Username already taken'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            validate_password(password)
        except ValidationError as e:
            return Response({'password': e.messages}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, password=password, is_active=False)

        confirmation_code = ''.join(random.choices(string.ascii_lowercase + string.ascii_uppercase + string.digits, k=12))
        confirmation_expiry_date = timezone.now() + timezone.timedelta(minutes=10)

        user_profile = Profile.objects.create(
            confirmation_code=confirmation_code,
            confirmation_expiry_date=confirmation_expiry_date,
            user_id=user.id)

        return Response({'confirmation_code': user_profile.confirmation_code})

class RegisterConfirmationView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, *args, **kwargs):
        confirmation_code = request.query_params.get('confirmation_code')
        username = request.query_params.get('username')

        try:
            user = User.objects.get(username=username)
            profile = Profile.objects.get(user_id=user.id, confirmation_code=confirmation_code)
            expiration_time = profile.confirmation_expiry_date

            if timezone.now() > expiration_time:
                return Response({'message': 'Confirmation code expired'}, status=status.HTTP_400_BAD_REQUEST)

            user.is_active = True
            user.save()

            return Response({'message': 'Account successfully activated'},  status=status.HTTP_200_OK)

        except User.DoesNotExist:
            return Response({'message': f'There is no user with username: {username}'}, status=status.HTTP_400_BAD_REQUEST)

        except Profile.DoesNotExist:
            return Response({'message': 'The confirmation link is invalid'}, status=status.HTTP_400_BAD_REQUEST)