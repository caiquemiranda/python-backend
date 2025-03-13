from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Habilita CORS para permitir requisições do frontend

@app.route('/api/mensagem', methods=['GET'])
def get_mensagem():
    """Retorna uma mensagem simples do backend"""
    return jsonify({
        'mensagem': 'Olá do backend Flask!',
        'status': 'sucesso'
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000) 