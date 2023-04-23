from api.serializers import \
    CourseSerializerList
from rest_framework.response import \
    Response
from rest_framework.views import \
    APIView

from api.models import \
    Course


class CourseAutocomplete(APIView):
    serializer_class = CourseSerializerList

    def get(self, request, *args, **kwargs):

        query = request.GET.get('query')
        # SELECT * FROM course WHERE to_tsvector(name) @@ to_tsquery(query)
        courses = Course.objects.filter(name__icontains=query).order_by('name')[:20]
        serializer = CourseSerializerList(courses, many=True)
        return Response(serializer.data)