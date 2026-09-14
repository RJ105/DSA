function detectCycleUsingBFS(adj){
        const queue = []
        const visited = Array(adj.length).fill(0)

        for(start=0; start < adj.length; start++){
            if(visited[start]) continue;

            visited[start] = 1
            queue.push([start, -1])
            while(queue.length > 0){
                const [currNode, parent] = queue.shift()
                for( const neighbour of adj[currNode]){
                    if (visited[neighbour] && neighbour != parent){
                        //cycle detected 
                        return true
                    }
                    else if(!visited[neighbour]){
                        visited[neighbour] = 1
                        queue.push([neighbour, currNode])
                    }
                }
            }
        }
        

    
    return false

}

// ─── Test Runner ───────────────────────────────────────────────
function runTests(testCases) {
  let passed = 0, failed = 0;
  testCases.forEach(({ description, graph, expected }, i) => {
    const result = detectCycleUsingBFS(graph);
    const ok = result === expected;
    if (ok) { passed++; console.log(`✅ Test ${i + 1}: ${description}`); }
    else { failed++; console.log(`❌ Test ${i + 1}: ${description} | expected ${expected}, got ${result}`); }
  });
  console.log(`\n${passed}/${passed + failed} passed`);
}

const testCases = [
  {
    description: "Single node — no cycle",
    // 0
    graph: [[]],
    expected: false,
  },

  {
    description: "Empty graph — no cycle",
    graph: [],
    expected: false,
  },

  {
    description: "Simple linear chain — no cycle",
    // 0---1---2---3
    graph: [[1], [0, 2], [1, 3], [2]],
    expected: false,
  },

  {
    description: "Simple tree — no cycle",
    //       0
    //      / \
    //     1   2
    //    / \
    //   3   4
    graph: [[1, 2], [0, 3, 4], [0], [1], [1]],
    expected: false,
  },

  {
    description: "Star graph — no cycle",
    //      1
    //      |
    //  2---0---3
    //      |
    //      4
    graph: [[1, 2, 3, 4], [0], [0], [0], [0]],
    expected: false,
  },

  {
    description: "Simple triangle — cycle exists",
    //     0
    //    / \
    //   1---2
    graph: [[1, 2], [0, 2], [0, 1]],
    expected: true,
  },

  {
    description: "Simple square — cycle exists",
    //  0---1
    //  |   |
    //  3---2
    graph: [[1, 3], [0, 2], [1, 3], [0, 2]],
    expected: true,
  },

  {
    description: "Cycle with a tail — cycle exists",
    //      1
    //     / \
    //    0---2---3
    graph: [[1, 2], [0, 2], [0, 1, 3], [2]],
    expected: true,
  },

  {
    description: "Disconnected graph with no cycles",
    //  0---1---2    3---4
    graph: [[1], [0, 2], [1], [4], [3]],
    expected: false,
  },

  {
    description: "Disconnected graph with cycle in second component",
    //  0---1---2    3---4
    //                |   |
    //                6---5
    graph: [[1], [0, 2], [1], [4, 6], [3, 5], [4, 6], [3, 5]],
    expected: true,
  },

  {
    description: "Disconnected graph with cycle in first component",
    //  0---1
    //  |   |
    //  3---2       4---5
    graph: [[1, 3], [0, 2], [1, 3], [0, 2], [5], [4]],
    expected: true,
  },

  {
    description: "Two disconnected components, both cyclic",
    //  0---1       4---5
    //  |   |       |   |
    //  3---2       7---6
    graph: [[1, 3], [0, 2], [1, 3], [0, 2], [5, 7], [4, 6], [5, 7], [4, 6]],
    expected: true,
  },

  {
    description: "Two cycles connected by an edge",
    //  0---1     4---5
    //  |   |     |   |
    //  2---3-----6---7
    graph: [[1, 2], [0, 3], [0, 3], [1, 2, 6], [5, 6], [4, 7], [3, 4, 7], [5, 6]],
    expected: true,
  },

  {
    description: "Self-loop — cycle exists",
    //  0
    //  ↺
    graph: [[0]],
    expected: true,
  },

  {
    description: "Self-loop in disconnected component",
    //  0---1       2
    //              ↺
    graph: [[1], [0], [2]],
    expected: true,
  },

  {
  description: "[Connected][Cycle] Self loop at end of chain",
  //  0---1-----2
  //            ↺
  graph: [[1], [0, 2], [1, 2]],
  expected: true,
  },

  {
    description: "Dense graph — multiple cycles",
    //  0---1
    //  |\ /|
    //  | X |
    //  |/ \|
    //  2---3
    graph: [[1, 2, 3], [0, 2, 3], [0, 1, 3], [0, 1, 2]],
    expected: true,
  },

  {
    description: "Diamond graph — cycle exists",
    //      0
    //     / \
    //    1   2
    //     \ /
    //      3
    graph: [[1, 2], [0, 3], [0, 3], [1, 2]],
    expected: true,
  },

  {
    description: "Tree with many branches — no cycle",
    //          0
    //       /  |  \
    //      1   2   3
    //     / \     / \
    //    4   5   6   7
    graph: [[1, 2, 3], [0, 4, 5], [0], [0, 6, 7], [1], [1], [3], [3]],
    expected: false,
  },

  {
    description: "Long cycle — cycle exists",
    //  0---1---2---3
    //  |           |
    //  7---6---5---4
    graph: [[1, 7], [0, 2], [1, 3], [2, 4], [3, 5], [4, 6], [5, 7], [6, 0]],
    expected: true,
  },

  {
    description: "Large disconnected graph with cycle only in last component",
    //  0---1---2    3---4---5    6---7
    //                              |   |
    //                              9---8
    graph: [[1], [0, 2], [1], [4], [3, 5], [4], [7, 9], [6, 8], [7, 9], [6, 8]],
    expected: true,
  },
]

runTests(testCases);
