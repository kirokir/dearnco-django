from django.db import models
from django.contrib.auth.models import User
from cloudinary.models import CloudinaryField

class SingletonModel(models.Model):
    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        self.pk = 1
        super(SingletonModel, self).save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = CloudinaryField('profile_pics', null=True, blank=True)

    def __str__(self):
        return f'{self.user.username} Profile'