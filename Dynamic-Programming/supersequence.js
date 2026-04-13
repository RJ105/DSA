//Given two strings s1 and s2, find the shortest string that has both s1 and s2 as subsequences. Return both its length and the actual string.


//-----------------------------Recursive implementation--------------
function lcsRecursive(s1, s2, m, n){
    if(m < 0 || n < 0)
        return 0
    if(s1[m] === s2[n]){
        return 1 + lcsRecursive(s1, s2, m-1, n-1)
    }
    return Math.max(lcsRecursive(s1, s2, m-1, n), lcsRecursive(s1, s2, m, n-1))

}


//-----------------------------Memoization implementation--------------
function lcsMemo(s1, s2, m, n, memo){
    if(m < 0 || n < 0)
        return 0
    if(memo[m][n] != -1)
        return memo[m][n]
    if(s1[m] === s2[n]){
        memo[m][n] = 1 + lcsMemo(s1, s2, m-1, n-1, memo)
        return memo[m][n]
    }
    memo[m][n] = Math.max(lcsMemo(s1, s2, m-1, n, memo), lcsMemo(s1, s2, m, n-1, memo))
    return memo[m][n]

}

//-----------------------------Tabulation implementation--------------

function lcsTabulation(s1, s2, m, n){
    const dp = Array.from({length: m+1}, ()=> new Array(n+1).fill(0))

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s1[i - 1] === s2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
   }
   return dp[m][n]
}

const testCases =  [
  { s1: "AGGTAB",  s2: "GXTXAYB",  expectedLen: 9,  expectedStr: "AGXGTXAYB"  },
  { s1: "ABCBDAB", s2: "BDCABA",   expectedLen: 9,  expectedStr: "ABDCABDAB"  },
  { s1: "ABC",     s2: "AC",       expectedLen: 3,  expectedStr: "ABC"        },
  { s1: "ABC",     s2: "ABC",      expectedLen: 3,  expectedStr: "ABC"        }, // identical
  { s1: "ABC",     s2: "DEF",      expectedLen: 6,  expectedStr: "ABCDEF"     }, // no common
  { s1: "A",       s2: "A",        expectedLen: 1,  expectedStr: "A"          }, // single char
  { s1: "",        s2: "ABC",      expectedLen: 3,  expectedStr: "ABC"        }, // one empty
  { s1: "",        s2: "",         expectedLen: 0,  expectedStr: ""           }, // both empty
];

console.log("=".repeat(60));
testCases.forEach(({ s1, s2, expectedLen, expectedStr }, i) => {
    let m = s1.length
    let n = s2.length
    // const result   = m + n - lcsRecursive(s1, s2, m-1, n-1);

    // memo = Array.from({length : m+1}, ()=> new Array(n+1).fill(-1))
    // const result   = m + n - lcsMemo(s1, s2, m-1, n-1, memo);
    const result  = m + n - lcsTabulation(s1, s2, m, n);

  const pass = result === expectedLen

  console.log(`Test ${i + 1}: s1="${s1}" | s2="${s2}"`);
  console.log(`  Expected: ${expectedLen} Got ${result} → ${pass ? "✅ PASS" : "❌ FAIL"}`);
  console.log("-".repeat(60));
});