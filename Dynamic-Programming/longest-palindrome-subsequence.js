//Given a string s, find the longest subsequence of s that is also a palindrome. Return both its length and the actual string.


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
  { s: "BBABCBCAB", expectedLen: 7, expectedStr: "BABCBAB" },
  { s: "abcba",     expectedLen: 5, expectedStr: "abcba"   }, // already palindrome
  { s: "aabaa",     expectedLen: 5, expectedStr: "aabaa"   }, // already palindrome
  { s: "racecar",   expectedLen: 7, expectedStr: "racecar" }, // already palindrome
  { s: "abcde",     expectedLen: 1, expectedStr: "a"       }, // no palindrome > 1
  { s: "AAAA",      expectedLen: 4, expectedStr: "AAAA"    }, // all same chars
  { s: "A",         expectedLen: 1, expectedStr: "A"       }, // single char
  { s: "AB",        expectedLen: 1, expectedStr: "A"       }, // no common palindrome > 1
];

console.log("=".repeat(65));
testCases.forEach(({ s, expectedLen, expectedStr }, idx) => {
  const n = s.length
  const rev = s.split("").reverse().join("") 
//   const len   = lcsRecursive(s, rev, n-1, n-1);
    
    // memo = Array.from({length : n+1}, ()=> new Array(n+1).fill(-1))
    // const len   = lcsMemo(s, rev, n-1, n-1, memo);
    const len  = lcsTabulation(s, rev, n, n);

  const passLen  = len === expectedLen 

  console.log(`Test ${String(idx + 1).padStart(2, "0")}: s="${s}"`);
  console.log(`${passLen ? "✅ PASS" : "❌ FAIL"}  →  Memo Length: ${len} | Expected: ${expectedLen}`);
//   console.log(`  LPS: "${lps}" | Expected: "${expectedStr}" → ${passStr ? "✅ PASS" : "❌ FAIL"}`);
  console.log("-".repeat(65));
});