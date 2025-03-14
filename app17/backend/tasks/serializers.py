"""
Serializadores para o aplicativo de gerenciamento de tarefas.
"""

from rest_framework import serializers
from .models import Task, Category

class CategorySerializer(serializers.ModelSerializer):
    """
    Serializador para o modelo Category.
    
    Expõe todos os campos do modelo Category na API.
    """
    class Meta:
        model = Category
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):
    """
    Serializador para o modelo Task.
    
    Expõe todos os campos do modelo Task na API e inclui informações
    adicionais como o nome da categoria.
    """
    # Campo adicional para mostrar o nome da categoria em vez de apenas o ID
    category_name = serializers.SerializerMethodField()
    
    class Meta:
        model = Task
        fields = '__all__'
    
    def get_category_name(self, obj):
        """
        Retorna o nome da categoria.
        
        Se a tarefa não tem categoria, retorna None.
        """
        if obj.category:
            return obj.category.name
        return None
    
    def to_representation(self, instance):
        """
        Personaliza a representação do objeto serializado.
        
        Adiciona rótulos legíveis para os campos de escolha,
        como status e prioridade.
        """
        # Obter a representação padrão
        ret = super().to_representation(instance)
        
        # Adicionar rótulos para os campos de escolha
        status_display = dict(Task.STATUS_CHOICES).get(instance.status)
        priority_display = dict(Task.PRIORITY_CHOICES).get(instance.priority)
        
        ret['status_display'] = status_display
        ret['priority_display'] = priority_display
        
        return ret 