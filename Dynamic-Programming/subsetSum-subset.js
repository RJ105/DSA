// ----------------------Recursive implementation----------
// function subset(weights, target, n, arr = []){
//      if(target == 0) {
//         return arr
//     }

//     if(n < 0) return null

//     if(weights [n]<= target){
//         const pick = subset(weights, target-weights[n], n-1, [weights[n], ...arr])
//         const skip =  subset(weights, target, n-1, arr)
//         return pick || skip 
//     }
//     else {
//         return subset(weights, target, n-1, arr)
//     }
// }

// console.log(subset([3,5,2], 0, 2, []))
//----------------------memoization implementation----------
//we created memo table of +1 length for target becuase its not an array , its a value. hence it will not be stored as target-1. It will be stored as target 
// function subset(weights, target, n, arr, memo){
//      if(target == 0) {
//         return arr
//     }

//     if(n < 0) return null

//     if (memo[n][target] != -1) 
//         return memo[n][target]
//     if(weights [n]<= target){
//         const pick = subset(weights, target-weights[n], n-1, [weights[n], ...arr], memo)
//         const skip =  subset(weights, target, n-1,arr, memo)
//         memo[n][target] = pick || skip
//         return memo[n][target]
//     }
//     else {
//         memo[n][target] = subset(weights, target, n-1, arr, memo)
//         return memo[n][target]
//     }
// }

//  memo = Array.from({length : 4}, ()=> new Array(8).fill(-1))
// subset([3,5,2], 7, 2, [], memo)

//----------------------tabulation implementation----------

function subset(weights, target, n){
    n = weights.length
    dp = Array.from({length: n+1}, ()=> new Array(target+1))

    // intialize
    for(let j=0; j< target+1; j++){
        dp[0][j] = null
    }

    for (let i=0; i<n+1; i++){
        dp[i][0] = [] 
    }

    //start with 1st index 
    for(let i=1; i<=n; i++){
       for (let j=1; j<=target; j++){
            
        if(weights[i-1]<= j){
            pick = dp[i-1][j - weights[i-1]] 
            if(pick != null)
                dp[i][j] = [weights[i-1], ...pick]
            else
                 dp[i][j] = dp[i-1][j]

        }
        else {
            dp[i][j] = dp[i-1][j]
        }

       }
    }

   return dp[n][target]
}




// console.log(subset([3,5,2], 7, 3))  

// [arr, target, expected]
// expected → null if no subset found, array of items if found

const testCases = [
    // ── Base Cases ────────────────────────────────────────────────────────
    [[],          0,   []],          // empty array, target 0 → empty subset
    [[],          5,   null],        // empty array, target > 0 → impossible
    [[3,5,2],     0,   []],          // target 0 → always empty subset

    // ── Single Item ───────────────────────────────────────────────────────
    [[5],         5,   [5]],         // single item equals target
    [[5],         3,   null],        // single item greater than target
    [[5],        10,   null],        // single item less than target, cant reach

    // ── Standard Cases ────────────────────────────────────────────────────
    [[3,5,2],     2,   [2]],         // single item found
    [[3,5,2],     3,   [3]],         // single item found
    [[3,5,2],     5,   [5]],         // single item found {5}
    [[3,5,2],     7,   [2,5]],       // two items {2,5}
    [[3,5,2],     8,   [5,3]],       // two items {5,3}
    [[3,5,2],    10,   [2,5,3]],     // all items {2,5,3}

    // ── Impossible Cases ──────────────────────────────────────────────────
    [[3,5,2],     1,   null],        // no subset sums to 1
    [[3,5,2],     4,   null],        // no subset sums to 4
    [[3,5,2],     6,   null],        // no subset sums to 6
    [[3,5,2],     9,   null],        // no subset sums to 9
    [[3,5,2],    11,   null],        // exceeds total sum 10

    // ── All Even Items, Odd Target ────────────────────────────────────────
    [[2,4,6],     5,   null],        // all even numbers cant sum to odd target

    // ── Multiple Subsets Possible ─────────────────────────────────────────
    [[1,5,11,5], 11,   [11]],        // {11} found first before {1,5,5}
    [[1,2,3],     6,   [3,2,1]],     // all items {1,2,3}

    // ── No Subset ─────────────────────────────────────────────────────────
    [[1,2,3],     7,   null],        // exceeds total sum 6
]

// ── Test Runner ───────────────────────────────────────────────────────────────
function isValidSubset(result, expected, target) {
    // both null
    if(result === null && expected === null) return true

    // one is null, other is not
    if(result === null || expected === null) return false

    // both are arrays — check sum equals target, not exact order
    const sum = result.reduce((a, b) => a + b, 0)
    return sum === target
}

function runTests(testCases) {
    let passed = 0, failed = 0

    testCases.forEach(([arr, target, expected], i) => {
        let n = arr.length

        //recursive approach 
        // const result = subset(arr, target, arr.length-1)

        // memoization approach function call
        // memo = Array.from({length : n+1}, ()=> new Array(target+1).fill(-1))
        // const result = subset(arr, target, arr.length-1, [], memo)

        //Tabulation Approach
        const result = subset(arr, target, arr.length-1)


        const tc = `TC-${String(i+1).padStart(2,'0')}`

        const match = isValidSubset(result, expected, target)

        if(!match){
            failed++
            console.log(`${tc}: ❌ FAIL | arr=${JSON.stringify(arr)} target=${target}`)
            console.log(`        Expected: ${JSON.stringify(expected)}, Got: ${JSON.stringify(result)}`)
        } else {
            passed++
            console.log(`${tc}: ✅ PASS | arr=${JSON.stringify(arr)} target=${target} → ${JSON.stringify(result)}`)
        }
    })

    console.log(`\nResults: ${passed} passed, ${failed} failed out of ${testCases.length} tests`)
}

runTests(testCases)