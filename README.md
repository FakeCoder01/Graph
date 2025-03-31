# Лабораторная работа №3 | Lab No. 3
### [Русский](#содержание) | [English](#table-of-contents)
---
## Содержание
- [Задача](#задача)
- [Как запустить](#как-запустить)
  - [Инструкции по сборке](#инструкции-по-сборке)
    - [Предустановленный Docker-образ](#предустановленный-docker-образ)
    - [Сборка с использованием Docker](#сборка-с-использованием-docker)
    - [Ручная установка](#ручная-установка)
  - [Инструкции по запуску](#инструкции-по-запуску)
- [Лицензия](#лицензия)
---
## Задача
#### Реализовать начальный шаг алгоритма разбиения N точек на плоскости на K кластеров (групп).

В программе нужно выполнить следующие действия:
- реализовать структуры (классы) для представления вершин (точек на плоскости) и взвешенных ребер графа (веса – расстояния между парами точек)
- реализовать класс для преставления неориентированных графов (взвешенных или нет)
- сгенерировать N случайных точек
- считая данные точки вершинами полного взвешенного графа, выделить ребра минимального остова
- отсортировать полученный массив ребер по возрастанию весов
- по начальным N-K ребрам отсортированного массива построить матрицу смежности неориентированного графа и выделить K компонент связности (вершины каждой компоненты образуют один кластер)
- результаты вывести либо в текстовом виде (число вершин, а также минимальные и максимальные значения координат вершин и центроида для каждой компоненты), либо в графическом виде (в простейшем случае – с использованием GDI Windows для рисования в консольном окне – если допускает версия Windows, см. пример использования).

## Как запустить
### Инструкции по сборке

#### **Предустановленный Docker-образ**
1. *Загрузите образ:*
   ```bash
   docker pull docker.io/lemmedie/dsa-lab-graph
   ```
2. *Запустите контейнер:*
   ```bash
   docker run -d -p 3000:80 --name dsa-lab-graph lemmedie/dsa-lab-graph
   ```

#### **Сборка с использованием Docker**
1. *Клонируйте репозиторий:*
   ```bash
   git clone https://github.com/FakeCoder01/Graph.git
   ```
2. *Перейдите в директорию:*
   ```bash
   cd Graph
   ```
3. *Соберите Docker-образ:*
   ```bash
   docker build -t dsa-lab-graph .
   ```
4. *Запустите контейнер:*
   ```bash
   docker run -d -p 3000:80 --name dsa-lab-graph dsa-lab-graph
   ```

#### **Ручная установка**
1. *Клонируйте репозиторий:*
   ```bash
   git clone https://github.com/FakeCoder01/Graph.git
   ```
2. *Перейдите в директорию:*
   ```bash
   cd Graph
   ```
3. *Установите зависимости:*

    + Для Ubuntu/Debian:
      - ```bash
        sudo apt-get install cmake libboost-dev libssl-dev libasio-dev wget
        sudo apt-get install nlohmann-json3-dev libcrypto++-dev
        sudo apt-get install libcrypto++-utils libboost-system-dev
        ```
      - Установите [crow](https://crowcpp.org/master/getting_started/setup/linux/) (скачайте готовый пакет с [Crow Releases](https://github.com/CrowCpp/Crow/releases/) и установите его).

    + Для RHEL/Fedora/систем на основе RPM:
      - ```bash
        sudo dnf install cmake boost-devel openssl-devel asio-devel wget
        sudo dnf install json-devel cryptopp cryptopp-devel boost-system
        ```
      - Установите [crow](https://crowcpp.org/master/getting_started/setup/linux/) (скачайте с [Crow GitHub репозитория](https://github.com/CrowCpp/Crow/) и установите согласно документации).

4. *Соберите исполняемый файл:*
   ```bash
   cd server && make all && cd ..
   ```
5. *Запустите API сервер и приложение:*
   ```bash
   python run.py
   ```

### Инструкции по запуску
- URL-адреса конечных точек приведены ниже:
    | Приложения      | URL                                     |
    | --------------- | --------------------------------------- |
    | API сервер      | [http://localhost:8080](http://localhost:8080) |
    | Веб-приложение  | [http://localhost:3000](http://localhost:3000) |

> **Примечание:** Если запуск производится вручную с помощью `run.py`, API сервер также доступен по адресу [http://localhost:3000/api/](http://localhost:3000/api/)

## Лицензия
Этот проект лицензирован под лицензией GPL. Подробнее см. в файле [LICENSE](LICENSE).

---
---
## Table of Contents
- [Task](#task)
- [How to Run](#how-to-run)
  - [Building Instructions](#building-instructions)
    - [Prebuilt Docker Image](#prebuilt-docker-image)
    - [Build using Docker](#build-using-docker)
    - [Manual Installation](#manual-installation)
  - [Running Instructions](#running-instructions)
- [License](#license)
---
## Task
#### Implement the initial step of the algorithm for dividing N points on a plane into K clusters (groups).

The program must perform the following actions:
- implement structures (classes) for representing vertices (points on a plane) and weighted edges of a graph (weights are distances between pairs of points)
- implement a class for representing undirected graphs (weighted or not)
- generate N random points
- consider these points to be vertices of a complete weighted graph, select the edges of the minimum spanning tree
- sort the resulting array of edges in ascending order of weights
- construct an adjacency matrix of an undirected graph based on the initial N-K edges of the sorted array and select K connectivity components (the vertices of each component form one cluster)
- output the results either in text form (the number of vertices, as well as the minimum and maximum values of the coordinates of the vertices and the centroid for each component), or in graphical form (in the simplest case, using Windows GDI to draw in a console window - if the Windows version allows it, see the example of use).


## How to Run

### Building Instructions

#### **Prebuilt Docker Image**
1. *Pull the image:*
   ```bash
   docker pull docker.io/lemmedie/dsa-lab-graph
   ```
2. *Run the container:*
   ```bash
   docker run -d -p 3000:80 --name dsa-lab-graph lemmedie/dsa-lab-graph
   ```

#### **Build using Docker**
1. *Clone the repository:*
   ```bash
   git clone https://github.com/FakeCoder01/Graph.git
   ```
2. *Move into the directory:*
   ```bash
   cd Graph
   ```
3. *Build the Docker image:*
   ```bash
   docker build -t dsa-lab-graph .
   ```
4. *Run the container:*
   ```bash
   docker run -d -p 3000:80 --name dsa-lab-graph dsa-lab-graph
   ```

#### **Manual Installation**
1. *Clone the repository:*
   ```bash
   git clone https://github.com/FakeCoder01/Graph.git
   ```
2. *Move into the directory:*
   ```bash
   cd Graph
   ```
3. *Install dependencies:*

    + For Ubuntu/Debian:
      - ```bash
        sudo apt-get install cmake libboost-dev libssl-dev libasio-dev wget
        sudo apt-get install nlohmann-json3-dev libcrypto++-dev
        sudo apt-get install libcrypto++-utils libboost-system-dev
        ```
      - Install [crow](https://crowcpp.org/master/getting_started/setup/linux/) (download the pre-made package from [Crow Releases](https://github.com/CrowCpp/Crow/releases/) and install it).

    + For RHEL/Fedora/RPM-based Linux:
      - ```bash
        sudo dnf install cmake boost-devel openssl-devel asio-devel wget
        sudo dnf install json-devel cryptopp cryptopp-devel boost-system
        ```
      - Install [crow](https://crowcpp.org/master/getting_started/setup/linux/) (download from the [Crow GitHub repo](https://github.com/CrowCpp/Crow/) and install it as per the doc).

4. *Build the executable:*
   ```bash
   cd server && make all && cd ..
   ```
5. *Run the API server and the app:*
   ```bash
   python run.py
   ```

### Running Instructions
- The URL endpoints are listed below
    | Applications | URL |
    | ------------- | ------------- |
    | API Server | [http://localhost:8080](http://localhost:8080) |
    | Web App | [http://localhost:3000](http://localhost:3000) |

> **Note:** If running manually with `run.py`, the API server is also available at [http://localhost:3000/api/](http://localhost:3000/api/)

## License
This project is licensed under the GPL License. See the [LICENSE](LICENSE) file for details.
