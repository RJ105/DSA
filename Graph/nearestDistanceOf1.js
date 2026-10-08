//first mark distannce matrix with value 1 as 0. then forach cell having value 0 run the BFS.
// in BFS we have to find the first 1 then we have to break the BFS for the cell of matrix i.e. outer loop.
// for each cell in we have to maintain new visited array.

//brute force approach
function nearest1Distance(matrix){
    const rowLen = matrix.length
    const colLen = matrix[0].length 

    let distMatrix = Array.from({length:rowLen}, ()=> Array(colLen).fill(0))

    const direction = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],        [0, 1],
        [1, -1], [1, 0], [1,1]
    ]

    function BFS(i, j){
        let visited = Array.from({length: rowLen}, ()=> Array(colLen).fill(false))
        let queue = []

        visited[i][j] = true 
        queue.push([i, j, 0])
        while(queue.length){
            let [r, c, dist] = queue.shift()
            for(const [dr, dc] of direction){
                let nr = r + dr 
                let nc = c + dc 

                if(nr>=0 && nr < rowLen && nc>=0 && nc < colLen 
                    && !visited[nr][nc]
                ){
                    visited[nr][nc] = true
                    if(matrix[nr][nc] === 1){
                        return dist + 1
                    }
                    else{
                        queue.push([nr, nc, dist + 1]);
                    }
                }
            }
        }
        return -1
    }


    for(let i=0; i<rowLen; i++){
        for(let j=0; j<colLen; j++){
            if(matrix[i][j] === 1){
                distMatrix[i][j] = 0
            }
            else{
                //call BFS 
                distMatrix[i][j] = BFS(i, j)
            }
        }
    }
    return distMatrix
}


const testCases = [

    {
        description: "Single 1",
        matrix: [
            [0, 0, 0],
            [0, 1, 0],
            [0, 0, 0]
        ],
        expected: [
            [1, 1, 1],
            [1, 0, 1],
            [1, 1, 1]
        ]
    },

    {
        description: "All cells are 1",
        matrix: [
            [1, 1],
            [1, 1]
        ],
        expected: [
            [0, 0],
            [0, 0]
        ]
    },

    {
        description: "All cells are 0 - no 1 exists",
        matrix: [
            [0, 0],
            [0, 0]
        ],
        expected: [
            [-1, -1],
            [-1, -1]
        ]
    },

    {
        description: "Multiple 1s",
        matrix: [
            [1, 0, 0],
            [0, 0, 0],
            [0, 0, 1]
        ],
        expected: [
        [0, 1, 2],
        [1, 1, 1],
        [2, 1, 0]
    ]
    },

    {
        description: "Diagonal nearest 1 using 8 directions",
        matrix: [
            [1, 0],
            [0, 0]
        ],
        expected: [
            [0, 1],
            [1, 1]
        ]
    },

    {
        description: "Nearest 1 is diagonal",
        matrix: [
            [0, 0, 1],
            [0, 0, 0],
            [1, 0, 0]
        ],
        expected: [
        [2, 1, 0],
        [1, 1, 1],
        [0, 1, 2]
    ]
    },

    {
        description: "1s at opposite corners",
        matrix: [
            [1, 0, 0],
            [0, 0, 0],
            [0, 0, 1]
        ],
        expected: [
            [0, 1, 2],
            [1, 1, 1],
            [2, 1, 0]
        ]
    }
];

function runTests(testCases) {
    let passed = 0, failed = 0;

    testCases.forEach(({ description, matrix, expected }, i) => {
        const result = nearest1Distance(matrix);

        const ok =
            JSON.stringify(result) === JSON.stringify(expected);

        if (ok) {
            passed++;
            console.log(`✅ Test ${i + 1}: ${description}`);
        } else {
            failed++;
            console.log(
                `❌ Test ${i + 1}: ${description} | expected ${JSON.stringify(expected)}, got ${JSON.stringify(result)}`
            );
        }
    });

    console.log(`\n${passed}/${passed + failed} passed`);
}

runTests(testCases);