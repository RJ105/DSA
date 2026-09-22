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
        while(!queue.length){
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
                BFS()
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

    // ============================================================
    // 1. EMPTY GRID
    // ============================================================

    {
        description: "Empty grid — zero islands",
        grid: [],
        expected: 0,
    },


    // ============================================================
    // 2. EMPTY ROW
    // ============================================================

    {
        description: "Grid with zero columns — zero islands",
        grid: [
            []
        ],
        expected: 0,
    },


    // ============================================================
    // 3. SINGLE CELL
    // ============================================================

    {
        description: "Single land cell — one island",
        // 1
        grid: [
            [1]
        ],
        expected: 1,
    },

    {
        description: "Single water cell — zero islands",
        // 0
        grid: [
            [0]
        ],
        expected: 0,
    },


    // ============================================================
    // 4. TWO CELLS
    // ============================================================

    {
        description: "Two horizontal land cells — one island",
        // 1 1
        grid: [
            [1, 1]
        ],
        expected: 1,
    },

    {
        description: "Two horizontal separated land cells — two islands",
        // 1 0 1
        grid: [
            [1, 0, 1]
        ],
        expected: 2,
    },

    {
        description: "Two vertical land cells — one island",
        // 1
        // 1
        grid: [
            [1],
            [1]
        ],
        expected: 1,
    },


    // ============================================================
    // 5. ALL WATER
    // ============================================================

    {
        description: "All water — zero islands",
        grid: [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ],
        expected: 0,
    },


    // ============================================================
    // 6. ALL LAND
    // ============================================================

    {
        description: "All land — one island",
        grid: [
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1]
        ],
        expected: 1,
    },


    // ============================================================
    // 7. TWO SEPARATE ISLANDS
    // ============================================================

    {
        description: "Two separate islands",
        // 1 1 0
        // 1 0 0
        // 0 0 1
        grid: [
            [1, 1, 0],
            [1, 0, 0],
            [0, 0, 1]
        ],
        expected: 2,
    },


    // ============================================================
    // 8. MULTIPLE ISLANDS
    // ============================================================

    {
        description: "Four isolated land cells — four islands",
        // 1 0 1
        // 0 0 0
        // 1 0 1
        grid: [
            [1, 0, 1],
            [0, 0, 0],
            [1, 0, 1]
        ],
        expected: 4,
    },


    // ============================================================
    // 9. L-SHAPED ISLAND
    // ============================================================

    {
        description: "L-shaped land — one island",
        // 1 0
        // 1 0
        // 1 1
        grid: [
            [1, 0],
            [1, 0],
            [1, 1]
        ],
        expected: 1,
    },


    // ============================================================
    // 10. MULTIPLE COMPONENTS
    // ============================================================

    {
        description: "Three disconnected islands",
        // 1 1 0 0 1
        // 1 0 0 0 1
        // 0 0 1 0 0
        grid: [
            [1, 1, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [0, 0, 1, 0, 0]
        ],
        expected: 3,
    },


    // ============================================================
    // 11. DIAGONAL CELLS
    // ============================================================

    {
        description: "Diagonal cells are separate islands",
        // 1 0
        // 0 1
        grid: [
            [1, 0],
            [0, 1]
        ],
        expected: 2,
    },

    {
        description: "Diagonal chain — three separate islands",
        // 1 0 0
        // 0 1 0
        // 0 0 1
        grid: [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ],
        expected: 3,
    },


    // ============================================================
    // 12. DIAGONAL + ORTHOGONAL CONNECTION
    // ============================================================

    {
        description: "Diagonal plus horizontal connection — two islands",
        // 1 1 0
        // 0 1 0
        // 0 0 1
        grid: [
            [1, 1, 0],
            [0, 1, 0],
            [0, 0, 1]
        ],
        expected: 2,
    },


    // ============================================================
    // 13. SURROUNDED ISLAND
    // ============================================================

    {
        description: "Island surrounded by water — one island",
        // 0 0 0
        // 0 1 0
        // 0 0 0
        grid: [
            [0, 0, 0],
            [0, 1, 0],
            [0, 0, 0]
        ],
        expected: 1,
    },


    // ============================================================
    // 14. BORDER ISLANDS
    // ============================================================

    {
        description: "Land along border — one island",
        // 1 1 1
        // 0 0 1
        // 0 0 1
        grid: [
            [1, 1, 1],
            [0, 0, 1],
            [0, 0, 1]
        ],
        expected: 1,
    },

    {
        description: "Separate border islands — two islands",
        // 1 0 0 1
        // 0 0 0 0
        // 1 0 0 1
        grid: [
            [1, 0, 0, 1],
            [0, 0, 0, 0],
            [1, 0, 0, 1]
        ],
        expected: 4,
    },


    // ============================================================
    // 15. SINGLE ROW
    // ============================================================

    {
        description: "Single row with three islands",
        // 1 1 0 1 0 1 1
        grid: [
            [1, 1, 0, 1, 0, 1, 1]
        ],
        expected: 3,
    },


    // ============================================================
    // 16. SINGLE COLUMN
    // ============================================================

    {
        description: "Single column with three islands",
        // 1
        // 1
        // 0
        // 1
        // 0
        // 1
        // 1
        grid: [
            [1],
            [1],
            [0],
            [1],
            [0],
            [1],
            [1]
        ],
        expected: 3,
    },


    // ============================================================
    // 17. LARGE CONNECTED SHAPE
    // ============================================================

    {
        description: "Large connected island with irregular shape",
        grid: [
            [1, 1, 0, 0, 0],
            [1, 1, 1, 0, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 1, 1, 1],
            [0, 0, 0, 1, 1]
        ],
        expected: 1,
    },


    // ============================================================
    // 18. LARGE NUMBER OF ISLANDS
    // ============================================================

    {
        description: "Nine isolated islands",
        // 1 0 1 0 1
        // 0 0 0 0 0
        // 1 0 1 0 1
        // 0 0 0 0 0
        // 1 0 1 0 1
        grid: [
            [1, 0, 1, 0, 1],
            [0, 0, 0, 0, 0],
            [1, 0, 1, 0, 1],
            [0, 0, 0, 0, 0],
            [1, 0, 1, 0, 1]
        ],
        expected: 9,
    },


    // ============================================================
    // 19. CLASSIC EXAMPLE
    // ============================================================

    {
        description: "Classic island example — one island",
        grid: [
            [1, 1, 1, 1, 0],
            [1, 1, 0, 1, 0],
            [1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ],
        expected: 1,
    },

    {
        description: "Classic island example — three islands",
        grid: [
            [1, 1, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 1, 1]
        ],
        expected: 3,
    },


    // ============================================================
    // 20. ISLANDS CONNECTED BY A NARROW PATH
    // ============================================================

    {
        description: "Two regions connected by one-cell path — one island",
        grid: [
            [1, 1, 0, 0, 1],
            [0, 1, 0, 0, 1],
            [0, 1, 1, 1, 1]
        ],
        expected: 1,
    }

];

runTests(testCases)