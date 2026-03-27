"use strict";

// Given weights and values of n items and a knapsack capacity,
// find the maximum value. Each item can be used UNLIMITED times.

// ── Knapsack Recusrsive Implementation ──────────────────────────────
function knapsack(weights, values, capacity, n){
    if(capacity === 0)//if target becomes 0 then then we cannot add any more value hence return 0 same for n
        return 0
    if(n < 0)
        return 0

    //default skip part
    const skip = knapsack(weights, values, capacity, n-1)
    if(weights[n]<=capacity){
        let pick = values[n] + knapsack(weights, values, capacity-weights[n], n)
        return Math.max(pick, skip)
    }
    return skip 
}


// ── Knapsack memoization Implementation ──────────────────────────────

// function knapsackMemo(weights, values, capacity, n, memo){
//     if(target === 0)
//         return 0
//     if(n<0)
//         return 0

//     if(memo[n][capacity] != -1)
//         return memo[n][capacity]
//     //default skip
//     skip = knapsack(weights, values, capacity, n-1)
//     if(weights[n]<=capacity){
//         pick = val[n] + knapsack(weights, values, capacity-weights[n], n)
//         memo[n][capacity] = Math.max(pick, skip)
//         return memo[n][capacity]
//     }
//     memo[n][capacity] = skip 
//     return memo[n][capacity]

// }   


// ── Knapsack tabulation Implementation ──────────────────────────────

// function knapsackTab(weights, values, capacity){
//     let n = weights.length
//     let dp = Array.from({length : n+1}, ()=> new Array(capacity +1).fill(0))

//     for (i-1; i<=n; i++){
//         for (j=1; j<=capacity; j++){
//             //default skip 
//             skip = dp[i-1][j]
//             if(weights[i-1] <= j){
//                 pick = values[i-1] + dp[i][capacity-weights[i-1]]
//                 dp[i][j] = Math.max(pick, skip )
//             }
//             else{
//                 dp[i][n] = skip 
//             }

//         }
//     }
// }



// [capacity, [weights], [values], expected]
const testCases = [
    // ── Base Cases ────────────────────────────────────────────────────────
    [0,  [1,3,4,5],  [1,4,5,7],   0],   // zero capacity → 0
    [7,  [],         [],           0],   // no items → 0

    // ── Single Item ───────────────────────────────────────────────────────
    [3,  [2],        [3],          3],   // item used once  {2,v3}
    [4,  [2],        [3],          6],   // item used twice {2,2,v6}
    [6,  [2],        [3],          9],   // item used 3x    {2,2,2,v9}
    [5,  [3,4],      [4,5],        5],   // one item fits   {4,v5}

    // ── Standard Cases ────────────────────────────────────────────────────
    [7,  [1,3,4,5],  [1,4,5,7],   9],   // {3,4,v9} or {3,3,1,v9}
    [10, [1,3,4,5],  [1,4,5,7],  14],   // {5,5,v14}
    [4,  [1,2,3],    [10,15,40], 50],   // {1,3,v50} or {2,2,v50}  -- wait {3,1}=40+10=50 ✅
    [6,  [1,2,3],    [10,15,40], 80],   // {3,3,v80}
    [10, [2,5],      [1,3],       6],   // {5,5,v6}

    // ── Reuse is better than 0/1 ──────────────────────────────────────────
    [8,  [1,3],      [15,20],   120],   // reuse item1 8x → 8×15=120
                                         // 0/1 would give: item2+item1 = 20+15=35

    // ── All Items Heavier Than Capacity ───────────────────────────────────
    [2,  [3,4,5],    [4,5,6],    0],   // nothing fits
    [1,  [2,3],      [5,8],      0],   // nothing fits
]

// ── Test Runner ───────────────────────────────────────────────────────────────
let passed = 0, failed = 0
testCases.forEach(([capacity, weights, values, expected], i) => {
    let n = weights.length
    const result = knapsack(weights, values, capacity, n-1)
    const tc = `TC-${String(i+1).padStart(2,'0')}`
    if(result !== expected){
        failed++
        console.log(`${tc}: ❌ FAIL | cap=${capacity} w=${JSON.stringify(weights)} v=${JSON.stringify(values)} Expected=${expected} Got=${result}`)
    } else {
        passed++
        console.log(`${tc}: ✅ PASS | cap=${capacity} w=${JSON.stringify(weights)} v=${JSON.stringify(values)} value=${result}`)
    }
})
console.log(`\nResults: ${passed} passed, ${failed} failed out of ${testCases.length} tests`)