from django.shortcuts import render
from .models import GeologicalFeature, LifeForm
from django.http import JsonResponse

def home(request):
    features = GeologicalFeature.objects.all()
    life_forms = LifeForm.objects.all()
    return render(request, 'explorer/home.html', {
        'features': features,
        'life_forms': life_forms,
    })



def get_features(request):
    features = list(GeologicalFeature.objects.values())
    return JsonResponse({'features': features})
