//DFS approach 
var isBipartite = function(graph) {
    let n = graph.length
    const color = Array(n).fill(-1)
    const queue = []
    function DFS(node){
        for (let neighbour of graph[node]){
            if(color[neighbour] === -1){
              color[neighbour] = 1 - color[node]
              if(!DFS(neighbour))
                  return false 
            }
            else if (color[neighbour] === color[node])
                return false
        }

        return true 
    }
    for(let start=0; start<n; start++){
         if (color[start] !== -1) continue;
        color[start] = 0
        if(!DFS(start))
            return false 
    }
    return true 
};



//BFS approach 
// var isBipartite = function(graph) {
//     let n = graph.length
//     const color = Array(n).fill(-1)
//     const queue = []
//     for(let start=0; start<n; start++){
//          if (color[start] !== -1) continue;
//         color[start] = 0
//         queue.push(start)
//         while(queue.length){
//             const node = queue.shift()
//             for(let neighbour of graph[node]){
//                 if(color[neighbour] === -1){
//                     color[neighbour] = 1 - color[node];
//                     queue.push(neighbour)
//                 }
//                 else if(color[neighbour] === color[node]){
//                     return false
//                 }

//             }
//         }
//     }
//     return true 
// };


const testCases = [
  {
    description: "Simple linear graph",
    graph: [[1], [0, 2], [1, 3], [2]],
    expected: true
  },
  {
    description: "Triangle - odd cycle",
    graph: [[1, 2], [0, 2], [0, 1]],
    expected: false
  },
  {
    description: "Square - even cycle",
    graph: [[1, 3], [0, 2], [1, 3], [0, 2]],
    expected: true
  },
  {
    description: "Disconnected bipartite graph",
    graph: [[1], [0], [3], [2]],
    expected: true
  },
  {
    description: "Disconnected graph containing triangle",
    graph: [[1], [0], [3, 4], [2, 4], [2, 3]],
    expected: false
  },
  {
    description: "Star graph",
    graph: [[1, 2, 3], [0], [0], [0]],
    expected: true
  },
  {
    description: "Multiple disconnected star graphs",
    graph: [
      [1, 2], [0], [0],
      [4, 5], [3], [3]
    ],
    expected: true
  },
  {
    description: "Isolated vertex",
    graph: [[]],
    expected: true
  },
  {
    description: "Self loop",
    graph: [[0]],
    expected: false
  },
  {
    description: "Empty graph",
    graph: [],
    expected: true
  }
];

function runTests(testCases) {
  let passed = 0;
  let failed = 0;

  testCases.forEach(({ description, graph, expected }, i) => {
    const actual = isBipartite(graph);

    if (actual === expected) {
      passed++;
      console.log(`✅ Test ${i + 1}: ${description}`);
    } else {
      failed++;
      console.log(
        `❌ Test ${i + 1}: ${description} | expected ${expected}, got ${actual}`
      );
    }
  });

  console.log(`\n${passed}/${passed + failed} passed`);
}

runTests(testCases);
