#include "Graph.h"
#include <stdexcept>
#include <limits>
#include <vector>

Graph::Graph(int node_count, const std::vector<Edge>& edges)
    : adjacency_list(node_count), node_count(node_count) {
    for (const auto& edge : edges) {
        add_edge(edge.source, edge.target, edge.weight);
        add_edge(edge.target, edge.source, edge.weight);
    }
}

void Graph::add_edge(int from, int to, double weight) {
    adjacency_list[from].emplace_back(to, weight);
}

std::vector<Edge> Graph::calculate_mst() const {
    std::vector<bool> visited(node_count, false);
    std::vector<int> closest(node_count, 0);
    std::vector<double> min_weight(node_count, std::numeric_limits<double>::infinity());
    std::vector<Edge> mst;

    // starts with node 0
    visited[0] = true;
    closest[0] = -1;

    // min_weight for neighbors of node 0
    for (const auto& neighbor : adjacency_list[0]) {
        int j = neighbor.first;
        double weight = neighbor.second;
        min_weight[j] = weight;
        closest[j] = 0;
    }

    for (int i = 1; i < node_count; ++i) {
        // get the next node with the smallest min_weight
        double wmin = std::numeric_limits<double>::infinity();

        int vm = -1;
        for (int j = 0; j < node_count; ++j) {
            if (!visited[j] && min_weight[j] < wmin) {
                wmin = min_weight[j];
                vm = j;
            }
        }

        if (vm == -1) {
            throw std::runtime_error("Graph is not connected");
        }

        // add the edge to MST & mark as visited
        visited[vm] = true;
        mst.push_back(Edge{closest[vm], vm, wmin});

        // update min_weight & closest for neighbors of the newly added node
        for (const auto& neighbor : adjacency_list[vm]) {
            int j = neighbor.first;
            double weight = neighbor.second;
            if (!visited[j] && weight < min_weight[j]) {
                min_weight[j] = weight;
                closest[j] = vm;
            }
        }
    }

    return mst;
}

std::vector<std::vector<double>> Graph::get_adjacency_matrix() const{
    std::vector<std::vector<double>> matrix(
        node_count,
        std::vector<double>(node_count, 0.0)
    );

    for (int i = 0; i < node_count; ++i) {
        for (const auto& neighbor : adjacency_list[i]) {
            int j = neighbor.first;
            double weight = neighbor.second;
            matrix[i][j] = weight;
        }
    }
    return matrix;
}
