// buy and sell stocks - II
// Max 2 txn allowed
// only condition is if you have bought then you have to sell it first 
// then you can buy another


//-----------------------------Recursive implementation--------------
function buyAndSellRecursive(prices, i, buyFlag, count){
    if(i=== prices.length || count === 2)
        return 0
    
    if(buyFlag === 1){
        //buy options 
        let bought = - prices[i] + buyAndSellRecursive(prices, i+1, 0, count)
        let notBought = buyAndSellRecursive(prices, i+1, 1, count)
        return Math.max(bought, notBought)
    }else{
        //sell options
        let sold = prices[i] + buyAndSellRecursive(prices, i+1, 1, count +1)
        let notSold = buyAndSellRecursive(prices, i+1, 0, count)
        return Math.max(sold, notSold)
    }
}

//-----------------------------Memoization implementation--------------
function buyAndSellMemo(prices, i, buyFlag, memo, count){
    if(i=== prices.length || count === 2)
        return 0
    
    if(memo[i][buyFlag][count] != -1)
        return memo[i][buyFlag][count]

    if(buyFlag === 1){
        //buy options 
        let bought = - prices[i] + buyAndSellMemo(prices, i+1, 0, memo, count)
        let notBought = buyAndSellMemo(prices, i+1, 1, memo, count)
        memo[i][buyFlag][count] =  Math.max(bought, notBought)
        return memo[i][buyFlag][count]
    }else{
        //sell options
        let sold = prices[i] + buyAndSellMemo(prices, i+1, 1, memo, count+1)
        let notSold = buyAndSellMemo(prices, i+1, 0, memo, count)
        memo[i][buyFlag][count] = Math.max(sold, notSold)
        return memo[i][buyFlag][count]
    }
}

// //-----------------------------Tabulation implementation--------------
function buyAndSellTabulation(prices){
    let n = prices.length
    let dp = Array.from({length : n+1}, ()=> Array.from({length:2}, ()=> Array(3).fill(0)))

    for(let i = n-1; i>=0; i--){
        let profit = 0
        for(let buy=0; buy<=1; buy++){
            while(count <=2)
            if(buy){
                profit = Math.max(-prices[i] + dp[i+1][0], dp[i+1][1])
            }
            else{
                profit = Math.max(prices[i] + dp[i+1][1][count+1], dp[i+1][0])
            }
             dp[i][buy] = profit
        }
       
    }
    return dp[0][1] //cannot return  dp[0][0] because 0 means sell i.e it indicates you are already  holding stocks
}


//-----------------------------Tabulation implementation - space optimised--------------
// function buyAndSellTabulation(prices){
//     let n = prices.length
//     let prev = Array(2).fill(0)
//     let curr = Array(2).fill(0)

//     // let dp = Array.from({length : n+1}, ()=> Array(2).fill(0))

//     for(let i = n-1; i>=0; i--){
//         let profit = 0
//         for(let buy=0; buy<=1; buy++){
//             if(buy){
//                 profit = Math.max(-prices[i] + prev[0], prev[1])
//             }
//             else{
//                 profit = Math.max(prices[i] + prev[1], prev[0])
//             }
//              curr[buy] = profit
//         }
//        prev = curr
//     }
//     return prev[1] //cannot return  dp[0][0] because 0 means sell i.e it indicates you are already  holding stocks
// }


const testCases = [
  { prices: [3, 3, 5, 0, 0, 3, 1, 4],  expected: 6 },
  { prices: [1, 2, 3, 4, 5],           expected: 4 }, // 1 txn enough: buy day1 sell day5
  { prices: [7, 6, 4, 3, 1],           expected: 0 }, // prices only decrease
  { prices: [1],                        expected: 0 }, // single day
  { prices: [1, 2],                     expected: 1 }, // 1 txn: buy day1 sell day2
  { prices: [2, 1, 4, 5, 2, 9],        expected: 11},  // buy@1 sell@5, buy@2 sell@9
  { prices: [3, 3, 3, 3],              expected: 0 }, // all same
];

console.log("=".repeat(65));
testCases.forEach(({ prices, expected }, idx) => {
    let n = prices.length
//   const result  = buyAndSellRecursive(prices, 0, 1, 0);
  const memo = Array.from({ length: n }, () => Array.from({ length: 2 }, () => new Array(3).fill(-1)));
  console.log('memo = ',memo)
  const  result = buyAndSellMemo(prices,0, 1, memo, 0 )
    console.log('memo = ',memo)

//   const result = buyAndSellTabulation(prices);

  const pass = result === expected

  console.log(`Test ${String(idx + 1).padStart(2, "0")}: prices=[${prices}]`);
//   console.log(`  Recursive: ${recursive} | Memo: ${memo} | Tabulation: ${tabulation}`);
  console.log(`${pass ? "✅ PASS" : "❌ FAIL"}  Expected: ${expected} → Result: ${result} `);
  console.log("-".repeat(65));
});