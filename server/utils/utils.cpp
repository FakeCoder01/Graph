#include "utils.h"


JSON edges_to_json(const std::vector<Edge>& edges) {
    JSON result = JSON::array();
    for (const auto& edge : edges) {
        result.push_back({
            {"source", edge.source},
            {"target", edge.target},
            {"weight", edge.weight}
        });
    }
    return result;
}

JSON matrix_to_json(const std::vector<std::vector<double>>& matrix) {
    JSON result = JSON::array();
    for (const auto& row : matrix) {
        JSON json_row = JSON::array();
        for (double val : row) {
            json_row.push_back(val);
        }
        result.push_back(json_row);
    }
    return result;
}
