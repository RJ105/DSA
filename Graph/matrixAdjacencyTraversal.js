//built adj list from the matrix where cell values (1) represent nodes
//this sum is different from adjacency matrix, where cell value denotes edges between nodes

function createAdjListFromMatrix(matrix){
   if (matrix.length === 0) {
        return new Map();
    }
    const rowLen = matrix.length
    const colLen = matrix[0].length 

    let adj = new Map()
    const directions = [
        [-1, 0], // Up 
        [1, 0], // Down 
        [0, -1], // Left 
        [0, 1] // Right
    ]


    for(let r=0; r<rowLen; r++ ){
        for(let c=0; c<colLen; c++){
            if(matrix[r][c] === 1){
                adj.set(`${r},${c}`, [])
                for(const [dr, dc] of directions){ //dr, dc => delta row, delta column
                    const nr = r + dr //row number
                    const nc = c + dc //column number
                    if(nr >= 0 && nr < rowLen && nc >=0 && nc < colLen && matrix[nr][nc] == 1){
                        //if cell is withn matrix range and its cell value is 1 then add it to adj list
                        adj.get(`${r},${c}`).push([nr,nc]) // here we dont have to set again after pushing new cell because js has the reference of original array
                    }
                }
            }
        }
    }

    return adj
}

function areMapsEqual(actual, expected) {

    // Check number of nodes
    if (actual.size !== expected.size) {
        return false;
    }

    for (const [key, expectedNeighbors] of expected) {

        // Key must exist
        if (!actual.has(key)) {
            return false;
        }

        const actualNeighbors = actual.get(key);

        // Check number of neighbors
        if (actualNeighbors.length !== expectedNeighbors.length) {
            return false;
        }

        // Check every neighbor
        for (let i = 0; i < expectedNeighbors.length; i++) {

            const actualNode = actualNeighbors[i];
            const expectedNode = expectedNeighbors[i];

            if (
                actualNode[0] !== expectedNode[0] ||
                actualNode[1] !== expectedNode[1]
            ) {
                return false;
            }
        }
    }

    return true;
}

function runTests(testCases) {
  let passed = 0, failed = 0;
  testCases.forEach(({ description, graph, expected }, i) => {
    const actual = createAdjListFromMatrix(graph);
     const result = areMapsEqual(actual, expected);
    // const ok = result === expected;
    if (result) { passed++; console.log(`✅ Test ${i + 1}: ${description}`); }
    else { failed++; console.log(`❌ Test ${i + 1}: ${description} | expected ${expected}, got ${result}`); }
  });
  console.log(`\n${passed}/${passed + failed} passed`);
}


const testCases = [
  {
    description: "Empty matrix",

    // No cells
    graph: [],
    expected: new Map(),
  },

  {
    description: "Single cell — isolated 1",

    // 1
    graph: [[1]],
    expected: new Map([
      ["0,0", []],
    ]),
  },

  {
    description: "Single cell — 0",

    // 0
    graph: [[0]],
    expected: new Map(),
  },

  {
    description: "Two horizontal connected cells",

    // 1 1
    // 
    // (0,0) -- (0,1)
    graph: [[1, 1]],
    expected: new Map([
      ["0,0", [[0, 1]]],
      ["0,1", [[0, 0]]],
    ]),
  },

  {
    description: "Two vertical connected cells",

    // 1
    // |
    // 1
    graph: [
      [1],
      [1],
    ],
    expected: new Map([
      ["0,0", [[1, 0]]],
      ["1,0", [[0, 0]]],
    ]),
  },

  {
    description: "Two isolated 1s",

    // 1 0 1
    graph: [[1, 0, 1]],
    expected: new Map([
      ["0,0", []],
      ["0,2", []],
    ]),
  },

  {
    description: "Simple horizontal chain",

    // 1 1 1 1
    //
    // (0,0) -- (0,1) -- (0,2) -- (0,3)
    graph: [[1, 1, 1, 1]],
    expected: new Map([
      ["0,0", [[0, 1]]],
      ["0,1", [[0, 0], [0, 2]]],
      ["0,2", [[0, 1], [0, 3]]],
      ["0,3", [[0, 2]]],
    ]),
  },

  {
    description: "Simple vertical chain",

    // 1
    // |
    // 1
    // |
    // 1
    // |
    // 1
    graph: [
      [1],
      [1],
      [1],
      [1],
    ],
    expected: new Map([
      ["0,0", [[1, 0]]],
      ["1,0", [[0, 0], [2, 0]]],
      ["2,0", [[1, 0], [3, 0]]],
      ["3,0", [[2, 0]]],
    ]),
  },

  {
    description: "2x2 fully connected grid",

    // 1 1
    // 1 1
    graph: [
      [1, 1],
      [1, 1],
    ],
    expected: new Map([
      ["0,0", [[1, 0], [0, 1]]],
      ["0,1", [[1, 1], [0, 0]]],
      ["1,0", [[0, 0], [1, 1]]],
      ["1,1", [[0, 1], [1, 0]]],
    ]),
  },

  {
    description: "3x3 grid with center isolated",

    // 1 1 1
    // 1 0 1
    // 1 1 1
    graph: [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
    ],
    expected: new Map([
        ["0,0", [[1, 0], [0, 1]]],
        ["0,1", [[0, 0], [0, 2]]],
        ["0,2", [[1, 2], [0, 1]]],

        ["1,0", [[0, 0], [2, 0]]],
        ["1,2", [[0, 2], [2, 2]]],

        ["2,0", [[1, 0], [2, 1]]],
        ["2,1", [[2, 0], [2, 2]]],
        ["2,2", [[1, 2], [2, 1]]],
    ]),
  },

  {
    description: "L-shaped graph",

    // 1 0 0
    // 1 0 0
    // 1 1 1
    graph: [
      [1, 0, 0],
      [1, 0, 0],
      [1, 1, 1],
    ],
    expected: new Map([
      ["0,0", [[1, 0]]],
      ["1,0", [[0, 0], [2, 0]]],
      ["2,0", [[1, 0], [2, 1]]],
      ["2,1", [[2, 0], [2, 2]]],
      ["2,2", [[2, 1]]],
    ]),
  },

  {
    description: "T-shaped graph",

    // 1 1 1
    // 0 1 0
    // 0 1 0
    graph: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 1, 0],
    ],
   expected: new Map([
        ["0,0", [[0, 1]]],
        ["0,1", [[1, 1], [0, 0], [0, 2]]],
        ["0,2", [[0, 1]]],
        ["1,1", [[0, 1], [2, 1]]],
        ["2,1", [[1, 1]]],
    ]),
  },

  {
    description: "Two disconnected components",

    // 1 1 0 0
    // 0 0 0 1
    // 0 0 1 1
    graph: [
      [1, 1, 0, 0],
      [0, 0, 0, 1],
      [0, 0, 1, 1],
    ],
    expected: new Map([
      ["0,0", [[0, 1]]],
      ["0,1", [[0, 0]]],
      ["1,3", [[2, 3]]],
      ["2,2", [[2, 3]]],
      ["2,3", [[1, 3], [2, 2]]],
    ]),
  },

  {
    description: "All zero matrix",

    // 0 0 0
    // 0 0 0
    // 0 0 0
    graph: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    expected: new Map(),
  },

  {
    description: "All one matrix",

    // 1 1 1
    // 1 1 1
    // 1 1 1
    graph: [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ],
    expected: new Map([
      ["0,0", [[1, 0], [0, 1]]],
      ["0,1", [[1, 1], [0, 0], [0, 2]]],
      ["0,2", [[1, 2], [0, 1]]],

      ["1,0", [[0, 0], [2, 0], [1, 1]]],
      ["1,1", [[0, 1], [2, 1], [1, 0], [1, 2]]],
      ["1,2", [[0, 2], [2, 2], [1, 1]]],

      ["2,0", [[1, 0], [2, 1]]],
      ["2,1", [[1, 1], [2, 0], [2, 2]]],
      ["2,2", [[1, 2], [2, 1]]],
    ]),
  },

  {
    description: "Diagonal 1s — not connected",

    // 1 0 0
    // 0 1 0
    // 0 0 1
    //
    // Diagonal cells are NOT neighbors.
    graph: [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ],
    expected: new Map([
      ["0,0", []],
      ["1,1", []],
      ["2,2", []],
    ]),
  },

  {
    description: "Diagonal connection plus horizontal connection",

    // 1 1 0
    // 0 1 0
    // 0 0 1
    //
    // (0,0) -- (0,1)
    //           |
    //         (1,1)
    //
    // (2,2) is isolated because diagonal
    // connections are not considered.
    graph: [
      [1, 1, 0],
      [0, 1, 0],
      [0, 0, 1],
    ],
    expected: new Map([
      ["0,0", [[0, 1]]],
      ["0,1", [[1, 1], [0, 0]]],
      ["1,1", [[0, 1]]],
      ["2,2", []],
    ]),
  },

  {
    description: "Cross-shaped graph",

    // 0 1 0
    // 1 1 1
    // 0 1 0
    graph: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 1, 0],
    ],
    expected: new Map([
      ["0,1", [[1, 1]]],
      ["1,0", [[1, 1]]],
      ["1,1", [[0, 1], [2, 1], [1, 0], [1, 2]]],
      ["1,2", [[1, 1]]],
      ["2,1", [[1, 1]]],
    ]),
  },

  {
    description: "Single row with multiple components",

    // 1 1 0 1 0 1 1
    graph: [[1, 1, 0, 1, 0, 1, 1]],
    expected: new Map([
      ["0,0", [[0, 1]]],
      ["0,1", [[0, 0]]],
      ["0,3", []],
      ["0,5", [[0, 6]]],
      ["0,6", [[0, 5]]],
    ]),
  },

  {
    description: "Single column with multiple components",

    // 1
    // 1
    // 0
    // 1
    // 0
    // 1
    graph: [
      [1],
      [1],
      [0],
      [1],
      [0],
      [1],
    ],
    expected: new Map([
      ["0,0", [[1, 0]]],
      ["1,0", [[0, 0]]],
      ["3,0", []],
      ["5,0", []],
    ]),
  },

  {
    description: "Complex grid with multiple components",

    // 1 1 0 0 1
    // 1 0 0 1 1
    // 0 0 0 0 0
    // 1 1 0 0 1
    // 0 1 0 1 1
    graph: [
      [1, 1, 0, 0, 1],
      [1, 0, 0, 1, 1],
      [0, 0, 0, 0, 0],
      [1, 1, 0, 0, 1],
      [0, 1, 0, 1, 1],
    ],
    expected: new Map([
      ["0,0", [[1, 0], [0, 1]]],
      ["0,1", [[0, 0]]],
      ["1,0", [[0, 0]]],

      ["0,4", [[1, 4]]],
      ["1,3", [[1, 4]]],
      ["1,4", [[0, 4], [1, 3]]],

      ["3,0", [[3, 1]]],
      ["3,1", [[4, 1], [3, 0]]],
      ["4,1", [[3, 1]]],

      ["3,4", [[4, 4]]],
      ["4,3", [[4, 4]]],
      ["4,4", [[3, 4], [4, 3]],
      ],
    ]),
  },
];

runTests(testCases)