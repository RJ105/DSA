

function detectCycleUsingDFS(adj){
    const visited = Array(adj.length).fill(false)

    function dfs(node){
        const [current, parent] = node 
        for(const neighbour of adj[current]){
            if(visited[neighbour] && neighbour != parent){
                return true
            }
            else if(!visited[neighbour]){
              visited[neighbour] = true 
              // return dfs([neighbour, current]) => wrong

              /* plain return statement like above cannot be used here
              becuase in case of star graph where 1 node is connected to multiple node then 
              it might be possible that out of all neigbour node, one of them have loop.  
              plain return statement will propagates false for the 1st node 
              and will not check remaining nodes which might have loop*/

              if (dfs([neighbour, current])) return true
            }
        }
        return false // this return will act as termination condition for graph end
    }

    //below for loop is used to cover all nodes in disconnected graph
 for (let start = 0; start < adj.length; start++) {  
    if (!visited[start]) {
      visited[start] = 1
      if (dfs([start, -1])) return true
    }
  }
  return false
}


// ─── Test Runner ───────────────────────────────────────────────
function runTests(testCases) {
  let passed = 0, failed = 0;
  testCases.forEach(({ description, graph, expected }, i) => {
    const result = detectCycleUsingDFS(graph);
    const ok = result === expected;
    if (ok) { passed++; console.log(`✅ Test ${i + 1}: ${description}`); }
    else { failed++; console.log(`❌ Test ${i + 1}: ${description} | expected ${expected}, got ${result}`); }
  });
  console.log(`\n${passed}/${passed + failed} passed`);
}

const testCases = [
  // ── Connected WITH cycle ──────────────────────────────────────
  { description: "[Connected][Cycle] Triangle: 0-1-2-0",                           graph: [[1,2],[0,2],[1,0]],                  expected: true  },
  { description: "[Connected][Cycle] Square: 0-1-2-3-0",                           graph: [[1,3],[0,2],[1,3],[2,0]],            expected: true  },
  { description: "[Connected][Cycle] Complete graph K4",                            graph: [[1,2,3],[0,2,3],[0,1,3],[0,1,2]],   expected: true  },
  { description: "[Connected][Cycle] Cycle at end of chain",                       graph: [[1],[0,2],[1,3,4],[2,4],[2,3]],      expected: true  },
  { description: "[Connected][Cycle] Self loop on node 0",                         graph: [[0,1],[0]],                          expected: true  },
  { description: "[Connected][Cycle] Self loop in middle of chain",                graph: [[1],[0,2],[1,2,3],[2]],              expected: true  },

  // ── Connected WITHOUT cycle ───────────────────────────────────
  { description: "[Connected][No Cycle] Linear chain: 0-1-2-3",                   graph: [[1],[0,2],[1,3],[2]],                expected: false },
  { description: "[Connected][No Cycle] Tree with 5 nodes",                       graph: [[1,2],[0,3,4],[0],[1],[1]],          expected: false },
  { description: "[Connected][No Cycle] Star graph",                              graph: [[1,2,3],[0],[0],[0]],                expected: false },
  { description: "[Connected][No Cycle] Two nodes only",                          graph: [[1],[0]],                            expected: false },
  { description: "[Connected][No Cycle] Long chain: 0-1-2-3-4-5",                graph: [[1],[0,2],[1,3],[2,4],[3,5],[4]],    expected: false },

  // ── Disconnected WITH cycle ───────────────────────────────────
  { description: "[Disconnected][Cycle] Component1: cycle, Component2: no cycle", graph: [[1,2],[0,2],[1,0],[4],[3]],          expected: true  },
  { description: "[Disconnected][Cycle] Component1: no cycle, Component2: cycle", graph: [[1],[0],[3,4],[2,4],[3,2]],          expected: true  },
  { description: "[Disconnected][Cycle] Chain + triangle in separate components", graph: [[1],[0,2],[1],[4,5],[3,5],[4,3]],    expected: true  },
  { description: "[Disconnected][Cycle] Three components: first has cycle",       graph: [[1,2],[0,2],[1,0],[4],[3],[]],       expected: true  },
  { description: "[Disconnected][Cycle] Three components: last has cycle",        graph: [[1],[0],[3],[2],[5,6],[4,6],[5,4]], expected: true  },
  { description: "[Disconnected][Cycle] Isolated node + graph with cycle",        graph: [[],[2,3],[1,3],[2,1]],               expected: true  },

  // ── Disconnected WITHOUT cycle ────────────────────────────────
  { description: "[Disconnected][No Cycle] Two separate chains",                  graph: [[1],[0,2],[1],[4],[3]],              expected: false },
  { description: "[Disconnected][No Cycle] Two separate trees",                   graph: [[1],[0,2],[1],[4],[3,5],[4]],        expected: false },
  { description: "[Disconnected][No Cycle] Three isolated nodes",                 graph: [[],[],[]],                           expected: false },
  { description: "[Disconnected][No Cycle] Isolated node + chain",                graph: [[],[2],[1,3],[2]],                   expected: false },
  { description: "[Disconnected][No Cycle] Isolated node + star graph",           graph: [[],[2,3,4],[1],[1],[1]],             expected: false },

  // ── Edge cases ────────────────────────────────────────────────
  { description: "[Edge] Single node, no edges",                                  graph: [[]],                                 expected: false },
  { description: "[Edge] Two isolated nodes",                                     graph: [[],[]],                              expected: false },
  {
  description: "[Disconnected][Cycle] Self loop in separate component",
  // 0---1       2
  //             ↺
  graph: [[1], [0], [2]],
  expected: true,
},
];

runTests(testCases);