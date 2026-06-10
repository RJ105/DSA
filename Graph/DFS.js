
function dfsRecursive(graph, start){

  const visited = Array(graph.length).fill(false)
const order = []

  function DFS(node){
    visited[node] = true 
    order.push(node)
    for(const neighbours of graph[node]){
        if(!visited[neighbours]){
            DFS(neighbours)
        }

    }
  }
  DFS(start)
  return order
}


// DFS(graph, start, visited, order)
// console.log(order)


function runTests(label, fn, testCases) {
  console.log(`\n${'─'.repeat(50)}`);
  console.log(`  ${label}`);
  console.log(`${'─'.repeat(50)}`);
  let passed = 0, failed = 0;

  testCases.forEach(({ description, args, expected }, i) => {
    const result = dfsRecursive(...args);
    const ok = JSON.stringify(result) === JSON.stringify(expected);
    if (ok) {
      passed++;
      console.log(`  ✓ Test ${i + 1}: ${description}`);
    } else {
      failed++;
      console.log(`  ✗ Test ${i + 1}: ${description}`);
      console.log(`      Expected : [${expected}]`);
      console.log(`      Got      : [${result}]`);
    }
  });

  console.log(`\n  ${passed}/${passed + failed} passed`);
}


// ─── Test Cases ────────────────────────────────────────────────
const traversalTests = [
  {
    description: "Simple linear chain 0-1-2-3",
    args: [[[1], [0, 2], [1, 3], [2]], 0],
    expected: [0, 1, 2, 3],
  },
  {
    description: "Standard graph from node 0",
    //  0 - 1 - 3
    //  |   |
    //  2 - 4
    args: [[[1, 2], [0, 3, 4], [0, 4], [1], [1, 2]], 0],
    expected: [0, 1, 3, 4, 2],
  },
  {
    description: "Single node, no edges",
    args: [[[]], 0],
    expected: [0],
  },
  {
    description: "Two nodes connected",
    args: [[[1], [0]], 0],
    expected: [0, 1],
  },
  {
    description: "Disconnected graph — only visits reachable component",
    //  0-1-2   3-4
    args: [[[1], [0, 2], [1], [4], [3]], 0],
    expected: [0, 1, 2],
  },
  {
    description: "Disconnected graph — start from second component",
    args: [[[1], [0, 2], [1], [4], [3]], 3],
    expected: [3, 4],
  },
  {
    description: "Tree — DFS gives pre-order traversal",
    //       0
    //      / \
    //     1   2
    //    / \   \
    //   3   4   5
    args: [[[1, 2], [0, 3, 4], [0, 5], [1], [1], [2]], 0],
    expected: [0, 1, 3, 4, 2, 5],
  },
  {
    description: "Tree — start from leaf node 3",
    args: [[[1, 2], [0, 3, 4], [0, 5], [1], [1], [2]], 3],
    expected: [3, 1, 0, 2, 5, 4],
  },
  {
    description: "Cycle graph 0-1-2-3-0 — no infinite loop",
    args: [[[1, 3], [0, 2], [1, 3], [2, 0]], 0],
    expected: [0, 1, 2, 3],
  },
  {
    description: "Complete graph K4",
    args: [[[1,2,3],[0,2,3],[0,1,3],[0,1,2]], 0],
    expected: [0, 1, 2, 3],
  },
  {
    description: "Star graph — center to all leaves",
    args: [[[1, 2, 3], [0], [0], [0]], 0],
    expected: [0, 1, 2, 3],
  },
  {
    description: "Star graph — start from leaf",
    args: [[[1, 2, 3], [0], [0], [0]], 2],
    expected: [2, 0, 1, 3],
  },
  {
    description: "Long path — start from middle node 3",
    //  0-1-2-3-4-5-6
    args: [[[1],[0,2],[1,3],[2,4],[3,5],[4,6],[5]], 3],
    expected: [3, 2, 1, 0, 4, 5, 6],
  },
];

runTests("Recursive DFS — traversal order", dfsRecursive, traversalTests);
