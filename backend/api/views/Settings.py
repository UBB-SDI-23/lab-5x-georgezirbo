from rest_framework import \
    generics, \
    status
from rest_framework.response import \
    Response

from api.models import \
    DefaultPageSize
from api.permissions import \
    IsAdmin, \
    IsAdminOrReadOnly
from api.serializers import \
    DefaultPageSizeSerializer


class DefaultPageSizeView(generics.GenericAPIView):
    serializer_class = DefaultPageSizeSerializer
    permission_classes = [IsAdminOrReadOnly]
    queryset = DefaultPageSize.objects.get

    def get(self, request, *args, **kwargs):
        try:
            pagesize = DefaultPageSize.objects.get(pk=1)
            serializer = DefaultPageSizeSerializer(pagesize)
            return Response(serializer.data)
        except DefaultPageSize.DoesNotExist:
            return Response({'Error': 'DefaultPageSize does not exist'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, *args, **kwargs):
        try:
            pagesize = DefaultPageSize.objects.get(pk=1)
            self.check_object_permissions(request, pagesize)
            serializer = DefaultPageSizeSerializer(pagesize, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except DefaultPageSize.DoesNotExist:
            return Response({'error': 'DefaultPageSize does not exist'}, status=status.HTTP_404_NOT_FOUND)