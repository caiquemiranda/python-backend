#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Servidor HTTP básico com Python puro (sem frameworks)
Este script cria um servidor HTTP simples que responde a requisições GET.
"""

import http.server
import socketserver

# Porta na qual o servidor irá escutar
PORT = 8000

# Handler para processar as requisições HTTP
class MeuHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        """Implementa o método GET para o servidor HTTP."""
        if self.path == '/':
            # Define o status da resposta e cabeçalhos
            self.send_response(200)
            self.send_header('Content-type', 'text/html; charset=utf-8')
            self.end_headers()
            
            # Conteúdo da página
            conteudo = """
            <!DOCTYPE html>
            <html>
            <head>
                <title>Servidor HTTP Python</title>
                <meta charset="utf-8">
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 40px;
                        line-height: 1.6;
                    }
                    h1 {
                        color: #4285f4;
                    }
                </style>
            </head>
            <body>
                <h1>Bem-vindo ao Servidor HTTP básico em Python!</h1>
                <p>Este é um servidor simples implementado sem frameworks externos.</p>
                <p>Para testar diferentes rotas, tente:</p>
                <ul>
                    <li><a href="/info">Informações</a></li>
                    <li><a href="/sobre">Sobre</a></li>
                </ul>
            </body>
            </html>
            """
            
            # Envia a resposta para o cliente
            self.wfile.write(conteudo.encode('utf-8'))
            
        elif self.path == '/info':
            self.send_response(200)
            self.send_header('Content-type', 'text/html; charset=utf-8')
            self.end_headers()
            
            conteudo = """
            <!DOCTYPE html>
            <html>
            <head>
                <title>Informações</title>
                <meta charset="utf-8">
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 40px;
                        line-height: 1.6;
                    }
                    h1 {
                        color: #34a853;
                    }
                </style>
            </head>
            <body>
                <h1>Informações</h1>
                <p>Este servidor foi criado usando a biblioteca <code>http.server</code> do Python.</p>
                <p>É uma demonstração de como criar um servidor HTTP simples sem frameworks externos.</p>
                <p><a href="/">Voltar para a página inicial</a></p>
            </body>
            </html>
            """
            
            self.wfile.write(conteudo.encode('utf-8'))
            
        elif self.path == '/sobre':
            self.send_response(200)
            self.send_header('Content-type', 'text/html; charset=utf-8')
            self.end_headers()
            
            conteudo = """
            <!DOCTYPE html>
            <html>
            <head>
                <title>Sobre</title>
                <meta charset="utf-8">
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 40px;
                        line-height: 1.6;
                    }
                    h1 {
                        color: #ea4335;
                    }
                </style>
            </head>
            <body>
                <h1>Sobre</h1>
                <p>Este é o primeiro projeto de uma série de exemplos para aprendizado de backend com Python.</p>
                <p>Servidor HTTP básico sem frameworks externos.</p>
                <p><a href="/">Voltar para a página inicial</a></p>
            </body>
            </html>
            """
            
            self.wfile.write(conteudo.encode('utf-8'))
            
        else:
            # Quando o caminho não é reconhecido, retorna 404
            self.send_response(404)
            self.send_header('Content-type', 'text/html; charset=utf-8')
            self.end_headers()
            
            conteudo = """
            <!DOCTYPE html>
            <html>
            <head>
                <title>Página não encontrada</title>
                <meta charset="utf-8">
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 40px;
                        line-height: 1.6;
                    }
                    h1 {
                        color: #ea4335;
                    }
                </style>
            </head>
            <body>
                <h1>Erro 404 - Página não encontrada</h1>
                <p>A página solicitada não existe neste servidor.</p>
                <p><a href="/">Voltar para a página inicial</a></p>
            </body>
            </html>
            """
            
            self.wfile.write(conteudo.encode('utf-8'))

def iniciar_servidor():
    """Inicia o servidor HTTP na porta definida."""
    # Cria um socket TCP que escutará na porta PORT
    with socketserver.TCPServer(("", PORT), MeuHandler) as httpd:
        print(f"Servidor rodando na porta {PORT}")
        print(f"Acesse: http://localhost:{PORT}")
        print("Pressione Ctrl+C para encerrar.")
        
        # Mantém o servidor rodando até ser interrompido
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("Servidor encerrado.")

if __name__ == "__main__":
    iniciar_servidor() 