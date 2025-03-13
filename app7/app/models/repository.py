from app.models.product import Product


class ProductRepository:
    """Repositório para gerenciar produtos em memória."""

    def __init__(self):
        """Inicializa um novo repositório de produtos."""
        self.products = {}
        self._populate_sample_data()

    def get_all(self):
        """
        Retorna todos os produtos.
        
        Returns:
            list: Lista de produtos.
        """
        return list(self.products.values())

    def get_by_id(self, product_id):
        """
        Retorna um produto pelo ID.
        
        Args:
            product_id (str): ID do produto.
            
        Returns:
            Product or None: O produto encontrado ou None se não existir.
        """
        return self.products.get(product_id)

    def create(self, product_data):
        """
        Cria um novo produto.
        
        Args:
            product_data (dict): Dados do produto.
            
        Returns:
            Product: O produto criado.
        """
        product = Product(
            name=product_data.get('name'),
            price=product_data.get('price'),
            description=product_data.get('description'),
            category=product_data.get('category'),
            in_stock=product_data.get('in_stock', True)
        )
        
        self.products[product.id] = product
        return product

    def update(self, product_id, product_data):
        """
        Atualiza um produto existente.
        
        Args:
            product_id (str): ID do produto.
            product_data (dict): Dados do produto para atualizar.
            
        Returns:
            Product or None: O produto atualizado ou None se não existir.
        """
        product = self.get_by_id(product_id)
        if product:
            product.update(**product_data)
            return product
        return None

    def delete(self, product_id):
        """
        Remove um produto pelo ID.
        
        Args:
            product_id (str): ID do produto.
            
        Returns:
            bool: True se o produto foi removido, False caso contrário.
        """
        if product_id in self.products:
            del self.products[product_id]
            return True
        return False

    def get_by_category(self, category):
        """
        Retorna produtos por categoria.
        
        Args:
            category (str): Categoria para filtrar.
            
        Returns:
            list: Lista de produtos na categoria especificada.
        """
        return [p for p in self.products.values() if p.category == category]

    def get_in_stock(self):
        """
        Retorna produtos em estoque.
        
        Returns:
            list: Lista de produtos em estoque.
        """
        return [p for p in self.products.values() if p.in_stock]
        
    def _populate_sample_data(self):
        """Popula o repositório com dados de exemplo."""
        sample_products = [
            {
                'name': 'Smartphone XYZ',
                'price': 1500.00,
                'description': 'Um smartphone de última geração',
                'category': 'eletrônicos'
            },
            {
                'name': 'Notebook ABC',
                'price': 4500.00,
                'description': 'Notebook leve e potente',
                'category': 'eletrônicos'
            },
            {
                'name': 'Fones de Ouvido',
                'price': 200.00,
                'description': 'Fones de ouvido sem fio',
                'category': 'acessórios'
            },
            {
                'name': 'Mouse Sem Fio',
                'price': 80.00,
                'description': 'Mouse ergonômico sem fio',
                'category': 'acessórios'
            },
            {
                'name': 'Monitor 24"',
                'price': 1200.00,
                'description': 'Monitor Full HD de 24 polegadas',
                'category': 'eletrônicos',
                'in_stock': False
            }
        ]
        
        for product_data in sample_products:
            self.create(product_data)


# Instância global do repositório
product_repository = ProductRepository() 