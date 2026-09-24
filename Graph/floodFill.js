//we have to fill only nodes connected to starting node and having value equal to starting node 
// we dont need to check visited matrix here, because originalColor check is doing its work
function floodFill(matrix, sr, sc, newColor){
    // Nothing to change
    const originalColor = matrix[sr][sc]
    if (originalColor === newColor) {
        return matrix;
    }

    const rowLen = matrix.length
    const colLen = matrix[0].length 

    const visited = Array.from({length: rowLen}, ()=> Array(colLen).fill(false))
    const queue = []  
    const direction = [ [-1, 0], [0,1], [1, 0], [0, -1]]

    visited[sr][sc] = true
    queue.push([sr,sc])
    matrix[sr][sc] = newColor
    while(queue.length){
        const [r, c] = queue.shift()
        for(const [dr, dc] of direction){
            let nr = r + dr
            let nc = c + dc 
            if(
                nr >=0 && nr < rowLen && nc>=0 && nc < colLen
                && matrix[nr][nc] === originalColor 
                && !visited[nr][nc]
            ){
                visited[nr][nc] = true 
                queue.push([nr,nc])
                matrix[nr][nc] = newColor
            }
        }
    }
   
   return matrix  

}


const testCases = [

    {
        description: "Basic connected component",
        image: [
            [1, 1, 1],
            [1, 1, 0],
            [1, 0, 1]
        ],
        sr: 1,
        sc: 1,
        newColor: 2,
        expected: [
            [2, 2, 2],
            [2, 2, 0],
            [2, 0, 1]
        ]
    },

    {
        description: "Starting cell is isolated",
        image: [
            [1, 1, 1],
            [1, 0, 1],
            [1, 1, 1]
        ],
        sr: 1,
        sc: 1,
        newColor: 2,
        expected: [
            [1, 1, 1],
            [1, 2, 1],
            [1, 1, 1]
        ]
    },

    {
        description: "Entire grid has same color",
        image: [
            [1, 1],
            [1, 1]
        ],
        sr: 0,
        sc: 0,
        newColor: 2,
        expected: [
            [2, 2],
            [2, 2]
        ]
    },

    {
        description: "Only starting cell changes",
        image: [
            [1, 0],
            [0, 0]
        ],
        sr: 0,
        sc: 0,
        newColor: 2,
        expected: [
            [2, 0],
            [0, 0]
        ]
    },

    {
        description: "Horizontal connected cells",
        image: [
            [1, 1, 1, 0]
        ],
        sr: 0,
        sc: 1,
        newColor: 2,
        expected: [
            [2, 2, 2, 0]
        ]
    },

    {
        description: "Vertical connected cells",
        image: [
            [1],
            [1],
            [1],
            [0]
        ],
        sr: 1,
        sc: 0,
        newColor: 2,
        expected: [
            [2],
            [2],
            [2],
            [0]
        ]
    },

    {
        description: "Diagonal cells are NOT connected",
        image: [
            [1, 0],
            [0, 1]
        ],
        sr: 0,
        sc: 0,
        newColor: 2,
        expected: [
            [2, 0],
            [0, 1]
        ]
    },

    {
        description: "Diagonal chain is NOT connected",
        image: [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ],
        sr: 0,
        sc: 0,
        newColor: 2,
        expected: [
            [2, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ]
    },

    {
        description: "Fill middle component only",
        image: [
            [1, 1, 0, 2],
            [1, 0, 0, 2],
            [0, 0, 1, 2],
            [3, 3, 3, 2]
        ],
        sr: 0,
        sc: 0,
        newColor: 5,
        expected: [
            [5, 5, 0, 2],
            [5, 0, 0, 2],
            [0, 0, 1, 2],
            [3, 3, 3, 2]
        ]
    },

    {
        description: "Starting from a different component",
        image: [
            [1, 1, 0],
            [1, 0, 0],
            [0, 0, 2]
        ],
        sr: 2,
        sc: 2,
        newColor: 5,
        expected: [
            [1, 1, 0],
            [1, 0, 0],
            [0, 0, 5]
        ]
    },

    {
        description: "New color already exists elsewhere",
        image: [
            [1, 1, 2],
            [1, 0, 2],
            [0, 0, 2]
        ],
        sr: 0,
        sc: 0,
        newColor: 2,
        expected: [
            [2, 2, 2],
            [2, 0, 2],
            [0, 0, 2]
        ]
    },

    {
        description: "Original color equals new color",
        image: [
            [1, 1],
            [1, 0]
        ],
        sr: 0,
        sc: 0,
        newColor: 1,
        expected: [
            [1, 1],
            [1, 0]
        ]
    },

    {
        description: "Single cell",
        image: [[1]],
        sr: 0,
        sc: 0,
        newColor: 7,
        expected: [[7]]
    },

    {
        description: "Single cell same color",
        image: [[5]],
        sr: 0,
        sc: 0,
        newColor: 5,
        expected: [[5]]
    },

    {
        description: "Single row with multiple components",
        image: [
            [1, 1, 0, 1, 1]
        ],
        sr: 0,
        sc: 0,
        newColor: 9,
        expected: [
            [9, 9, 0, 1, 1]
        ]
    },

    {
        description: "Single column with multiple components",
        image: [
            [1],
            [1],
            [0],
            [1],
            [1]
        ],
        sr: 0,
        sc: 0,
        newColor: 9,
        expected: [
            [9],
            [9],
            [0],
            [1],
            [1]
        ]
    },

    {
        description: "Large connected region",
        image: [
            [1, 1, 1, 0, 0],
            [1, 1, 1, 0, 1],
            [1, 1, 1, 0, 1],
            [0, 0, 0, 0, 1]
        ],
        sr: 1,
        sc: 1,
        newColor: 8,
        expected: [
            [8, 8, 8, 0, 0],
            [8, 8, 8, 0, 1],
            [8, 8, 8, 0, 1],
            [0, 0, 0, 0, 1]
        ]
    },

    {
        description: "Complex shape with separate same-color region",
        image: [
            [1, 1, 0, 0, 1],
            [1, 0, 0, 1, 1],
            [0, 0, 0, 0, 0],
            [1, 1, 0, 1, 1],
            [1, 1, 0, 1, 1]
        ],
        sr: 0,
        sc: 0,
        newColor: 7,
        expected: [
            [7, 7, 0, 0, 1],
            [7, 0, 0, 1, 1],
            [0, 0, 0, 0, 0],
            [1, 1, 0, 1, 1],
            [1, 1, 0, 1, 1]
        ]
    },

    {
        description: "Zero as original color",
        image: [
            [0, 0, 1],
            [0, 1, 1],
            [1, 1, 0]
        ],
        sr: 0,
        sc: 0,
        newColor: 9,
        expected: [
            [9, 9, 1],
            [9, 1, 1],
            [1, 1, 0]
        ]
    },

    {
        description: "Fill zero component without affecting ones",
        image: [
            [0, 0, 0],
            [0, 1, 0],
            [0, 0, 0]
        ],
        sr: 0,
        sc: 0,
        newColor: 3,
        expected: [
            [3, 3, 3],
            [3, 1, 3],
            [3, 3, 3]
        ]
    }
];


// --------------------------------------------------
// Test Runner
// --------------------------------------------------

function runTests(testCases) {

    let passed = 0;
    let failed = 0;

    testCases.forEach(
        ({ description, image, sr, sc, newColor, expected }, i) => {

            // Copy input so each test remains independent
            const input = image.map(row => [...row]);

            const result = floodFill(
                input,
                sr,
                sc,
                newColor
            );

            const ok = JSON.stringify(result) === JSON.stringify(expected);

            if (ok) {
                passed++;
                console.log(`✅ Test ${i + 1}: ${description}`);
            } else {
                failed++;
                console.log(
                    `❌ Test ${i + 1}: ${description}`
                );
                console.log(
                    `   Expected: ${JSON.stringify(expected)}`
                );
                console.log(
                    `   Got:      ${JSON.stringify(result)}`
                );
            }
        }
    );

    console.log(`\n${passed}/${passed + failed} passed`);

    if (failed > 0) {
        console.log(`❌ ${failed} test(s) failed`);
    } else {
        console.log("🎉 All tests passed!");
    }
}

runTests(testCases);




