from rest_framework import serializers
from .models import Imageprediction

class ImagepredictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Imageprediction
        fields = '__all__' 