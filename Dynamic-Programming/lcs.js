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

const testCases = [
  // Original
  { s1: "AGGTAB",       s2: "GXTXAYB",       expected: 4 },
  { s1: "ABCBDAB",      s2: "BDCABA",         expected: 4 },
  { s1: "ABC",          s2: "AC",             expected: 2 },
  { s1: "ABC",          s2: "DEF",            expected: 0 },
  { s1: "A",            s2: "A",              expected: 1 },
  { s1: "",             s2: "ABC",            expected: 0 },

  // Lowercase
  { s1: "abcdef",       s2: "acf",            expected: 3 },
  { s1: "hello",        s2: "hallo",          expected: 4 },
  { s1: "dynamic",      s2: "dynamite",       expected: 6 },
  { s1: "programming",  s2: "gaming",         expected: 6 },

  // Mixed case (case-sensitive)
  { s1: "AbCdEf",       s2: "abcdef",         expected: 3 }, // only b, d, f match
  { s1: "Hello",        s2: "hello",          expected: 4 }, // H != h, rest match
  { s1: "JavaScript",   s2: "javaScript",     expected: 9 }, // J != j

  // Numeric strings
  { s1: "1234567",      s2: "3567",           expected: 4 },
  { s1: "9182736450",   s2: "1234567890",     expected: 6 },
  { s1: "111",          s2: "111",            expected: 3 },
  { s1: "123",          s2: "456",            expected: 0 },

  // Alphanumeric
  { s1: "a1b2c3",       s2: "abc123",         expected: 4 },
  { s1: "js2024",       s2: "java2024",       expected: 5 }, // j, 2, 0, 2, 4
  { s1: "node18",       s2: "node20",         expected: 4 }, // n, o, d, e, 0 -- wait
  
  // Edge cases
  { s1: "",             s2: "",               expected: 0 }, // Both empty
  { s1: "A",            s2: "B",              expected: 0 }, // Single char no match
  { s1: "AAAA",         s2: "AAAA",           expected: 4 }, // All same chars
  { s1: "AAAA",         s2: "AA",             expected: 2 }, // Repeated chars
  { s1: "ABCDEF",       s2: "FEDCBA",         expected: 1 }, // Reverse — only 1 common subseq
  { s1: "abcdef",       s2: "abcdef",         expected: 6 }, // Identical strings
]

console.log("=".repeat(60));
testCases.forEach(({ s1, s2, expected }, i) => {
    let m = s1.length
    let n = s2.length
    // const result   = lcsRecursive(s1, s2, m-1, n-1);

    // memo = Array.from({length : m+1}, ()=> new Array(n+1).fill(-1))
    // const result   = lcsMemo(s1, s2, m-1, n-1, memo);
    const result  = lcsTabulation(s1, s2, m, n);

  const pass = result === expected

  console.log(`Test ${i + 1}: s1="${s1}" | s2="${s2}"`);
  console.log(`  Expected: ${expected} Got ${result} → ${pass ? "✅ PASS" : "❌ FAIL"}`);
  console.log("-".repeat(60));
});