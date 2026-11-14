

function numberOfDistinctIsland(matrix){
    if(matrix.length === 0) return 0
    const rowLen = matrix.length
    const colLen = matrix[0].length 

    const visited = Array.from({length : rowLen}, ()=> Array(colLen).fill(false))
    const direction = [[0,1], [0,-1], [-1,0], [1,0]]

    function BFS(i,j){
        const br = i
        const bc = j
        let alignment = []
        alignment.push([0, 0])
        visited[i][j] = true 
        const queue = []
        queue.push([i,j])

        while(queue.length){
            let [r,c] = queue.shift()
            for(let [dr, dc] of direction){
                const nr = r + dr 
                const nc = c + dc 
                
                if(
                    nr >= 0 && nr < rowLen &&
                    nc >= 0 && nc < colLen &&
                    matrix[nr][nc] === 1 &&
                    !visited[nr][nc]
                ){
                    visited[nr][nc] = true
                    queue.push([nr, nc])
                    alignment.push([nr- br, nc - bc])
                }
            }
        }

        return alignment
    }


    const distinctIsland = new Set()
    for(let i=0; i<rowLen; i++){
        for(let j=0; j< colLen; j++){
            if(matrix[i][j] === 1 && !visited[i][j]){
                distinctIsland.add(JSON.stringify(BFS(i,j)))
            }
        }
    }

    return distinctIsland.size
}

const testCases = [
    {
        description: "Two identical L-shaped islands",
        grid: [
            [1, 1, 0, 0, 1, 1],
            [1, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0]
        ],
        expected: 1
    },
    {
        description: "Two different island shapes",
        grid: [
            [1, 1, 0, 0, 1],
            [0, 0, 0, 0, 1],
            [0, 0, 0, 0, 1]
        ],
        expected: 2
    },
    {
        description: "Multiple identical single-cell islands",
        grid: [
            [1, 0, 1],
            [0, 0, 0],
            [1, 0, 1]
        ],
        expected: 1
    },
    {
        description: "Diagonal cells are separate islands",
        grid: [
            [1, 0],
            [0, 1]
        ],
        expected: 1
    },
    {
        description: "All cells are land",
        grid: [
            [1, 1],
            [1, 1]
        ],
        expected: 1
    },
    {
        description: "All cells are water",
        grid: [
            [0, 0, 0],
            [0, 0, 0]
        ],
        expected: 0
    },
    {
        description: "Two identical horizontal islands",
        grid: [
            [1, 1, 0, 1, 1]
        ],
        expected: 1
    },
    {
        description: "Empty grid",
        grid: [],
        expected: 0
    },
    {
        description: "Single land cell",
        grid: [
            [1]
        ],
        expected: 1
    },
    {
        description: "Three distinct shapes",
        grid: [
            [1, 1, 0, 1, 0, 1],
            [1, 0, 0, 1, 1, 1],
            [0, 0, 0, 0, 0, 0],
            [1, 1, 0, 1, 1, 0],
            [0, 0, 0, 0, 0, 0]
        ],
        expected: 3
    }
];

function runTests(testCases) {
    let passed = 0;
    let failed = 0;

    testCases.forEach(({ description, grid, expected }, i) => {
        const result = numberOfDistinctIsland(grid);

        const ok = result === expected;

        if (ok) {
            passed++;
            console.log(`✅ Test ${i + 1}: ${description}`);
        } else {
            failed++;
            console.log(
                `❌ Test ${i + 1}: ${description} | expected ${expected}, got ${result}`
            );
        }
    });

    console.log(`\n${passed}/${passed + failed} passed`);
}

runTests(testCases);