#ifndef API_H
#define API_H

#include <crow.h>
#include "../utils/utils.h"
#include "../Graph/Graph.h"

void add_cors_headers(crow::response& res);
crow::response handle_mst_request(const crow::request& req);

#endif
