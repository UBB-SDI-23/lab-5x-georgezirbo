from api.serializers import \
    StudentSerializerList
from django.db.models import \
    Q
from rest_framework.response import \
    Response
from rest_framework.views import \
    APIView

from api.models import \
    Student


class StudentAutocomplete(APIView):
    serializer_class = StudentSerializerList

    def get(self, request, *args, **kwargs):

        query = request.GET.get('query')
        # SELECT * FROM student WHERE to_tsvector(name) @@ to_tsquery(query)
        teachers = Student.objects.filter(
            Q(fname__icontains=query) | Q(lname__icontains=query)
        ).order_by('fname')[:20]
        serializer = StudentSerializerList(teachers, many=True)
        return Response(serializer.data)