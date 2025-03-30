#include "api.h"


void add_cors_headers(crow::response& res) {
    res.add_header("Access-Control-Allow-Origin", "*");
    res.add_header("Access-Control-Allow-Headers", "Content-Type");
    res.add_header("Access-Control-Allow-Methods", "POST, OPTIONS");
}

crow::response handle_mst_request(const crow::request& req) {
    crow::response res;
    add_cors_headers(res);

    if (req.method == "OPTIONS"_method) {
        res.code = 204;
        return res;
    }

    try {
        auto data = JSON::parse(req.body);
        int node_count = data["node_count"];
        auto edges_data = data["edges"];
        std::vector<Edge> edges;

        for (const auto& edge : edges_data) {
            edges.push_back({
                edge["source"],
                edge["target"],
                edge["weight"]
            });
        }

        Graph graph(node_count, edges);
        auto mst = graph.calculate_mst();
        std::sort(mst.begin(), mst.end());
        auto adjacency_matrix = graph.get_adjacency_matrix();

        JSON response;
        response["mst_edges"] = edges_to_json(mst);
        response["sorted_edges"] = edges_to_json(mst);
        response["adjacency_matrix"] = matrix_to_json(adjacency_matrix);

        res.code = 200;
        res.set_header("Content-Type", "application/json");
        res.write(response.dump());
    } catch (const std::exception& e) {
        res.code = 400;
        res.write("Error: " + std::string(e.what()));
    }

    return res;
}
