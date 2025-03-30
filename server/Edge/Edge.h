#ifndef EDGE_H
#define EDGE_H

struct Edge {
    int source;
    int target;
    double weight;

    bool operator<(const Edge& other) const {
        return weight < other.weight;
    }
};

#endif
