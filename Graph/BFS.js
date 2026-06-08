function bfs(graph, start) {
  const visited = new Array(graph.length).fill(false);
  const queue = [];
  const order = [];

  visited[start] = true;
  queue.push(start);

  while (queue.length > 0) {
    const node = queue.shift();
    order.push(node);
    for (const neighbor of graph[node]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        queue.push(neighbor);
      }
    }
  }

  return order;
}