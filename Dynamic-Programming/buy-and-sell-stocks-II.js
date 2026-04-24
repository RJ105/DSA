// buy and sell stocks - II
// Multiple txn allowed - buy many and sell may
// only condition is if you have bought then you have to sell it first 
// then you can buy another


//-----------------------------Recursive implementation--------------
function buyAndSellRecursive(prices, i, buyFlag){
    if(i=== prices.length)
        return 0
    
    if(buyFlag === 1){
        //buy options 
        let bought = - prices[i] + buyAndSellRecursive(prices, i+1, 0)
        let notBought = buyAndSellRecursive(prices, i+1, 1)
        return Math.max(bought, notBought)
    }else{
        //sell options
        let sold = prices[i] + buyAndSellRecursive(prices, i+1, 1)
        let notSold = buyAndSellRecursive(prices, i+1, 0)
        return Math.max(sold, notSold)
    }
}

//-----------------------------Memoization implementation--------------
function buyAndSellMemo(prices, i, buyFlag, memo){
    if(i=== prices.length)
        return 0
    
    if(memo[i][buyFlag] != -1)
        return memo[i][buyFlag]

    if(buyFlag === 1){
        //buy options 
        let bought = - prices[i] + buyAndSellMemo(prices, i+1, 0, memo)
        let notBought = buyAndSellMemo(prices, i+1, 1, memo)
        memo[i][buyFlag] =  Math.max(bought, notBought)
        return memo[i][buyFlag]
    }else{
        //sell options
        let sold = prices[i] + buyAndSellMemo(prices, i+1, 1, memo)
        let notSold = buyAndSellMemo(prices, i+1, 0, memo)
        memo[i][buyFlag] = Math.max(sold, notSold)
        return memo[i][buyFlag]
    }
}

//-----------------------------Tabulation implementation--------------


const testCases = [
  { prices: [7, 1, 5, 3, 6, 4],   expected: 7  },
  { prices: [1, 2, 3, 4, 5],      expected: 4  }, // buy day1, sell day5
  { prices: [7, 6, 4, 3, 1],      expected: 0  }, // prices only decrease
  { prices: [1],                   expected: 0  }, // single day
  { prices: [2, 4, 1],            expected: 2  }, // buy day1, sell day2
  { prices: [3, 3, 3, 3],         expected: 0  }, // all same prices
  { prices: [1, 2, 4, 2, 5, 7, 2, 4, 9, 0], expected: 15 },
];

console.log("=".repeat(65));
testCases.forEach(({ prices, expected }, idx) => {
    let n = prices.length
  // const result  = buyAndSellRecursive(prices, 0, 1);
  let memo = Array.from({length : n}, ()=> new Array(2).fill(-1))
  const  result = buyAndSellMemo(prices,0, 1, memo )
//   const result = buyAndSellTabulation(prices);

  const pass = result === expected

  console.log(`Test ${String(idx + 1).padStart(2, "0")}: prices=[${prices}]`);
//   console.log(`  Recursive: ${recursive} | Memo: ${memo} | Tabulation: ${tabulation}`);
  console.log(`  Expected: ${expected} → ${pass ? "✅ PASS" : "❌ FAIL"}`);
  console.log("-".repeat(65));
});