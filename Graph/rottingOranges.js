function rottingOranges(grid) {
  //find the row and column length 
  const rows = grid.length;
  const cols = grid[0].length;
  const directions = [[0,1],[0,-1],[1,0],[-1,0]];

  const queue = [];
  let fresh = 0;
  let minutes = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 2) queue.push([r, c]);
      if (grid[r][c] === 1) fresh++;
    }
  }

  while (queue.length > 0 && fresh > 0) {
    const size = queue.length;

    for (let i = 0; i < size; i++) {
      const [r, c] = queue.shift();

      for (const [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;

        if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
        if (grid[nr][nc] !== 1) continue;

        grid[nr][nc] = 2;
        fresh--;
        queue.push([nr, nc]);
      }
    }

    minutes++;
  }

  return fresh === 0 ? minutes : -1;
}

// // ─── Pointer Queue (O(1) dequeue) ─────────────────────────────
// class Queue {
//   constructor() { this.data = []; this.head = 0; }
//   enqueue(val)  { this.data.push(val); }
//   dequeue()     { return this.data[this.head++]; }
//   isEmpty()     { return this.head >= this.data.length; }
//   size()        { return this.data.length - this.head; }
// }

// ─── Test Runner ───────────────────────────────────────────────
function runTests(testCases) {
  let passed = 0, failed = 0;

  testCases.forEach(({ description, grid, expected }, i) => {
    // deep copy grid so original isn't mutated across tests
    const copy = grid.map(row => [...row]);
    const result = rottingOranges(copy);
    const ok = result === expected;
    if (ok) {
      passed++;
      console.log(`✓ Test ${i + 1}: ${description}`);
    } else {
      failed++;
      console.log(`✗ Test ${i + 1}: ${description}`);
      console.log(`    Expected : ${expected}`);
      console.log(`    Got      : ${result}`);
    }
  });

  console.log(`\n${passed}/${passed + failed} passed`);
}

// ─── Test Cases ───────────────────────────────────────────────
const testCases = [
  {
    description: "Standard case — answer is 4",
    grid: [[2,1,1],[1,1,0],[0,1,1]],
    expected: 4,
  },
  {
    description: "Impossible — fresh orange blocked by empty cells",
    grid: [[2,1,1],[0,1,1],[1,0,1]],
    expected: -1,
  },
  {
    description: "No fresh oranges — already done",
    grid: [[0,2]],
    expected: 0,
  },
  {
    description: "No oranges at all — empty grid",
    grid: [[0,0],[0,0]],
    expected: 0,
  },
  {
    description: "Single fresh orange, no rotten — impossible",
    grid: [[1]],
    expected: -1,
  },
  {
    description: "Single rotten orange, no fresh",
    grid: [[2]],
    expected: 0,
  },
  {
    description: "All fresh, one rotten at corner — spreads fully",
    grid: [[2,1,1],[1,1,1],[1,1,1]],
    expected: 4,
  },
  {
    description: "Multi-source — two rotten oranges speed up spreading",
    grid: [[2,1,1],[1,1,1],[1,1,2]],
    expected: 2,
  },
  {
    description: "Linear row — rotten at left end",
    grid: [[2,1,1,1,1]],
    expected: 4,
  },
  {
    description: "Linear row — rotten at both ends",
    grid: [[2,1,1,1,2]],
    expected: 2,
  },
  {
    description: "Fresh orange surrounded by empty — unreachable",
    grid: [[2,0,1]],
    expected: -1,
  },
  {
    description: "All cells rotten — 0 minutes",
    grid: [[2,2],[2,2]],
    expected: 0,
  },
  {
    description: "Large grid — rotten at center spreads outward",
    grid: [
      [1,1,1,1,1],
      [1,1,1,1,1],
      [1,1,2,1,1],
      [1,1,1,1,1],
      [1,1,1,1,1],
    ],
    expected: 4,
  },
];

runTests(testCases);