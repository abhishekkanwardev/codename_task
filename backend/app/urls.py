from django.urls import path
from app.views import Index, SaveDataView, HomeView
from django.views.decorators.csrf import csrf_exempt


urlpatterns = [
    path('', HomeView.as_view()),
    path('upload-image', Index.as_view()),
    path('save-data/', SaveDataView.as_view()),
]
