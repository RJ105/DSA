//Given an array of coins and a target sum, return minimum number of coins that adds up to the target.
//  Coins are infinite and can be reused.


// ----------------------Recursive implementation----------

// function subsetRecursive(coins, target, n){
//      if(target == 0) {
//         return 0
//     }

//     if(n < 0) return Infinity

//     //skip is default irrespective of current weight is more than target or not
//     const skip =  subsetRecursive(coins, target, n-1)
//     if(coins [n]<= target){
//         const pick = 1+ subsetRecursive(coins, target-coins[n], n)
       
//         return Math.min(pick,skip) 
//     }
//     return skip 
// }



//----------------------memoization implementation----------
//we created memo table of +1 length for target becuase its not an array , its a value. hence it will not be stored as target-1. It will be stored as target 
// function subsetMemo(coins, target, n, memo){
//      if(target == 0) {
//         return 0
//     }

//     if(n < 0) return Infinity

//     if (memo[n][target] != -1) 
//         return memo[n][target]
//     const skip =  subsetMemo(coins, target, n-1, memo)
//     if(coins [n]<= target){
//         const pick = 1 + subsetMemo(coins, target-coins[n], n, memo)
//         memo[n][target] = Math.min(pick,skip)
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
        dp[0][j] = Infinity
    }

    for (let i=0; i<n+1; i++){
        dp[i][0] = 0
    }

    //start with 1st index 
    for(let i=1; i<=n; i++){
       for (let j=1; j<=target; j++){
            
        skip = dp[i-1][j]
        if(coins[i-1]<= j){
            pick = 1 + dp[i][j - coins[i-1]] 
            dp[i][j] = Math.min(pick,skip) 
        }
        else {
            dp[i][j] = skip
        }

       }
    }

   return dp[n][target]
}



// console.log(subsetRecursive([2,3,4,5,6], 8, 3))

// [coins, target, expected]
const testCases = [
    // ── Base Cases ────────────────────────────────────────────────────────
    [[],         0,   0],   // target 0 → 0 coins needed
    [[],         5,  -1],   // no coins → impossible
    [[1],        0,   0],   // target 0 → 0 coins needed

    // ── Single Coin ───────────────────────────────────────────────────────
    [[1],        1,   1],   // {1} → 1 coin
    [[1],        4,   4],   // {1,1,1,1} → 4 coins
    [[2],        4,   2],   // {2,2} → 2 coins
    [[2],        3,  -1],   // coin 2 cant make odd 3 → impossible
    [[3],        9,   3],   // {3,3,3} → 3 coins
    [[3],        7,  -1],   // impossible

    // ── All Coins Larger Than Target ──────────────────────────────────────
    [[5,10],     3,  -1],   // all coins too big → impossible
    [[5,10],     4,  -1],   // all coins too big → impossible

    // ── Standard Cases ────────────────────────────────────────────────────
    [[1,2],      3,   2],   // {1,2} → 2 coins
    [[1,2],      4,   2],   // {2,2} → 2 coins
    [[1,2,3],    4,   2],   // {1,3} or {2,2} → 2 coins
    [[1,2,3],    5,   2],   // {2,3} → 2 coins
    [[2,3,5],    8,   2],   // {3,5} → 2 coins
    [[2,3,5],   10,   2],   // {5,5} → 2 coins
    [[1,2,5],   10,   2],   // {5,5} → 2 coins
    [[1,2,5],   11,   3],   // {1,5,5} → 3 coins

    // ── Classic Cases ─────────────────────────────────────────────────────
    [[1,5,6,9], 11,   2],   // {2,9}? no → {5,6} → 2 coins
    [[2,5,10,1],27,   4],   // {10,10,5,2} → 4 coins
]

// ── Test Runner ───────────────────────────────────────────────────────────────
let passed = 0, failed = 0
testCases.forEach(([coins, target, expected], i) => {
    let n = coins.length 
    let result 
    // result = subsetRecursive(coins, target, n-1)

    // memoization approach function call
    // memo = Array.from({length : n+1}, ()=> new Array(target+1).fill(-1))
    // result = subsetMemo(coins, target, n-1, memo)

    //Tabulation approach function call 
    result = subsetTab(coins, target, n-1)
    result = result===Infinity ? -1 : result 
    const tc = `TC-${String(i+1).padStart(2,'0')}`
    if(result !== expected){
        failed++
        console.log(`${tc}: ❌ FAIL | coins=${JSON.stringify(coins)} target=${target} Expected=${expected} Got=${result}`)
    } else {
        passed++
        console.log(`${tc}: ✅ PASS | coins=${JSON.stringify(coins)} target=${target} minCoins=${result}`)
    }
})
console.log(`\nResults: ${passed} passed, ${failed} failed out of ${testCases.length} tests`)