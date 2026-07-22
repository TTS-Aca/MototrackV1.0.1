from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Usuario, Taller

class RegistroUsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = Usuario
        fields = (
            'email', 'nombres', 'apellido_paterno', 'apellido_materno', 
            'year_nacimiento', 'codigo_pais', 'telefono', 'rol', 'password'
        )

    def create(self, validated_data):
        # Create user with hashed password
        user = Usuario.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            nombres=validated_data.get('nombres', ''),
            apellido_paterno=validated_data.get('apellido_paterno', ''),
            apellido_materno=validated_data.get('apellido_materno', ''),
            year_nacimiento=validated_data.get('year_nacimiento'),
            codigo_pais=validated_data.get('codigo_pais', '+52'),
            telefono=validated_data.get('telefono', ''),
            rol=validated_data.get('rol', 'CLIENTE')
        )
        return user

class RegistroTallerSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = Taller
        fields = (
            'email', 'password', 'nombre_comercial', 'rfc', 'telefono_contacto',
            'direccion', 'latitud', 'longitud', 'marcas', 'horarios', 'ofrece_remolque'
        )

    def create(self, validated_data):
        email = validated_data.pop('email')
        password = validated_data.pop('password')
        
        # Primero creamos el usuario con rol de Mecánico
        # Pasamos el nombre comercial como 'nombres' para cumplir con los REQUIRED_FIELDS
        nombre_taller = validated_data.get('nombre_comercial', 'Taller')
        user = Usuario.objects.create_user(
            email=email,
            password=password,
            rol='MECANICO',
            nombres=nombre_taller,
            apellido_paterno='(Taller)'
        )
        
        # Luego creamos el taller vinculado
        taller = Taller.objects.create(
            usuario=user,
            **validated_data
        )
        return taller

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        # Agregamos el rol del usuario a la respuesta
        data['rol'] = self.user.rol
        
        # Si es mecánico y tiene taller, mandamos su información para el frontend
        if self.user.rol == 'MECANICO' and hasattr(self.user, 'taller'):
            data['is_workshop'] = True
            taller = self.user.taller
            data['taller_data'] = {
                'name': taller.nombre_comercial,
                'rfc': taller.rfc,
                'phone': taller.telefono_contacto,
                'address': taller.direccion,
                'latitude': taller.latitud,
                'longitude': taller.longitud,
                'brands': taller.marcas,
                'schedule': taller.horarios,
                'offersTowService': taller.ofrece_remolque,
            }
        else:
            data['is_workshop'] = False
            
        return data

