CC = g++
CFLAGS = -I. -Wall -Wextra -std=c++17 -g -fPIE
LDFLAGS = -lpthread -lboost_system
TARGET = server
BUILD_DIR = obj

SOURCES = server.cpp api/api.cpp utils/utils.cpp Graph/Graph.cpp SQueue/SQueue.cpp
OBJECTS = $(addprefix $(BUILD_DIR)/, $(notdir $(SOURCES:.cpp=.o)))

vpath %.cpp api
vpath %.cpp utils
vpath %.cpp Graph
vpath %.cpp SQueue

all: $(BUILD_DIR) $(TARGET)

$(TARGET): $(OBJECTS)
	$(CC) $^ -o $@ $(LDFLAGS)

$(BUILD_DIR)/%.o: %.cpp
	$(CC) $(CFLAGS) -c $< -o $@

$(BUILD_DIR):
	mkdir -p $@

clean:
	rm -rf $(BUILD_DIR) $(TARGET)

.PHONY: all clean
