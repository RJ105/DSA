//Given two strings s and t, find the number of distinct subsequences of s that equal t.


//-----------------------------Recursive implementation--------------
function lcsRecursive(s1, s2, m, n){
    if(n<0) return 1 //s2 found in s1
    if(m<0) return 0 //s1 over before finding a match

    if(s1[m] === s2[n] ){
        return lcsRecursive(s1, s2, m-1, n-1) + lcsRecursive(s1, s2, m-1, n)
    }
    return lcsRecursive(s1, s2, m-1, n) // not match then reduce the s1 and then search
}


//-----------------------------Memoization implementation--------------
function lcsMemo(s1, s2, m, n, memo){
    if(n<0) return 1 //s2 found in s1
    if(m<0) return 0 //s1 over before finding a match

    if(memo[m][n] != -1)
        return memo[m][n]
    if(s1[m] === s2[n]){
        memo[m][n] = lcsRecursive(s1, s2, m-1, n-1, memo) + lcsRecursive(s1, s2, m-1, n, memo)
        return memo[m][n]
    }
    memo[m][n] = lcsRecursive(s1, s2, m-1, n, memo)
    return memo[m][n]

}

//-----------------------------Tabulation implementation--------------

function lcsTabulation(s1, s2, m, n){
    const dp = Array.from({length: m+1}, ()=> new Array(n+1).fill(0))

    for (let i = 0; i <= m; i++) dp[i][0] = 1;
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s1[i - 1] === s2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j]
            } else {
                dp[i][j] = dp[i - 1][j]
            }
        }
   }
   return dp[m][n]
}

const testCases = [
  { s: "rabbbit",        t: "rabbit",  expected: 3  },
  { s: "babgbag",        t: "bag",     expected: 5  },
  { s: "ABC",            t: "ABC",     expected: 1  }, // exact match
  { s: "ABCABC",         t: "ABC",     expected: 4  }, // multiple ways
  { s: "ABC",            t: "DEF",     expected: 0  }, // no match
  { s: "AAAA",           t: "AA",      expected: 6  }, // repeated chars
  { s: "ABC",            t: "",        expected: 1  }, // empty t — 1 way
  { s: "",               t: "ABC",     expected: 0  }, // empty s — 0 ways
  { s: "A",              t: "A",       expected: 1  }, // single char match
  { s: "AA",             t: "A",       expected: 2  }, // two ways to pick A
];

console.log("=".repeat(60));
testCases.forEach(({ s, t, expected }, i) => {
    let m = s.length
    let n = t.length
    // const result   = lcsRecursive(s, t, m-1, n-1);

    // memo = Array.from({length : m+1}, ()=> new Array(n+1).fill(-1))
    // const result   = lcsMemo(s, t, m-1, n-1, memo);
    const result  = lcsTabulation(s, t, m, n);

  const pass = result === expected

  console.log(`Test ${i + 1}: s1="${s}" | s2="${t}"`);
  console.log(`  Expected: ${expected} Got ${result} → ${pass ? "✅ PASS" : "❌ FAIL"}`);
  console.log("-".repeat(60));
});