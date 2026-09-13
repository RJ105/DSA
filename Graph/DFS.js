
function dfsRecursive(graph){

  const visited = Array(graph.length).fill(false)
  const order = []

  //below is recursion function without separate terminating conditon 
  // becuase visited check itself is acting as terminating conditon
  function DFS(node){
    visited[node] = true 
    order.push(node)
    for(const neighbours of graph[node]){
        if(!visited[neighbours]){
            DFS(neighbours)
        }

    }
  }
  for(let start=0; start< graph.length; start++){
    if(!visited[start]) DFS(start)
  }
 
  return order
}


// DFS(graph, start, visited, order)
// console.log(order)


function runTests(label, fn, testCases) {
  console.log(`\n${'─'.repeat(50)}`);
  console.log(`  ${label}`);
  console.log(`${'─'.repeat(50)}`);
  let passed = 0, failed = 0;

  testCases.forEach(({ description, graph, expected }, i) => {
    const result = dfsRecursive(graph);
    const ok = JSON.stringify(result) === JSON.stringify(expected);
    if (ok) {
      passed++;
      console.log(`  ✅ Test ${i + 1}: ${description}`);
    } else {
      failed++;
      console.log(`  ❌ Test ${i + 1}: ${description}`);
      console.log(`      Expected : [${expected}]`);
      console.log(`      Got      : [${result}]`);
    }
  });

  console.log(`\n  ${passed}/${passed + failed} passed`);
}


// ─── Test Cases ────────────────────────────────────────────────
const traversalTests = [
  {
    description: "Empty graph",
    graph: [],
    expected: [],
  },

  {
    description: "Single node",
    // 0
    graph: [[]],
    expected: [0],
  },

  {
    description: "Simple linear chain",
    // 0---1---2---3
    graph: [[1], [0, 2], [1, 3], [2]],
    expected: [0, 1, 2, 3],
  },

  {
    description: "Simple branching graph",
    //      0
    //     / \
    //    1   2
    //   / \
    //  3   4
    graph: [[1, 2], [0, 3, 4], [0], [1], [1]],
    expected: [0, 1, 3, 4, 2],
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
    expected: [0, 1, 2, 3],
  },

  {
    description: "Cycle with a tail",
    //      1
    //     / \
    //    0---2---3
    graph: [[1, 2], [0, 2], [0, 1, 3], [2]],
    expected: [0, 1, 2, 3],
  },

  {
    description: "Multiple branches",
    //       0
    //     / | \
    //    1  2  3
    //   / \    |
    //  4   5   6
    graph: [[1, 2, 3], [0, 4, 5], [0], [0, 6], [1], [1], [3]],
    expected: [0, 1, 4, 5, 2, 3, 6],
  },

  {
    description: "Disconnected graph with two components",
    //  0---1---2    3---4
    graph: [[1], [0, 2], [1], [4], [3]],
    expected: [0, 1, 2, 3, 4],
  },

  {
    description: "Disconnected graph with three components",
    //  0---1---2    3---4    5---6
    //  |                         |
    //  7                         8
    graph: [[1, 7], [0, 2], [1], [4], [3], [6], [5, 8], [0], [6]],
    expected: [0, 1, 2, 7, 3, 4, 5, 6, 8],
  },

  {
    description: "All isolated nodes",
    //  0    1    2    3    4
    graph: [[], [], [], [], []],
    expected: [0, 1, 2, 3, 4],
  },

  {
    description: "Connected component with isolated nodes",
    //  0---1---2    3    4
    graph: [[1], [0, 2], [1], [], []],
    expected: [0, 1, 2, 3, 4],
  },

  {
    description: "Dense graph",
    //  0---1
    //  |\ /|
    //  | X |
    //  |/ \|
    //  2---3
    graph: [[1, 2, 3], [0, 2, 3], [0, 1, 3], [0, 1, 2]],
    expected: [0, 1, 2, 3],
  },

  {
    description: "Graph with self-loop",
    //  0---1
    //  ↺
    graph: [[0, 1], [0]],
    expected: [0, 1],
  },

  {
    description: "Two cycles connected by an edge",
    //  0---1     4---5
    //  |   |     |   |
    //  2---/     3---6
    //      \_____/
    graph: [[1, 2], [0, 2], [0, 1, 3], [2, 4, 6], [3, 5], [4, 6], [3, 5]],
    expected: [0, 1, 2, 3, 4, 5, 6],
  },

  {
    description: "Large branching tree",
    //           0
    //       /   |   \
    //      1    2    3
    //     / \       / \
    //    4   5     6   7
    //       / \
    //      8   9
    graph: [[1, 2, 3], [0, 4, 5], [0], [0, 6, 7], [1], [1, 8, 9], [3], [3], [5], [5]],
    expected: [0, 1, 4, 5, 8, 9, 2, 3, 6, 7],
  },
]

runTests("Recursive DFS — traversal order", dfsRecursive, traversalTests);
