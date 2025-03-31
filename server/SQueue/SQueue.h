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
    void push(T value);
    std::optional<T> pop();
};


#endif // SQUEUE_H
