//Given an array of coins and a target sum, return  count of all possible subset that adds up to the target.
//  Coins are infinite and can be reused.


// ----------------------Recursive implementation----------

// function subsetRecursive(coins, target, n){
//      if(target == 0) {
//         return 1
//     }

//     if(n < 0) return 0

//     //skip is default irrespective of current weight is more than target or not
//     const skip =  subsetRecursive(coins, target, n-1)
//     if(coins [n]<= target){
//         const pick = 1+ subsetRecursive(coins, target-coins[n], n)
       
//         return pick + skip 
//     }
//     return skip 
// }



//----------------------memoization implementation----------
//we created memo table of +1 length for target becuase its not an array , its a value. hence it will not be stored as target-1. It will be stored as target 
// function subsetMemo(coins, target, n, memo){
//      if(target == 0) {
//         return 1
//     }

//     if(n < 0) return 0

//     if (memo[n][target] != -1) 
//         return memo[n][target]
//     const skip =  subsetMemo(coins, target, n-1, memo)
//     if(coins [n]<= target){
//         const pick = subsetMemo(coins, target-coins[n], n, memo)
//         memo[n][target] = pick + skip
//         return memo[n][target]
//     }
//     else {
//         memo[n][target] = skip 
//         return memo[n][target]
//     }
// }


//----------------------tabulation implementation----------

function subsetTab(coins, target, n){
    n = coins.length
    dp = Array.from({length: n+1}, ()=> new Array(target+1))

    // intialize
    for(let j=0; j< target+1; j++){
        dp[0][j] = 0
    }

    for (let i=0; i<n+1; i++){
        dp[i][0] = 1
    }

    //start with 1st index 
    for(let i=1; i<=n; i++){
       for (let j=1; j<=target; j++){
            
        if(coins[i-1]<= j){
            pick = dp[i][j - coins[i-1]] 
            skip = dp[i-1][j]

            dp[i][j] = pick + skip 
        }
        else {
            dp[i][j] = dp[i-1][j]
        }

       }
    }

   return dp[n][target]
}



// console.log(subsetRecursive([2,3,4,5,6], 8, 3))

// [coins, target, expected]
const testCases = [
    // ── Base Cases ────────────────────────────────────────────────────────
    [[],         0,   1],   // empty coins, target 0 → 1 way (empty selection)
    [[],         5,   0],   // empty coins, target > 0 → impossible
    [[1],        0,   1],   // any coins, target 0 → 1 way (pick nothing)
    [[2],        0,   1],   // any coins, target 0 → 1 way (pick nothing)

    // ── Single Coin Fits Exactly ──────────────────────────────────────────
    [[1],        1,   1],   // only {1}
    [[1],        4,   1],   // only {1,1,1,1}
    [[2],        2,   1],   // only {2}
    [[2],        4,   1],   // only {2,2}
    [[3],        9,   1],   // only {3,3,3}

    // ── Single Coin Cannot Make Target ────────────────────────────────────
    [[2],        3,   0],   // coin 2 cant make odd 3
    [[3],        7,   0],   // coin 3 cant make 7
    [[5,10],     3,   0],   // all coins too big
    [[5,10],     4,   0],   // all coins too big

    // ── Standard Cases ────────────────────────────────────────────────────
    [[1,2],      3,   2],   // {1,1,1} and {1,2}
    [[1,2],      4,   3],   // {1,1,1,1} and {1,1,2} and {2,2}
    [[1,2,3],    4,   4],   // {1,1,1,1} and {1,1,2} and {1,3} and {2,2}
    [[1,2,3],    5,   5],   // {1,1,1,1,1} and {1,1,1,2} and {1,1,3} and {1,2,2} and {2,3}
    [[2,3,5],    8,   3],   // {2,2,2,2} and {2,3,3} and {3,5}
    [[2,3,5],   10,   4],   // {2,2,2,2,2} and {2,2,3,3} and {2,3,5} and {5,5}

    // ── Large Target ──────────────────────────────────────────────────────
    [[1,2,5],   10,  10],   // 10 ways
    [[1,2,5],   11,  11],   // 11 ways

    // ── Classic Cases ─────────────────────────────────────────────────────
    [[1,5,6,9], 11,   6],   // {1x11},{1x6,5},{1x5,6},{1,1,9},{1,5,5},{5,6}
    [[2,5,10,1],10,  11],   // 11 ways using coins 2,5,10,1
]

// ── Test Runner ───────────────────────────────────────────────────────────────
let passed = 0, failed = 0
testCases.forEach(([coins, target, expected], i) => {
    let n = coins.length 
    // const result = coinChange(coins, target, n-1)

    // memoization approach function call
    // memo = Array.from({length : n+1}, ()=> new Array(target+1).fill(-1))
    // result = subsetMemo(coins, target, n-1, memo)

    //Tabulation approach function call 
    result = subsetTab(coins, target, n-1)
    
    const tc = `TC-${String(i+1).padStart(2,'0')}`
    if(result !== expected){
        failed++
        console.log(`${tc}: ❌ FAIL | coins=${JSON.stringify(coins)} target=${target} Expected=${expected} Got=${result}`)
    } else {
        passed++
        console.log(`${tc}: ✅ PASS | coins=${JSON.stringify(coins)} target=${target} ways=${result}`)
    }
})
console.log(`\nResults: ${passed} passed, ${failed} failed out of ${testCases.length} tests`)