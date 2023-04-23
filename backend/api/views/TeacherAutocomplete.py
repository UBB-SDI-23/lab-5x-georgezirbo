from django.db.models import \
    Q
from rest_framework.response import \
    Response
from rest_framework.views import \
    APIView

from api.models import \
    Teacher

from api.serializers import \
    TeacherSerializerList

class TeacherAutocomplete(APIView):
    serializer_class = TeacherSerializerList

    def get(self, request, *args, **kwargs):

        query = request.GET.get('query')
        # SELECT * FROM teacher WHERE to_tsvector(name) @@ to_tsquery(query)
        teachers = Teacher.objects.filter(
            Q(fname__icontains=query) | Q(lname__icontains=query)
        ).order_by('fname')[:20]
        serializer = TeacherSerializerList(teachers, many=True)
        return Response(serializer.data)