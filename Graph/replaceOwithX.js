//given a matrix with X and O. 
// consider multi component graph, for each component, keep a flag boolean capture as true,  
// do matrix BFS if any node is on the edge then capture will be false, 
// during traversal push the node in queue as well as in mark array.
//  If capture flag if true then using mark array mark all O to X 

// 1< rowlimit < rowLen-1
// 1< colLimit < colLen -1  

function replaceOWithX(matrix){
    const rowLen = matrix.length 
    const colLen = matrix[0].length 

    const visited = Array.from({length: matrix.length}, ()=> Array(colLen).fill(false))
    const direction = [[-1,0], [1,0], [0,-1], [0,1]]
    function BFS(i, j){
        let mark = []
        let queue = []
        queue.push([i,j])
        let capture = true 
        while(queue.length){
            const [r,c] = queue.shift()
            for([dr, dc] of direction){
                let nr = r + dr 
                let nc = c + dc 
                if( !visited[nr][nc] && matrix[nr][nc] != 'X'){
                    if(nr>0 && nr < rowLen-1 && nc>0 && nc < colLen-1){
                        mark.push([nr,nc])
                        visited[nr][nc] = true
                    }else{
                        capture = false
                    }
                }
            }
        }

        if(capture){
            for(const [m,n] of mark){
                matrix[m][n] = 'X'
            }
        }

    }

    for(let i=0; i<rowLen; i++){
        for(let j=0; j<colLen; j++){
            if(!visited[i][j] && matrix[i][j] === 'O'){
                visited[i][j] = true
                BFS(i, j)
            }
        }
    }

    return matrix
}


// Test runner
function runTests(testCases) {
    let passed = 0;
    let failed = 0;

    testCases.forEach(({ description, board, expected }, i) => {
        // Copy input so the original testcase stays unchanged.
        const input = board.map(row => [...row]);
        const result = replaceOWithX(input);

        const ok =
            JSON.stringify(result) === JSON.stringify(expected);

        if (ok) {
            passed++;
            console.log(`✅ Test ${i + 1}: ${description}`);
        } else {
            failed++;
            console.log(`❌ Test ${i + 1}: ${description}`);
            console.log("Expected:", JSON.stringify(expected));
            console.log("Actual:  ", JSON.stringify(result));
        }
    });

    console.log(`\n${passed}/${passed + failed} passed`);
}

const testCases = [
    {
        description: "Surrounded region and boundary O",
        board: [
            ["X", "X", "X", "X"],
            ["X", "O", "O", "X"],
            ["X", "X", "O", "X"],
            ["X", "O", "X", "X"]
        ],
        expected: [
            ["X", "X", "X", "X"],
            ["X", "X", "X", "X"],
            ["X", "X", "X", "X"],
            ["X", "O", "X", "X"]
        ]
    },
    {
        description: "All X cells",
        board: [
            ["X", "X"],
            ["X", "X"]
        ],
        expected: [
            ["X", "X"],
            ["X", "X"]
        ]
    },
    {
        description: "All O cells",
        board: [
            ["O", "O"],
            ["O", "O"]
        ],
        expected: [
            ["O", "O"],
            ["O", "O"]
        ]
    },
    {
        description: "O connected to boundary",
        board: [
            ["X", "O", "X"],
            ["X", "O", "X"],
            ["X", "X", "X"]
        ],
        expected: [
            ["X", "O", "X"],
            ["X", "O", "X"],
            ["X", "X", "X"]
        ]
    },
    {
        description: "Diagonal connection does not count",
        board: [
            ["X", "X", "X"],
            ["X", "O", "X"],
            ["X", "X", "O"]
        ],
        expected: [
            ["X", "X", "X"],
            ["X", "X", "X"],
            ["X", "X", "O"]
        ]
    },
    {
        description: "Single enclosed O",
        board: [
            ["X", "X", "X"],
            ["X", "O", "X"],
            ["X", "X", "X"]
        ],
        expected: [
            ["X", "X", "X"],
            ["X", "X", "X"],
            ["X", "X", "X"]
        ]
    },
    {
        description: "Empty board",
        board: [],
        expected: []
    }
];

runTests(testCases);