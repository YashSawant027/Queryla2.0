from rest_framework import serializers
from accounts.models import accounts
from django.contrib.auth.hashers import check_password

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only =True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        try:
            user = accounts.objects.get(username=username)
        except:
            raise serializers.ValidationError({"username":"User does not exist"})
        
        if not check_password(password, user.password):
            raise serializers.ValidationError({"Password" : "Incorrect password"})
        
        data["user"] = user
        return data