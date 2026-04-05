//Given a string s, find the minimum number of insertions required to make it a palindrome. You can insert a character at any position.

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
  { s: "ABCDE",     expected: 4 }, // LPS=1, insert 4
  { s: "ABCBA",     expected: 0 }, // already palindrome
  { s: "ABCAA",     expected: 2 }, // LPS="ACA" or "AAA" → 3, insert 2
  { s: "BBABCBCAB", expected: 2 }, // LPS=7, insert 2
  { s: "aabaa",     expected: 0 }, // already palindrome
  { s: "abcde",     expected: 4 }, // LPS=1, insert 4
  { s: "A",         expected: 0 }, // single char, already palindrome
  { s: "AB",        expected: 1 }, // LPS=1, insert 1
  { s: "AAAA",      expected: 0 }, // already palindrome
  { s: "AACECAAAA", expected: 2 }, // LPS=7, insert 2
];

console.log("=".repeat(65));
testCases.forEach(({ s, expected }, idx) => {
  const n = s.length
  const rev = s.split("").reverse().join("") 
//   const len   = n - lcsRecursive(s, rev, n-1, n-1);
    
    // memo = Array.from({length : n+1}, ()=> new Array(n+1).fill(-1))
    // const len   = n - lcsMemo(s, rev, n-1, n-1, memo);
    const len  =n - lcsTabulation(s, rev, n, n);

  const passLen  = len === expected 

  console.log(`Test ${String(idx + 1).padStart(2, "0")}: s="${s}"`);
  console.log(`${passLen ? "✅ PASS" : "❌ FAIL"}  → Length: ${len} | Expected: ${expected}`);
//   console.log(`  LPS: "${lps}" | Expected: "${expectedStr}" → ${passStr ? "✅ PASS" : "❌ FAIL"}`);
  console.log("-".repeat(65));
});