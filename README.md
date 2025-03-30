# Лаборатория 3 | Lab 3
---

## Задачи на графах
### Реализовать начальный шаг алгоритма разбиения N точек на плоскости на K кластеров (групп).

В программе нужно выполнить следующие действия:
- реализовать структуры (классы) для представления вершин (точек на плоскости) и взвешенных ребер графа (веса – расстояния между парами точек)
- реализовать класс для преставления неориентированных графов (взвешенных или нет)
- сгенерировать N случайных точек
- считая данные точки вершинами полного взвешенного графа, выделить ребра минимального остова
- отсортировать полученный массив ребер по возрастанию весов
- по начальным N-K ребрам отсортированного массива построить матрицу смежности неориентированного графа и выделить K компонент связности (вершины каждой компоненты образуют один кластер)
- результаты вывести либо в текстовом виде (число вершин, а также минимальные и максимальные значения координат вершин и центроида для каждой компоненты), либо в графическом виде (в простейшем случае – с использованием GDI Windows для рисования в консольном окне – если допускает версия Windows, см. пример использования).

---

## Graph problems
### Implement the initial step of the algorithm for dividing N points on a plane into K clusters (groups).

The program must perform the following actions:
- implement structures (classes) for representing vertices (points on a plane) and weighted edges of a graph (weights are distances between pairs of points)
- implement a class for representing undirected graphs (weighted or not)
- generate N random points
- consider these points to be vertices of a complete weighted graph, select the edges of the minimum spanning tree
- sort the resulting array of edges in ascending order of weights
- construct an adjacency matrix of an undirected graph based on the initial N-K edges of the sorted array and select K connectivity components (the vertices of each component form one cluster)
- output the results either in text form (the number of vertices, as well as the minimum and maximum values of the coordinates of the vertices and the centroid for each component), or in graphical form (in the simplest case, using Windows GDI to draw in a console window - if the Windows version allows it, see the example of use).
