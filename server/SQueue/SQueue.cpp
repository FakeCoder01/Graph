#include "SQueue.h"

template <typename T>
SQueue<T>::SQueue(size_t length){
    if (length > 0) {
        data.reserve(length);
    }
}

template <typename T>
void SQueue<T>::push(T value) {
    data.push_back(value);
}

template <typename T>
std::optional<T> SQueue<T>::pop() {
    if (data.empty()) {
        return std::nullopt;
    }
    T value = data.front();
    data.erase(data.begin());
    return value;
}
