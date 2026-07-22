from rest_framework import status, views
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import RegistroUsuarioSerializer, RegistroTallerSerializer, CustomTokenObtainPairSerializer

class RegistroUsuarioView(views.APIView):
    """
    API View to register a new user.
    """
    permission_classes = [] # Allow anyone to register
    
    def post(self, request, *args, **kwargs):
        serializer = RegistroUsuarioSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "message": "Usuario registrado exitosamente",
                "email": user.email
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class RegistroTallerView(views.APIView):
    """
    API View to register a new workshop (Taller).
    """
    permission_classes = [] 
    
    def post(self, request, *args, **kwargs):
        serializer = RegistroTallerSerializer(data=request.data)
        if serializer.is_valid():
            taller = serializer.save()
            return Response({
                "message": "Taller registrado exitosamente",
                "taller": taller.nombre_comercial,
                "email": taller.usuario.email
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
