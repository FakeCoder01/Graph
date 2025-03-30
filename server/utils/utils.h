#ifndef UTILS_H
#define UTILS_H

#include <nlohmann/json.hpp>
#include "../Edge/Edge.h"

using JSON = nlohmann::json;


JSON edges_to_json(const std::vector<Edge>& edges);
JSON matrix_to_json(const std::vector<std::vector<double>>& matrix);

#endif // UTILS_H
