// ── Knapsack Recusrsive Implementation ──────────────────────────────
// function knapsack(capacity, weights, values, n = weights.length) {
//     if(n==0 || capacity==0)
//         return 0
//     if(weights[n-1] <= capacity){
//         //pick or skip
//         return Math.max(values[n-1] + knapsack(capacity-weights[n-1], weights, values,  n-1), knapsack(capacity, weights, values, n-1))
//     }
//     else{
//         return knapsack(capacity, weights, values,  n-1)
//     }
// }
//Time complexity









// ── Knapsack memoization Implementation ──────────────────────────────
// function knapsack(capacity, weights, values, n = weights.length, memo) {
//     if(n==0 || capacity==0)
//         return 0
//     if(memo[n-1][capacity]!=-1) 
//         return memo[n-1][capacity]
//     if(weights[n-1] <= capacity){
//         //pick or skip
//         memo[n-1][capacity] = Math.max(values[n-1] + knapsack(capacity-weights[n-1], weights, values,  n-1, memo), knapsack(capacity, weights, values, n-1, memo))
//         return memo[n-1][capacity]
//     }
//     else{
//        memo[n-1][capacity] = knapsack(capacity, weights, values,  n-1, memo)
//         return memo[n-1][capacity]
//     }
// }


// ── Knapsack tabulation Implementation ──────────────────────────────

function knapsack(capacity, weights, values){
    const n = weights.length
    let dp = Array.from({length : n + 1}, ()=> new Array(capacity + 1).fill(0))

    for(let i=1; i<=n; i++){
        for(j=1; j<=capacity; j++){
            if(weights[i-1]<= j){ 
                const pick = values[i-1] + dp[i-1][j-weights[i-1]]
                const notPick = dp[i-1][j]
                dp[i][j] = Math.max(pick, notPick)
            }
            else{
                dp[i][j] = dp[i-1][j]
            }
            
        }
    }
    return dp[n][capacity]

}










// ── To run individual cases ───────────────────────────────────────────
// const memo = Array.from({length : 4}, ()=>new Array(7).fill(-1)) 

// const result = knapsack(6,  [3,5,2], [10,20,5], 3, memo);
// console.log('result = ', result)


// ── Test Cases ───────────────────────────────────────────
// [capacity, [weights], [values], expected]
const testCases = [
    // ── Base Cases ──────────────────────────────────────────────────────
    [10, [],          [],             0],   // no items available
    [0,  [5],         [10],           0],   // zero capacity, nothing fits
    [3,  [5],         [10],           0],   // single item too heavy
    [5,  [5],         [10],          10],   // single item fits exactly
    [10, [5],         [10],          10],   // single item fits with spare capacity

    // ── Standard Cases ──────────────────────────────────────────────────
    [5,  [2,3,4,5],   [3,4,5,6],      7],   // two small items beat one large item
    [7,  [1,2,3,5],   [1,6,10,16],   22],   // skip highest ratio, pick best combo
    [5,  [2,2,3],     [6,10,12],     22],   // same weight items, pick higher value
    [6,  [1,3,4,5],   [2,4,6,9],     11],   // light + heavy beats two mediums
    [6,  [3,4,2],     [4,5,3],        8],   // best pair fills capacity optimally

    // ── Edge Cases ──────────────────────────────────────────────────────
    [9,  [10],        [100],           0],   // item one unit over capacity, skip
    [2,  [1,1,1],     [1,1,1],         2],   // duplicates, only fits as many as capacity allows
    [10, [5,3,2],     [0,0,0],         0],   // all zero values, result always 0
    [3,  [1,2,3],     [100,1,1],     101],   // one dominant value item among weak ones
    [10, [1,2,3,4,5], [1,2,3,4,5],   10],   // value equals weight, pick till capacity

    // ── Greedy Trap Cases ────────────────────────────────────────────────
    [50, [10,20,30],  [60,100,120],  220],   // best ratio item is suboptimal choice
    [10, [5,4,6,3],   [10,40,30,50], 90],   // greedy by ratio gives wrong answer
    [6,  [3,5,2],     [10,20,5],     20],   // single item beats any valid pair

    // ── All Items Fit ────────────────────────────────────────────────────
    [15, [1,3,4,5],   [2,4,6,9],     21],   // capacity exceeds total weight, take all
    [10, [2,3,4],     [3,4,5],       12],   // capacity equals sum of all weights

    // ── Nothing Fits ─────────────────────────────────────────────────────
    [1,  [2,3,4],     [5,8,9],        0],   // all items heavier than capacity
    [4,  [5,6,7],     [10,20,30],     0],   // every item exceeds capacity

    // ── Large Capacity ────────────────────────────────────────────────────
    [1000, [1,2,3],   [10,20,30],    60],   // huge capacity, all items fit
    [100,  [50,50,1], [50,50,200],  250],   // light high-value beats two equal items

    // ── Boundary Cases ────────────────────────────────────────────────────
    [1,   [1],        [1],            1],   // minimum valid input
    [1,   [1],        [999999],  999999],   // maximum item value, no overflow
    [100, [100],      [1],            1],   // item weight equals full capacity
];

// ── Test Runner ───────────────────────────────────────────────────────────────
let passed = 0, failed = 0;

testCases.forEach(([capacity, weights, values, expected], i) => {
    //recursion test
    // const result = knapsack(capacity, weights, values, weights.length);

    //memoization test
    const memo = Array.from({length :  weights.length+1}, ()=>new Array(capacity+1).fill(-1)) 
    const result = knapsack(capacity, weights, values, weights.length, memo);
    const tc = `TC-${String(i + 1).padStart(2, "0")}`;

    if (result !== expected) {
        failed++;
        console.log(`${tc}: ❌ FAIL | Expected: ${expected}, Got: ${result}`);
    } else {
        passed++;
        console.log(`${tc}: ✅ PASS | Expected: ${expected}`);
    }
});

console.log(`\nResults: ${passed} passed, ${failed} failed out of ${testCases.length} tests`);