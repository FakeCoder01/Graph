#include "api/api.h"

int main() {
    crow::SimpleApp app;
    CROW_ROUTE(app, "/graph/mst/").methods(crow::HTTPMethod::POST)(handle_mst_request);
    app.port(8080).loglevel(crow::LogLevel::Warning).multithreaded().run();
}
