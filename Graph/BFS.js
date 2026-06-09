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

// ─── Test Runner ───────────────────────────────────────────────
function runTests(testCases) {
  let passed = 0, failed = 0;

  testCases.forEach(({ description, graph, start, expected }, i) => {
    const result = bfs(graph, start);
    const ok = JSON.stringify(result) === JSON.stringify(expected);
    if (ok) {
      passed++;
      console.log(`✅ Test ${i + 1}: ${description}`);
    } else {
      failed++;
      console.log(`❌ Test ${i + 1}: ${description}`);
      console.log(`    Expected : [${expected}]`);
      console.log(`    Got      : [${result}]`);
    }
  });

  console.log(`\n${passed}/${passed + failed} tests passed`);
}

// ─── Test Cases ────────────────────────────────────────────────
const testCases = [
  {
    description: "Simple linear chain: 0→1→2→3",
    graph: [[1], [0, 2], [1, 3], [2]],
    start: 0,
    expected: [0, 1, 2, 3],
  },
  {
    description: "Standard connected graph, start from 0",
    graph: [[1, 2], [0, 3, 4], [0, 4], [1, 5], [1, 2, 6], [3], [4]],
    start: 0,
    expected: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    description: "Single node, no edges",
    graph: [[]],
    start: 0,
    expected: [0],
  },
  {
    description: "Two isolated nodes connected only to each other",
    graph: [[1], [0]],
    start: 0,
    expected: [0, 1],
  },
  {
    description: "Disconnected graph — only visits component of start node",
    //  0-1-2   3-4  (two separate components)
    graph: [[1], [0, 2], [1], [4], [3]],
    start: 0,
    expected: [0, 1, 2],
  },
  {
    description: "Disconnected graph — start from isolated component",
    graph: [[1], [0, 2], [1], [4], [3]],
    start: 3,
    expected: [3, 4],
  },
  {
    description: "Star graph — center node connected to all leaves",
    //     0
    //   / | \
    //  1  2  3
    graph: [[1, 2, 3], [0], [0], [0]],
    start: 0,
    expected: [0, 1, 2, 3],
  },
  {
    description: "Star graph — start from a leaf, visits center then other leaves",
    graph: [[1, 2, 3], [0], [0], [0]],
    start: 1,
    expected: [1, 0, 2, 3],
  },
  {
    description: "Cycle graph: 0-1-2-3-0",
    graph: [[1, 3], [0, 2], [1, 3], [2, 0]],
    start: 0,
    expected: [0, 1, 3, 2],
  },
  {
    description: "Complete graph K4 — every node connects to every other",
    graph: [
      [1, 2, 3],
      [0, 2, 3],
      [0, 1, 3],
      [0, 1, 2],
    ],
    start: 0,
    expected: [0, 1, 2, 3],
  },
  {
    description: "Tree — BFS gives level-order traversal",
    //        0
    //      /   \
    //     1     2
    //    / \     \
    //   3   4     5
    graph: [[1, 2], [0, 3, 4], [0, 5], [1], [1], [2]],
    start: 0,
    expected: [0, 1, 2, 3, 4, 5],
  },
  {
    description: "Tree — start from leaf node 3",
    graph: [[1, 2], [0, 3, 4], [0, 5], [1], [1], [2]],
    start: 3,
    expected: [3, 1, 0, 4, 2, 5],
  },
  {
    description: "Large path graph — 7 nodes in a line",
    graph: [[1],[0,2],[1,3],[2,4],[3,5],[4,6],[5]],
    start: 0,
    expected: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    description: "Large path graph — start from middle node 3",
    graph: [[1],[0,2],[1,3],[2,4],[3,5],[4,6],[5]],
    start: 3,
    expected: [3, 2, 4, 1, 5, 0, 6],
  },
];

runTests(testCases);