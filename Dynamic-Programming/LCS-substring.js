//-----------------------------Recursive implementation--------------
function lcsRecursive(s1, s2, m, n, count){
    if(m < 0 || n < 0)
        return count
    if(s1[m] === s2[n]){
        return lcsRecursive(s1, s2, m-1, n-1, count+1)
    }
    return Math.max(count, lcsRecursive(s1, s2, m-1, n, 0), lcsRecursive(s1, s2, m, n-1, 0))

}


//-----------------------------Memoization implementation--------------
// function lcsMemo(s1, s2, m, n, memo){
//     if(m < 0 || n < 0)
//         return 0
//     if(memo[m][n] != -1)
//         return memo[m][n]
//     if(s1[m] === s2[n]){
//         memo[m][n] = 1 + lcsMemo(s1, s2, m-1, n-1, memo)
//         return memo[m][n]
//     }
//     memo[m][n] = Math.max(count, lcsMemo(s1, s2, m-1, n, 0, memo), lcsMemo(s1, s2, m, n-1, 0, memo))
//     return memo[m][n]

// }

//-----------------------------Tabulation implementation--------------

function lcsTabulation(s1, s2, m, n){
    const dp = Array.from({length: m+1}, ()=> new Array(n+1).fill(0))
    let maxLen = 0
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s1[i - 1] === s2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                if(dp[i][j] > maxLen){
                    maxLen = dp[i][j] 
                }
            } else {
                dp[i][j] = 0
            }
        }
   }
   return maxLen
}


//-----------------------------Tabulation implementation to get substring--------------

// function lcsTabulation(s1, s2, m, n){
//     const dp = Array.from({length: m+1}, ()=> new Array(n+1).fill(0))
//     let maxLen = 0
//     let endIndex = 0
//     for (let i = 1; i <= m; i++) {
//         for (let j = 1; j <= n; j++) {
//             if (s1[i - 1] === s2[j - 1]) {
//                 dp[i][j] = dp[i - 1][j - 1] + 1;
//                 if(dp[i][j] > maxLen){
//                     maxLen = dp[i][j] 
//                     endIndex = i
//                 }
//             } else {
//                 dp[i][j] = 0
//             }
//         }
//    }
//    return s1.substring(endIndex - maxLen, endIndex)
// }

const testCases =[
  { s1: "ABCDEF",      s2: "ZCDEMF",     expected: 3    },
  { s1: "AGGTAB",      s2: "GXTXAYB",    expected: 1      }, // no long contiguous match
  { s1: "abcdef",      s2: "bcdefg",     expected: 5  },
  { s1: "hello",       s2: "hallo",      expected: 3     },
  { s1: "1234567",     s2: "34567890",   expected: 5  },
  { s1: "abcdef",      s2: "abcdef",     expected: 6 }, // identical
  { s1: "ABC",         s2: "DEF",        expected: 0       }, // no match
  { s1: "",            s2: "ABC",        expected: 0       }, // empty
  { s1: "A",           s2: "A",          expected: 1      }, // single char
  { s1: "AAAA",        s2: "AA",         expected: 2     }, // repeated chars
];

console.log("=".repeat(60));
testCases.forEach(({ s1, s2, expected }, i) => {
    let m = s1.length
    let n = s2.length
    // const result   = lcsRecursive(s1, s2, m-1, n-1, 0);

    // memo = Array.from({length : m+1}, ()=> new Array(n+1).fill(-1))
    // const result   = lcsMemo(s1, s2, m-1, n-1, memo);

    const result  = lcsTabulation(s1, s2, m, n);

  const pass = result === expected

  console.log(`Test ${i + 1}: s1="${s1}" | s2="${s2}"`);
  console.log(`${pass ? "✅ PASS" : "❌ FAIL"} → Expected: ${expected} Got ${result} `);
  console.log("-".repeat(60));
});