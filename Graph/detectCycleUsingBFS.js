function detectCycleUsingBFS(adj, start){
    for(let start=0; start<= adj.length; start++){
        const queue = []
    const visited = Array(adj.length).fill(0)
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
    const result = detectCycleUsingBFS(graph, 0);
    const ok = result === expected;
    if (ok) { passed++; console.log(`✓ Test ${i + 1}: ${description}`); }
    else { failed++; console.log(`✗ Test ${i + 1}: ${description} | expected ${expected}, got ${result}`); }
  });
  console.log(`\n${passed}/${passed + failed} passed`);
}

const testCases = [
  { description: "Simple cycle: 0-1-2-0",                          graph: [[1,2],[0,2],[1,0]],               expected: true  },
  { description: "No cycle: linear chain 0-1-2-3",                 graph: [[1],[0,2],[1,3],[2]],              expected: false },
  { description: "No cycle: tree with 5 nodes",                    graph: [[1,2],[0,3,4],[0],[1],[1]],        expected: false },
  { description: "Cycle in one component, disconnected graph",     graph: [[1,2],[0,2],[1,0],[4],[3]],        expected: true  },
  { description: "Disconnected graph, no cycle in any component",  graph: [[1],[0,2],[1],[4],[3]],            expected: false },
  { description: "Single node, no edges",                          graph: [[]],                               expected: false },
  { description: "Two nodes connected — no cycle",                 graph: [[1],[0]],                          expected: false },
  { description: "Cycle: square 0-1-2-3-0",                        graph: [[1,3],[0,2],[1,3],[2,0]],          expected: true  },
  { description: "Complete graph K4 — has many cycles",            graph: [[1,2,3],[0,2,3],[0,1,3],[0,1,2]], expected: true  },
  { description: "Star graph — no cycle",                          graph: [[1,2,3],[0],[0],[0]],              expected: false },
  { description: "Two separate cycles in disconnected graph",      graph: [[1,2],[0,2],[1,0],[4,5],[3,5],[4,3]], expected: true },
  { description: "Long chain no cycle: 0-1-2-3-4-5",              graph: [[1],[0,2],[1,3],[2,4],[3,5],[4]], expected: false },
  { description: "Cycle at end of long chain: 0-1-2-3-4-2",       graph: [[1],[0,2],[1,3,4],[2,4],[3,2]],   expected: true  },
  { description: "Three isolated nodes — no edges",                graph: [[],[],[]],                         expected: false },
  { description: "Self loop — node 0 connected to itself",         graph: [[0,1],[0]],                        expected: true  },
];

runTests(testCases);
