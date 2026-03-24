
// ----------------------Recursive implementation----------
// function subset(weights, target, n){
//      if(target == 0) {
//         return true
//     }

//     if(n < 0) return false

//     if(weights [n]<= target){
//         const pick = subset(weights, target-weights[n], n-1)
//         const skip =  subset(weights, target, n-1)
//         return pick || skip 
//     }
//     else {
//         return subset(weights, target, n-1)
//     }
// }


//----------------------memoization implementation----------
// we created memo table of +1 length for target becuase its not an array , its a value. 
// hence it will not be stored as target-1. It will be stored as target 
// function subset(weights, target, n, memo){
//      if(target == 0) {
//         return true
//     }

//     if(n < 0) return false

//     if (memo[n][target] != -1) 
//         return memo[n][target]
//     if(weights [n]<= target){
//         const pick = subset(weights, target-weights[n], n-1, memo)
//         const skip =  subset(weights, target, n-1, memo)
//         memo[n][target] = pick || skip
//         return memo[n][target]
//     }
//     else {
//         memo[n][target] = subset(weights, target, n-1, memo)
//         return memo[n][target]
//     }
// }


//Tabulation approach 


function subset(weights, total){
    let n = weights.length
    dp = Array.from({length:n+1}, ()=> new Array(total+1).fill(false))

    for(let j=0; j<=total; j++)
        dp[0][j] = false
    for(let i=0; i<=n; i++)
        dp[i][0] = true

    for (i=1; i<=n; i++){
        for(j=1; j<=total; j++){
            let pick 
            if(weights[i-1] <= j){
               pick = dp[i-1][j-weights[i-1]]
            }
            skip = dp[i-1][j]
            dp[i][j] = pick || skip 
        }
    }
    return dp
}



function main(weights){
    let n = weights.length
    const total = weights.reduce((a, b) => a + b, 0)
    let min = Infinity
    // for(let target=0; target<=total; target++){
    //     isSubsetPossible = subset(weights, target)
    //     if(isSubsetPossible)
    //         min = Math.min(min, Math.abs(2*target - total))
    // }


    //tabulation
    dp = subset(weights, total)
    for(s=0; s<=total; s++)
        if(dp[n][s])
             min = Math.min(min, Math.abs(2*s - total))

    return min 
}
console.log(main([1, 6, 11, 5]))