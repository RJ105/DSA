

function provinceCount(graph){

    let visited = Array(graph.length).fill(0)
    let queue = []

    let count = 0
    for(let start=0; start < graph.length; start++){
        if(!visited[start]){
            count++
            visited[start] = 1
            queue.push(start)
            while(queue.length){
                const node = queue.shift()
                for(const neighbour of graph[node]){
                    if(!visited[neighbour]){
                        visited[neighbour] = 1
                        queue.push(neighbour)
                    }
                }
            }
        }
    }

    return count
}


function runTests(testCases) {
  let passed = 0, failed = 0;
  testCases.forEach(({ description, graph, expected }, i) => {
    const result = provinceCount(graph);
    const ok = result === expected;
    if (ok) { passed++; console.log(`✅ Test ${i + 1}: ${description}`); }
    else { failed++; console.log(`❌ Test ${i + 1}: ${description} | expected ${expected}, got ${result}`); }
  });
  console.log(`\n${passed}/${passed + failed} passed`);
}

const testCases = [

    // ============================================================
    // 1. EMPTY GRAPH
    // ============================================================

    {
        description: "Empty graph — zero provinces",
        graph: [],
        expected: 0,
    },


    // ============================================================
    // 2. SINGLE NODE
    // ============================================================

    {
        description: "Single isolated node — one province",
        // 0
        graph: [
            []
        ],
        expected: 1,
    },


    // ============================================================
    // 3. ALL NODES ISOLATED
    // ============================================================

    {
        description: "Three isolated nodes — three provinces",
        // 0    1    2
        graph: [
            [],
            [],
            []
        ],
        expected: 3,
    },

    {
        description: "Five isolated nodes — five provinces",
        // 0    1    2    3    4
        graph: [
            [],
            [],
            [],
            [],
            []
        ],
        expected: 5,
    },


    // ============================================================
    // 4. TWO NODES
    // ============================================================

    {
        description: "Two connected nodes — one province",
        // 0 --- 1
        graph: [
            [1],
            [0]
        ],
        expected: 1,
    },

    {
        description: "Two disconnected nodes — two provinces",
        // 0     1
        graph: [
            [],
            []
        ],
        expected: 2,
    },


    // ============================================================
    // 5. THREE NODES
    // ============================================================

    {
        description: "Three connected nodes in a chain — one province",
        // 0 --- 1 --- 2
        graph: [
            [1],
            [0, 2],
            [1]
        ],
        expected: 1,
    },

    {
        description: "Three isolated nodes — three provinces",
        // 0    1    2
        graph: [
            [],
            [],
            []
        ],
        expected: 3,
    },

    {
        description: "One connected pair and one isolated node — two provinces",
        // 0 --- 1     2
        graph: [
            [1],
            [0],
            []
        ],
        expected: 2,
    },

    {
        description: "Three nodes fully connected — one province",
        //     0
        //    / \
        //   1---2
        graph: [
            [1, 2],
            [0, 2],
            [0, 1]
        ],
        expected: 1,
    },


    // ============================================================
    // 6. INDIRECT CONNECTION
    // ============================================================

    {
        description: "Indirect connection — one province",
        // 0 --- 1 --- 2
        // 0 and 2 are not directly connected
        graph: [
            [1],
            [0, 2],
            [1]
        ],
        expected: 1,
    },

    {
        description: "Long chain — one province",
        // 0 --- 1 --- 2 --- 3 --- 4
        graph: [
            [1],
            [0, 2],
            [1, 3],
            [2, 4],
            [3]
        ],
        expected: 1,
    },


    // ============================================================
    // 7. FOUR NODES
    // ============================================================

    {
        description: "Two separate pairs — two provinces",
        // 0 --- 1     2 --- 3
        graph: [
            [1],
            [0],
            [3],
            [2]
        ],
        expected: 2,
    },

    {
        description: "Three connected nodes and one isolated node — two provinces",
        // 0 --- 1 --- 2     3
        graph: [
            [1],
            [0, 2],
            [1],
            []
        ],
        expected: 2,
    },

    {
        description: "Four nodes fully connected — one province",
        graph: [
            [1, 2, 3],
            [0, 2, 3],
            [0, 1, 3],
            [0, 1, 2]
        ],
        expected: 1,
    },

    {
        description: "Four isolated nodes — four provinces",
        graph: [
            [],
            [],
            [],
            []
        ],
        expected: 4,
    },


    // ============================================================
    // 8. STAR GRAPH
    // ============================================================

    {
        description: "Star graph — one province",
        //       1
        //       |
        //   2---0---3
        //       |
        //       4
        graph: [
            [1, 2, 3, 4],
            [0],
            [0],
            [0],
            [0]
        ],
        expected: 1,
    },

    {
        description: "Two star components — two provinces",
        //       1
        //       |
        //   2---0       4
        //                |
        //                3
        graph: [
            [1, 2],
            [0],
            [0],
            [4],
            [3]
        ],
        expected: 2,
    },


    // ============================================================
    // 9. CYCLE
    // ============================================================

    {
        description: "Three-node cycle — one province",
        //     0
        //    / \
        //   1---2
        graph: [
            [1, 2],
            [0, 2],
            [0, 1]
        ],
        expected: 1,
    },

    {
        description: "Four-node cycle — one province",
        // 0 --- 1
        // |     |
        // 3 --- 2
        graph: [
            [1, 3],
            [0, 2],
            [1, 3],
            [0, 2]
        ],
        expected: 1,
    },


    // ============================================================
    // 10. MULTIPLE COMPONENTS
    // ============================================================

    {
        description: "Three separate pairs — three provinces",
        // 0 --- 1     2 --- 3     4 --- 5
        graph: [
            [1],
            [0],
            [3],
            [2],
            [5],
            [4]
        ],
        expected: 3,
    },

    {
        description: "Components of size 1, 2 and 3 — three provinces",
        // 0       1---2       3---4---5
        graph: [
            [],
            [2],
            [1],
            [4],
            [3, 5],
            [4]
        ],
        expected: 3,
    },

    {
        description: "Two large components — two provinces",
        // Component 1:
        // 0 --- 1 --- 2
        //       |
        //       3
        //
        // Component 2:
        // 4 --- 5 --- 6
        graph: [
            [1],
            [0, 2, 3],
            [1],
            [1],
            [5],
            [4, 6],
            [5]
        ],
        expected: 2,
    },


    // ============================================================
    // 11. COMPLEX CONNECTED GRAPH
    // ============================================================

    {
        description: "Complex connected graph — one province",
        //       1 --- 2
        //      / \   /
        //     0   3
        //      \ /
        //       4
        graph: [
            [1, 4],
            [0, 2, 3],
            [1, 3],
            [1, 2, 4],
            [0, 3]
        ],
        expected: 1,
    },


    // ============================================================
    // 12. COMPLEX DISCONNECTED GRAPH
    // ============================================================

    {
        description: "Complex graph with three components — three provinces",
        // Component 1:
        // 0 --- 1 --- 2
        //  \   /
        //    3
        //
        // Component 2:
        // 4 --- 5
        //
        // Component 3:
        // 6
        graph: [
            [1, 3],
            [0, 2, 3],
            [1],
            [0, 1],
            [5],
            [4],
            []
        ],
        expected: 3,
    },


    // ============================================================
    // 13. DUPLICATE EDGES
    // ============================================================

    {
        description: "Duplicate edges — still one province",
        // 0 ===== 1
        graph: [
            [1, 1],
            [0, 0]
        ],
        expected: 1,
    },

    {
        description: "Duplicate edges inside connected component — two provinces",
        // 0 ==== 1     2
        graph: [
            [1, 1, 1],
            [0, 0],
            []
        ],
        expected: 2,
    },


    // ============================================================
    // 14. SELF LOOPS
    // ============================================================

    {
        description: "Single node with self-loop — one province",
        // 0 ↻
        graph: [
            [0]
        ],
        expected: 1,
    },

    {
        description: "Self-loops with disconnected nodes — two provinces",
        // 0 ↻     1 ↻
        graph: [
            [0],
            [1]
        ],
        expected: 2,
    },

    {
        description: "Self-loop plus connected node — one province",
        // 0 ↻ --- 1 ↻
        graph: [
            [0, 1],
            [0, 1]
        ],
        expected: 1,
    },


    // ============================================================
    // 15. START NODE ISOLATED
    // ============================================================

    {
        description: "First node isolated, remaining nodes connected — two provinces",
        // 0       1 --- 2 --- 3
        graph: [
            [],
            [2],
            [1, 3],
            [2]
        ],
        expected: 2,
    },


    // ============================================================
    // 16. LAST NODE ISOLATED
    // ============================================================

    {
        description: "Last node isolated, remaining nodes connected — two provinces",
        // 0 --- 1 --- 2       3
        graph: [
            [1],
            [0, 2],
            [1],
            []
        ],
        expected: 2,
    },


    // ============================================================
    // 17. MANY COMPONENTS
    // ============================================================

    {
        description: "Five components with different sizes",
        // 0       1---2       3---4---5       6---7       8
        graph: [
            [],
            [2],
            [1],
            [4],
            [3, 5],
            [4],
            [7],
            [6],
            []
        ],
        expected: 5,
    },


    // ============================================================
    // 18. EVERY NODE CONNECTED THROUGH ONE HUB
    // ============================================================

    {
        description: "All nodes connected through one hub — one province",
        //       1
        //       |
        //   2---0---3
        //       |
        //       4
        //       |
        //       5
        graph: [
            [1, 2, 3, 4],
            [0],
            [0],
            [0],
            [0, 5],
            [4]
        ],
        expected: 1,
    },

];

runTests(testCases)