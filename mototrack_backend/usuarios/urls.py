from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegistroUsuarioView, RegistroTallerView, CustomTokenObtainPairView

urlpatterns = [
    path('register/', RegistroUsuarioView.as_view(), name='registro_usuario'),
    path('taller/register/', RegistroTallerView.as_view(), name='registro_taller'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
