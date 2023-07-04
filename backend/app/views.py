from django.shortcuts import render
from django.views import View
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ImagepredictionSerializer
from .models import Imageprediction


class HomeView(View):
    def get(self, request):
        images = Imageprediction.objects.all().order_by('-id')
        return render(request, 'home.html', {"images":images})

class Index(View):
    def get(self, request):
        return render(request, 'image_prediction.html')


class SaveDataView(APIView):
    def post(self, request, format=None):
        serializer = ImagepredictionSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)