import http.server
import os, subprocess


SERVER_PORT, SERVER_DIR = 8080, "./server"
os.chdir(SERVER_DIR)
print(f"Server running at http://localhost:{SERVER_PORT}")
subprocess.Popen(SERVER_DIR)


WEB_APP_PORT, WEB_APP_DIR = 8000, "../webapp"
os.chdir(WEB_APP_DIR)
httpd = http.server.HTTPServer(
    ("", WEB_APP_PORT),
    http.server.SimpleHTTPRequestHandler
)
print(f"Serving at http://localhost:{WEB_APP_PORT}")
httpd.serve_forever()
