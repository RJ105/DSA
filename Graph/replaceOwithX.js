//given a matrix with X and O. 
// consider multi component graph, for each component, keep a flag boolean capture as true,  
// do matrix BFS if any node is on the edge then capture will be false, 
// during traversal push the node in queue as well as in mark array.
//  If capture flag if true then using mark array mark all O to X 

// 1< rowlimit < rowLen-1
// 1< colLimit < colLen -1  


//brute force approach : in this approach we will check for all the O node in iteration
function replaceOWithXBruteForce(board){
      const rows = board.length;

    if (rows === 0) return board;

    const cols = board[0].length;

    const visited = Array.from(
        { length: rows },
        () => Array(cols).fill(false)
    );

    const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1]
    ];

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {

            // Start BFS for every unvisited O.
            if (board[r][c] === "O" && !visited[r][c]) {

                const queue = [[r, c]];
                let front = 0;

                const component = [];
                let touchesBoundary = false;

                visited[r][c] = true;

                while (front < queue.length) {
                    const [row, col] = queue[front++];

                    component.push([row, col]);

                    // Check whether this component touches boundary.
                    if (
                        row === 0 ||
                        row === rows - 1 ||
                        col === 0 ||
                        col === cols - 1
                    ) {
                        touchesBoundary = true;
                    }

                    for (const [dr, dc] of directions) {
                        const nr = row + dr;
                        const nc = col + dc;

                        if (
                            nr >= 0 && nr < rows &&
                            nc >= 0 && nc < cols &&
                            board[nr][nc] === "O" &&
                            !visited[nr][nc]
                        ) {
                            visited[nr][nc] = true;
                            queue.push([nr, nc]);
                        }
                    }
                }

                // If component does not touch boundary,
                // replace all its O cells with X.
                if (!touchesBoundary) {
                    for (const [row, col] of component) {
                        board[row][col] = "X";
                    }
                }
            }
        }
    }

    return board;
}


//smart approach : here we will first preserve the invalid boundary cases and then mark the remaining as X
function replaceOWithX(board) {
    const rows = board.length;

    if (rows === 0) return board;

    const cols = board[0].length;
    if (cols === 0) return board;

    const queue = [];
    let front = 0;

    const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1]
    ];

    // Step 1: Add boundary O cells to the queue.
    function addBoundaryCell(r, c) {
        if (board[r][c] === "O") {
            board[r][c] = "#";
            queue.push([r, c]);
        }
    }

    for (let r = 0; r < rows; r++) {
        addBoundaryCell(r, 0);
        addBoundaryCell(r, cols - 1);
    }

    for (let c = 0; c < cols; c++) {
        addBoundaryCell(0, c);
        addBoundaryCell(rows - 1, c);
    }

    // Step 2: BFS to preserve all O cells connected to a boundary O.
    while (front < queue.length) {
        const [r, c] = queue[front++];

        for (const [dr, dc] of directions) {
            const nr = r + dr;
            const nc = c + dc;

            if (
                nr >= 0 && nr < rows &&
                nc >= 0 && nc < cols &&
                board[nr][nc] === "O"
            ) {
                board[nr][nc] = "#";
                queue.push([nr, nc]);
            }
        }
    }

    // Step 3: Replace surrounded O with X; restore safe cells.
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (board[r][c] === "O") {
                board[r][c] = "X";
            } else if (board[r][c] === "#") {
                board[r][c] = "O";
            }
        }
    }

    return board;
}

// Test runner
function runTests(testCases) {
    let passed = 0;
    let failed = 0;

    testCases.forEach(({ description, board, expected }, i) => {
        // Copy input so the original testcase stays unchanged.
        const input = board.map(row => [...row]);
        // const result = replaceOWithXBruteForce(input);
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