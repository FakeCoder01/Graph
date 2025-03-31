import http.server
import os
import logging
import subprocess
from urllib.parse import urlparse


logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.FileHandler("debug.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

API_SERVER_PORT = int(os.environ.get("API_SERVER_PORT", "8080"))
WEB_APP_PORT = int(os.environ.get("WEB_APP_PORT", "3000"))

API_SERVER_URL = f"http://localhost:{API_SERVER_PORT}"
APP_URL = f"http://localhost:{WEB_APP_PORT}"

APP_DIRECTORY = os.environ.get("WEB_APP_DIR", "../webapp")
API_SERVER_DIRECTORY = os.environ.get("API_SERVER_DIR", "./server")

REQUIREMENTS_FILE = os.environ.get("REQUIREMENTS_FILE", "requirements.txt")


def install_requirements():
    if os.path.exists(REQUIREMENTS_FILE):
        logger.info("Installing dependencies from %s", REQUIREMENTS_FILE)
        try:
            subprocess.check_call(["pip", "install", "-r", REQUIREMENTS_FILE])
            logger.info("Requirements installed successfully.")
        except subprocess.CalledProcessError as e:
            logger.error("Failed to install requirements: %s", e)
            raise e
        logger.info("All packages installed successfully.")
    else:
        logger.warning("%s not found. Skipping installation.", REQUIREMENTS_FILE)


class ReverseProxyHandler(http.server.SimpleHTTPRequestHandler):
    def do_proxy(self):
        parsed_path = urlparse(self.path)
        if parsed_path.path.startswith("/api/"):

            import requests

            api_path = parsed_path.path[len("/api/"):]
            api_url = f"{API_SERVER_URL}/{api_path}"
            method = self.command
            headers = dict(self.headers)
            headers.pop("Host", None)
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length) if content_length > 0 else None

            try:
                resp = requests.request(method, api_url, headers=headers, data=body, stream=True, timeout=10)
                self.send_response(resp.status_code)
                for key, value in resp.headers.items():
                    self.send_header(key, value)
                self.end_headers()
                for chunk in resp.iter_content(chunk_size=4096):
                    if chunk:
                        self.wfile.write(chunk)
            except requests.exceptions.RequestException as e:
                logger.error("Error proxying request: %s", e)
                self.send_error(502, f"Bad Gateway: {e}")
        else:
            super().do_GET()

    def do_GET(self):
        self.do_proxy()

    def do_POST(self):
        self.do_proxy()

    def do_PUT(self):
        self.do_proxy()

    def do_DELETE(self):
        self.do_proxy()

    def do_OPTIONS(self):
        self.do_proxy()

def run_server():
    try:
        logger.info("Starting API server...")
        os.chdir(API_SERVER_DIRECTORY)
        subprocess.Popen(API_SERVER_DIRECTORY)
        logger.info(f"API Server running at http://localhost:{API_SERVER_PORT}")
        os.chdir(APP_DIRECTORY)
    except Exception as e:
        logger.error("Error changing directory: %s", e)
        return

    logger.info("Starting web app server...")
    server_address = ("", WEB_APP_PORT)
    httpd = http.server.HTTPServer(server_address, ReverseProxyHandler)
    logger.info("App running at http://localhost:%d", WEB_APP_PORT)

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        logger.info("Server is shutting down.")
        httpd.shutdown()

if __name__ == "__main__":
    install_requirements()
    run_server()
