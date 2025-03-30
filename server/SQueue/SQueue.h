#ifndef SQUEUE_H
#define SQUEUE_H

#include <vector>
#include <cstddef>
#include <optional>

template <typename T>
class SQueue {
private:
    std::vector<T> data;

public:
    SQueue(size_t length = 0);
    void add(T value);
    std::optional<T> pop();
};

#include "SQueue.h"

#endif // SQUEUE_H
