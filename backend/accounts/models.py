from django.db import models
from django.contrib.auth.hashers import make_password

class accounts(models.Model):
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(max_length=50, unique=True)
    password = models.CharField(max_length=50)

    def save(self, *args, **kwargs):
        if not self.password.startswith('pbkdf2_sha256$'):
            self.password = make_password(self.password)
        super().save(*args, **kwargs)