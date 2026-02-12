# -*- coding: utf-8 -*-
"""Lance le serveur HTTP depuis le dossier du projet (où se trouve ce fichier)."""
import http.server
import socketserver
import os

# Toujours servir depuis le dossier contenant ce script = racine du projet
DIR = os.path.dirname(os.path.abspath(__file__))
os.chdir(DIR)

PORT = 8080
Handler = http.server.SimpleHTTPRequestHandler

print("=" * 50)
print("  Serveur demarre sur http://localhost:%s" % PORT)
print("  Page d'accueil FR : http://localhost:%s/fr/index.html" % PORT)
print("=" * 50)
print("Arreter : Ctrl+C")
print("")

with socketserver.TCPServer(("127.0.0.1", PORT), Handler) as httpd:
    httpd.serve_forever()
