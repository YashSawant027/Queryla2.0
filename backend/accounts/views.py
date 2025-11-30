from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from accounts.serializer import accountSerializer
from accounts.models import accounts
from rest_framework.views import APIView
from accounts.LoginSerializer import LoginSerializer
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

class RegisterPage(CreateAPIView):
    queryset = accounts.objects.all()
    serializer_class = accountSerializer

class LoginPage(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]

        refresh = RefreshToken.for_user(user)

        return Response({
            "message": "Login successful",
            "username": user.username,
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        })
