//Given an array of numbers and a target sum, return counts of subset that adds up to the target.

// ----------------------Recursive implementation----------

function subsetRecursive(weights, target, n){
     if(target == 0) {
        return 1
    }

    if(n < 0) return 0

    //skip is default irrespective of current weight is more than target or not
    const skip =  subsetRecursive(weights, target, n-1)
    if(weights [n]<= target){
        const pick = subsetRecursive(weights, target-weights[n], n-1)
       
        return pick + skip 
    }
    return skip 
}



//----------------------memoization implementation----------
//we created memo table of +1 length for target becuase its not an array , its a value. hence it will not be stored as target-1. It will be stored as target 
function subsetMemo(weights, target, n, memo){
     if(target == 0) {
        return 1
    }

    if(n < 0) return 0

    if (memo[n][target] != -1) 
        return memo[n][target]
    if(weights [n]<= target){
        const pick = subsetMemo(weights, target-weights[n], n-1, memo)
        const skip =  subsetMemo(weights, target, n-1, memo)
        memo[n][target] = pick + skip
        return memo[n][target]
    }
    else {
        memo[n][target] = subsetMemo(weights, target, n-1, memo)
        return memo[n][target]
    }
}


//----------------------tabulation implementation----------

// function subsetTab(weights, target, n){
//     n = weights.length
//     dp = Array.from({length: n+1}, ()=> new Array(target+1))

//     // intialize
//     for(let j=0; j< target+1; j++){
//         dp[0][j] = 0
//     }

//     for (let i=0; i<n+1; i++){
//         dp[i][0] = 1
//     }

//     //start with 1st index 
//     for(let i=1; i<=n; i++){
//        for (let j=1; j<=target; j++){
            
//         if(weights[i-1]<= j){
//             pick = dp[i-1][j - weights[i-1]] 
//             skip = dp[i-1][j]

//             dp[i][j] = pick + skip 
//         }
//         else {
//             dp[i][j] = dp[i-1][j]
//         }

//        }
//     }

//    return dp[n][target]
// }



// console.log(subsetRecursive([2,3,4,5,6], 8, 3))

// [arr, target, expectedCount]

const testCases = [
    // ── Base Cases ────────────────────────────────────────────────────────
    [[],            0,   1],   // empty subset {} always sums to 0
    [[],            5,   0],   // no items, target unreachable

    // ── Single Item ───────────────────────────────────────────────────────
    [[5],           5,   1],   // only {5} = 5
    [[5],           3,   0],   // item too heavy, no subset

    // ── Zero Target ───────────────────────────────────────────────────────
    [[3,5,2],       0,   1],   // only empty subset {} sums to 0

    // ── Single Subset Possible ────────────────────────────────────────────
    [[3,5,2],       2,   1],   // only {2}
    [[3,5,2],       3,   1],   // only {3}
    [[3,5,2],       7,   1],   // only {5,2}
    [[3,5,2],       8,   1],   // only {3,5}
    [[3,5,2],      10,   1],   // only {3,5,2}

    // ── No Subset Possible ────────────────────────────────────────────────
    [[3,5,2],       1,   0],   // no subset sums to 1
    [[3,5,2],      11,   0],   // exceeds total sum 10

    // ── Multiple Subsets Possible ─────────────────────────────────────────
    [[3,5,2],       5,   2],   // {5} and {3,2}
    [[1,5,5,11],   11,   2],   // {11} and {1,5,5}
    [[1,2,3,4,5],   5,   3],   // {5} and {4,1} and {3,2}
    [[1,2,3,4,5],   6,   3],   // {5,1} and {4,2} and {3,2,1}
    [[1,2,3,4,5],  10,   3],   // {5,4,1} and {5,3,2} and {4,3,2,1}
    [[3,1,2,4,3],   6,   4],   // {3,3} and {4,2} and {3,2,1} and {2,1,3}

    // ── Duplicate Items ───────────────────────────────────────────────────
    [[1,1,1,1,1],   3,  10],   // 10 ways to pick 3 items from 5 identical items
    [[2,2,2,2],     4,   6],   // 6 ways to pick 2 items from 4 identical items
]

// ── Test Runner ───────────────────────────────────────────────────────────────


let passed = 0, failed = 0
testCases.forEach(([arr, target, expected], i) => {
    let n = arr.length
    const result = subsetRecursive(arr, target, arr.length-1)

    // memoization approach function call
    // memo = Array.from({length : n+1}, ()=> new Array(target+1).fill(-1))
    // const result = subsetMemo(arr, target, n-1, memo)

    //Tabulation approach function call 
    // const result = subsetTab(arr, target, n-1)


    const tc = `TC-${String(i+1).padStart(2,'0')}`
    if(result !== expected){
        failed++
        console.log(`${tc}: ❌ FAIL | arr=${JSON.stringify(arr)} target=${target} Expected=${expected} Got=${result}`)
    } else {
        passed++
        console.log(`${tc}: ✅ PASS | arr=${JSON.stringify(arr)} target=${target} count=${result}`)
    }
})
console.log(`\nResults: ${passed} passed, ${failed} failed out of ${testCases.length} tests`)