#ifndef GRAPH_H
#define GRAPH_H

#include <vector>
#include "../Edge/Edge.h"

using AdjacencyList = std::vector<std::vector<std::pair<int, double>>>;

class Graph {
public:
    Graph(int node_count, const std::vector<Edge>& edges);
    std::vector<Edge> calculate_mst() const;
    std::vector<std::vector<double>> get_adjacency_matrix() const;

private:
    AdjacencyList adjacency_list;
    int node_count;
    void add_edge(int from, int to, double weight);
};

#endif
