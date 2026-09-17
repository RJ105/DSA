
/**
 * There is no concept of parent as it was in undirected graph.
 * main concept for cycle detection in directed graph is : 
 * Node has to be visited again on the same path. hence we need keep a track of nodes
 * visited during routing the path.
 */
function detectCycleUsingDFSInDirectedGraph(graph){

    const visited = Array(graph.length).fill(0)
    const isPathVisited = Array(graph.length).fill(0)

    function DFS(node){
        for(let neighbour of graph[node]){
            if(!visited[neighbour]){
                visited[neighbour] = 1
                isPathVisited[neighbour] = 1
                //will return true only when there is cycle else check for next neighbour
                if(DFS(neighbour)) return true 
            }
            else if(isPathVisited[neighbour]){
                // it checks if its already visited then it must be path visited as well
                return true
            }
            
        }
        isPathVisited[node] = false
    }

    visited[0] = true
    isPathVisited[0] = true 

    for(let start=0; start < graph.length; start++){
        visited[start] = true
        isPathVisited[start] = true 
        if(DFS(start)) return true
    }

    return false 
}



// ─── Test Runner ───────────────────────────────────────────────
function runTests(testCases) {
  let passed = 0, failed = 0;
  testCases.forEach(({ description, graph, expected }, i) => {
    const result = detectCycleUsingDFSInDirectedGraph(graph);
    const ok = result === expected;
    if (ok) { passed++; console.log(`✅ Test ${i + 1}: ${description}`); }
    else { failed++; console.log(`❌ Test ${i + 1}: ${description} | expected ${expected}, got ${result}`); }
  });
  console.log(`\n${passed}/${passed + failed} passed`);
}

 const testCases = [
  {
    description: "Simple directed cycle",

    // 0 → 1 → 2
    // ↑       ↓
    // └───────┘
    graph: [[1], [2], [0]],
    expected: true,
  },

  {
    description: "Simple directed graph — no cycle",

    // 0 → 1 → 2 → 3
    //
    // No edge comes back to an ancestor.
    graph: [[1], [2], [3], []],
    expected: false,
  },

  {
    description: "Self loop — cycle",

    // 0
    // ↺
    graph: [[0]],
    expected: true,
  },

  {
    description: "Self loop in a larger graph",

    // 0 → 1
    //     ↺
    //     1
    graph: [[1], [1], []],
    expected: true,
  },

  {
    description: "Disconnected graph — cycle in second component",

    // Component 1:
    // 0 → 1 → 2
    //
    // Component 2:
    // 3 → 4
    // ↑   ↓
    // └───┘
    graph: [[1], [2], [], [4], [3]],
    expected: true,
  },

  {
    description: "Disconnected graph — no cycle",

    // Component 1:
    // 0 → 1
    //
    // Component 2:
    // 2 → 3
    //
    // Component 3:
    // 4 → 5
    graph: [[1], [], [3], [], [5], []],
    expected: false,
  },

  {
    description: "Directed star graph — no cycle",

    //       1
    //      ↗
    //     0 → 2
    //      ↘
    //       3
    //       ↓
    //       4
    graph: [[1, 2, 3, 4], [], [], [], []],
    expected: false,
  },

  {
    description: "Reverse directed star — no cycle",

    // 1
    //  ↓
    //  0 ← 2
    //  ↑
    // 3
    //  ↓
    // 4
    //
    // All edges point toward 0.
    graph: [[], [0], [0], [0], [0]],
    expected: false,
  },

  {
    description: "Diamond graph — no cycle",

    //     0
    //    / \
    //   ↓   ↓
    //   1   2
    //    \ /
    //     ↓
    //     3
    //
    // 1 → 3 and 2 → 3
    // Reaching 3 twice does NOT mean a cycle.
    graph: [[1, 2], [3], [3], []],
    expected: false,
  },

  {
    description: "Diamond graph with cycle",

    //     0
    //    / \
    //   ↓   ↓
    //   1   2
    //   ↓   ↓
    //   3 ←─┘
    //   ↓
    //   1
    //
    // Cycle: 1 → 3 → 1
    graph: [[1, 2], [3], [3], [1]],
    expected: true,
  },

  {
    description: "Long directed chain — no cycle",

    // 0 → 1 → 2 → 3 → 4 → 5 → 6
    graph: [[1], [2], [3], [4], [5], [6], []],
    expected: false,
  },

  {
    description: "Long directed chain with cycle",

    // 0 → 1 → 2 → 3 → 4
    //         ↑         ↓
    //         └─────────┘
    //
    // Cycle: 2 → 3 → 4 → 2
    graph: [[1], [2], [3], [4], [2]],
    expected: true,
  },

  {
    description: "Cycle unreachable from node 0",

    // Component 1:
    // 0 → 1
    //
    // Component 2:
    // 2 → 3
    // ↑   ↓
    // └───┘
    graph: [[1], [], [3], [2]],
    expected: true,
  },

  {
    description: "Two separate cycles",

    // Component 1:
    // 0 → 1
    // ↑   ↓
    // └───┘
    //
    // Component 2:
    // 2 → 3
    // ↑   ↓
    // └───┘
    graph: [[1], [0], [3], [2]],
    expected: true,
  },

  {
    description: "Multiple paths to same node — no cycle",

    //       0
    //      / \
    //     ↓   ↓
    //     1   2
    //      \ /
    //       ↓
    //       3
    //
    // 0 → 1 → 3
    // 0 → 2 → 3
    graph: [[1, 2], [3], [3], []],
    expected: false,
  },

  {
    description: "Back edge to ancestor — cycle",

    // 0 → 1 → 2 → 3
    //     ↑       ↓
    //     └───────┘
    //
    // Cycle: 1 → 2 → 3 → 1
    graph: [[1], [2], [3], [1]],
    expected: true,
  },

  {
    description: "Cycle involving starting node",

    // 0 → 1 → 2
    // ↑       ↓
    // └───────┘
    graph: [[1], [2], [0]],
    expected: true,
  },

  {
    description: "Disconnected graph with tree and cyclic component",

    // Component 1:
    //       0
    //      / \
    //     1   2
    //
    // Component 2:
    // 3 → 4
    // ↑   ↓
    // └───┘
    graph: [[1, 2], [], [], [4], [3]],
    expected: true,
  },

  {
    description: "Complex directed graph — no cycle",

    //        0
    //       / \
    //      ↓   ↓
    //      1   2
    //     / \   \
    //    ↓   ↓   ↓
    //    3   4 → 5
    graph: [[1, 2], [3, 4], [4], [], [5], []],
    expected: false,
  },

  {
    description: "Complex directed graph — cycle",

    //        0
    //       / \
    //      ↓   ↓
    //      1   2
    //       \ /
    //        ↓
    //        3
    //       ↙
    //      1
    //
    // Cycle: 1 → 3 → 1
    graph: [[1, 2], [3], [3], [1]],
    expected: true,
  },

  {
    description: "Single node with no edges — no cycle",

    // 0
    graph: [[]],
    expected: false,
  },

  {
    description: "Multiple isolated nodes — no cycle",

    // 0    1    2    3    4
    graph: [[], [], [], [], []],
    expected: false,
  },

  {
    description: "Multiple self loops",

    // 0 ↺
    // 1 ↺
    // 2 ↺
    graph: [[0], [1], [2]],
    expected: true,
  },
];

runTests(testCases);