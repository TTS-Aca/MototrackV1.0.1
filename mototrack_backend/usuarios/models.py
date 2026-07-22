from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class UsuarioManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("El correo electrónico es obligatorio")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class Usuario(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = (
        ('CLIENTE', 'Cliente'),
        ('MECANICO', 'Mecánico / Taller'),
    )

    email = models.EmailField(unique=True)
    nombres = models.CharField(max_length=100)
    apellido_paterno = models.CharField(max_length=100)
    apellido_materno = models.CharField(max_length=100, blank=True)
    year_nacimiento = models.IntegerField(null=True, blank=True)
    codigo_pais = models.CharField(max_length=5, default='+52')
    telefono = models.CharField(max_length=15, blank=True)
    rol = models.CharField(max_length=15, choices=ROLE_CHOICES, default='CLIENTE')

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UsuarioManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nombres', 'apellido_paterno']

    def __str__(self):
        return f"{self.nombres} {self.apellido_paterno} ({self.email})"

class Taller(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, related_name='taller')
    nombre_comercial = models.CharField(max_length=200)
    rfc = models.CharField(max_length=15, unique=True)
    telefono_contacto = models.CharField(max_length=15)
    direccion = models.TextField()
    latitud = models.FloatField()
    longitud = models.FloatField()
    marcas = models.JSONField(default=list)  # Lista de marcas: ["Honda", "Yamaha"]
    horarios = models.JSONField(default=list)  # Lista de horarios: [{"day": "Lunes", "open": "09:00", ...}]
    ofrece_remolque = models.BooleanField(default=False)
    
    fecha_registro = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre_comercial
