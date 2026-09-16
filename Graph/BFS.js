function bfs(graph) {
  
  const visited = new Array(graph.length).fill(false)
  const queue = [];
  const order = [];
   for (let start = 0; start < graph.length; start++) {
    if (visited[start]) continue;
      //With the help of above for loop we can cover disconnected graph as well

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
  }
  return order;
}

// ─── Test Runner ───────────────────────────────────────────────
function runTests(testCases) {
  let passed = 0, failed = 0;

  testCases.forEach(({ description, graph, start, expected }, i) => {
    const result = bfs(graph);
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
    description: "Single node",
    // 0
    graph: [[]],
    expected: [0],
  },

  {
    description: "Empty graph",
    graph: [],
    expected: [],
  },

  {
    description: "Simple linear chain: 0-1-2-3",
    // 0-1-2-3
    graph: [[1], [0, 2], [1, 3], [2]],
    expected: [0, 1, 2, 3],
  },

  {
    description: "Simple connected graph with branching",
    //     0
    //    / \
    //   1   2
    //  / \
    // 3   4
    graph: [[1, 2], [0, 3, 4], [0], [1], [1]],
    expected: [0, 1, 2, 3, 4],
  },

  {
    description: "Star graph",
    //      1
    //      |
    //  2---0---3
    //      |
    //      4
    graph: [[1, 2, 3, 4], [0], [0], [0], [0]],
    expected: [0, 1, 2, 3, 4],
  },

  {
    description: "Cycle graph",
    //  0---1
    //  |   |
    //  3---2
    graph: [[1, 3], [0, 2], [1, 3], [0, 2]],
    expected: [0, 1, 3, 2],
  },

  {
    description: "Graph with multiple branches",
    //       0
    //     / | \
    //    1  2  3
    //   / \    |
    //  4   5   6
    graph: [[1, 2, 3], [0, 4, 5], [0], [0, 6], [1], [1], [3]],
    expected: [0, 1, 2, 3, 4, 5, 6],
  },

  {
    description: "Disconnected graph with two components",
    //  0-1-2    3-4
    graph: [[1], [0, 2], [1], [4], [3]],
    expected: [0, 1, 2, 3, 4],
  },

  {
    description: "Disconnected graph with three components",
    //  0-1-2    3-4    5-6
    //  |               |
    //  7               8
    graph: [
      [1, 7],    // 0
      [0, 2],    // 1
      [1],       // 2
      [4],       // 3
      [3],       // 4
      [6],       // 5
      [5, 8],    // 6
      [0],       // 7
      [6],       // 8
    ],
    expected: [0, 1, 7, 2, 3, 4, 5, 6, 8],
  },

  {
    description: "Multiple isolated nodes",
    //  0    1    2    3    4
    graph: [[], [], [], [], []],
    expected: [0, 1, 2, 3, 4],
  },

  {
    description: "One connected component plus isolated nodes",
    //  0-1-2    3    4
    graph: [[1], [0, 2], [1], [], []],
    expected: [0, 1, 2, 3, 4],
  },

  {
    description: "Dense connected graph",
    // Every node is connected to every other node
    graph: [
      [1, 2, 3],
      [0, 2, 3],
      [0, 1, 3],
      [0, 1, 2],
    ],
    expected: [0, 1, 2, 3],
  },

  {
    description: "Graph containing a self-loop",
    //  0---1
    //  ↺
    graph: [[0, 1], [0]],
    expected: [0, 1],
  },

  {
    description: "Graph with cycle and disconnected component",
    //  0---1        4---5
    //  |   |        
    //  3---2
    graph: [
      [1, 3],    // 0
      [0, 2],    // 1
      [1, 3],    // 2
      [0, 2],    // 3
      [5],       // 4
      [4],       // 5
    ],
    expected: [0, 1, 3, 2, 4, 5],
  },
]

runTests(testCases);