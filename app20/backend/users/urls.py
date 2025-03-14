"""
Configuração de URLs para o aplicativo de usuários.
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import UserViewSet, CustomTokenObtainPairView

router = DefaultRouter()
router.register(r'', UserViewSet)

urlpatterns = [
    # Rotas de autenticação JWT
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Rotas de usuários
    path('', include(router.urls)),
] 