from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class GeologicalFeature(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    x_coordinate = models.FloatField()
    y_coordinate = models.FloatField()
    image = models.ImageField(upload_to='features/', null=True, blank=True)

class LifeForm(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    discovered = models.BooleanField(default=False)
    geological_feature = models.ForeignKey(GeologicalFeature, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Discovery(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    feature = models.ForeignKey(GeologicalFeature, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
