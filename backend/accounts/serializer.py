from rest_framework import serializers
from accounts.models import accounts

class accountSerializer(serializers.ModelSerializer):
    class Meta:
        model = accounts
        fields = ['username', 'email', 'password']
    
    def validate_username(self, value):
        if accounts.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists") 
        return value
    
    def validate_email(self, value):
        if accounts.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists")
        return value
    

    def create(self, validated_data):
        user = accounts(**validated_data)
        user.save()
        return user
 