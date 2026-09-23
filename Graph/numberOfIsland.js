function islandCount(matrix){
    
    if(matrix.length === 0){
        return 0
    }
    const rowLen = matrix.length
    const colLen = matrix[0].length 
    const visited = Array.from({length:rowLen}, ()=> Array(colLen).fill(false))
    const queue = []
    let count = 0

    //direction array for 8 direction 
    const direction = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],          [0, 1],
        [1, -1], [1, 0], [1, 1]
    ]

    function BFS(r, c){
        visited[r][c] = true 
        queue.push([r, c])
        while(queue.length){
            [r,c] = queue.shift()
            for(const [dr, dc] of direction){
                nr = r + dr 
                nc = c + dc 
                if(
                    nr >= 0 && nr < rowLen && nc >= 0 && nc < colLen 
                    && matrix[nr][nc] === 1
                    && !visited[nr][nc]
                ){
                    visited[nr][nc] = true 
                    queue.push([nr,nc])
                }

            }
        }
    }


    for(let i=0; i<rowLen; i++){
        for(let j=0; j<colLen; j++){
            if(matrix[i][j] === 1 && !visited[i][j] ){
                count++
                BFS(i,j)
            }
        }
    }

    return count
}


function runTests(testCases) {
  let passed = 0, failed = 0;
  testCases.forEach(({ description, grid, expected }, i) => {
    const result = islandCount(grid);
    const ok = result === expected;
    if (ok) { passed++; console.log(`✅ Test ${i + 1}: ${description}`); }
    else { failed++; console.log(`❌ Test ${i + 1}: ${description} | expected ${expected}, got ${result}`); }
  });
  console.log(`\n${passed}/${passed + failed} passed`);
}

const testCases = [

  {
    description: "Empty grid",
    grid: [],
    expected: 0
  },

  {
    description: "Single land cell",
    grid: [[1]],
    expected: 1
  },

  {
    description: "Single water cell",
    grid: [[0]],
    expected: 0
  },

  {
    description: "Two horizontal cells",
    grid: [[1, 1]],
    expected: 1
  },

  {
    description: "Two vertical cells",
    grid: [
      [1],
      [1]
    ],
    expected: 1
  },

  {
    description: "Two diagonal cells - connected in 8 directions",
    grid: [
      [1, 0],
      [0, 1]
    ],
    expected: 1
  },

  {
    description: "Two opposite diagonal cells - connected",
    grid: [
      [0, 1],
      [1, 0]
    ],
    expected: 1
  },

  {
    description: "Diagonal chain",
    grid: [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ],
    expected: 1
  },

  {
    description: "All diagonal cells connected",
    grid: [
      [1, 0, 1],
      [0, 1, 0],
      [1, 0, 1]
    ],
    expected: 1
  },

  {
    description: "All water",
    grid: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ],
    expected: 0
  },

  {
    description: "All land",
    grid: [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1]
    ],
    expected: 1
  },

  {
    description: "Four corners connected diagonally through center",
    grid: [
      [1, 0, 1],
      [0, 1, 0],
      [1, 0, 1]
    ],
    expected: 1
  },

  {
    description: "Two islands with no diagonal connection",
    grid: [
      [1, 0, 0, 0],
      [0, 0, 0, 1],
      [0, 0, 0, 0],
      [1, 0, 0, 0]
    ],
    expected: 3
  },

  {
    description: "Diagonal connection between two groups",
    grid: [
      [1, 1, 0],
      [0, 0, 1],
      [0, 0, 1]
    ],
    expected: 1
  },

  {
    description: "Three separate islands",
    grid: [
      [1, 0, 0, 1],
      [0, 0, 0, 0],
      [1, 0, 0, 0]
    ],
    expected: 3
  },

  {
    description: "Diagonal cells connect multiple groups",
    grid: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 1]
    ],
    expected: 1
  },

  {
    description: "Isolated cells become connected diagonally",
    grid: [
      [1, 0, 1],
      [0, 0, 0],
      [1, 0, 1]
    ],
    expected: 4
  },

  {
    description: "Diagonal bridge connects two components",
    grid: [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ],
    expected: 1
  },

  {
    description: "Single row with separated islands",
    grid: [[1, 0, 1, 0, 1]],
    expected: 3
  },

  {
    description: "Single column with separated islands",
    grid: [
      [1],
      [0],
      [1],
      [0],
      [1]
    ],
    expected: 3
  },

  {
    description: "Complex 8-direction connected island",
    grid: [
      [1, 0, 0, 1, 0],
      [0, 1, 1, 0, 0],
      [0, 0, 1, 0, 1],
      [1, 0, 0, 1, 0],
      [0, 1, 0, 0, 1]
    ],
    expected: 2
  }
];

runTests(testCases)