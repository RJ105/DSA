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
  { s1: "heap",    s2: "pea",     expDel: 2, expIns: 1, expTotal: 3 },
  { s1: "AGGTAB",  s2: "GXTXAYB", expDel: 2, expIns: 3, expTotal: 5 },
  { s1: "ABC",     s2: "ABC",     expDel: 0, expIns: 0, expTotal: 0 }, // identical
  { s1: "ABC",     s2: "DEF",     expDel: 3, expIns: 3, expTotal: 6 }, // no common
  { s1: "ABCDEF",  s2: "ACF",     expDel: 3, expIns: 0, expTotal: 3 }, // s2 subset of s1
  { s1: "ACF",     s2: "ABCDEF",  expDel: 0, expIns: 3, expTotal: 3 }, // s1 subset of s2
  { s1: "A",       s2: "A",       expDel: 0, expIns: 0, expTotal: 0 }, // single char match
  { s1: "A",       s2: "B",       expDel: 1, expIns: 1, expTotal: 2 }, // single char no match
  { s1: "",        s2: "ABC",     expDel: 0, expIns: 3, expTotal: 3 }, // empty s1
  { s1: "ABC",     s2: "",        expDel: 3, expIns: 0, expTotal: 3 }, // empty s2
];

console.log("=".repeat(60));
testCases.forEach(({ s1, s2, expDel,  expIns, expTotal}, i) => {
    let m = s1.length
    let n = s2.length
    // const result   = m + n - 2*lcsRecursive(s1, s2, m-1, n-1);

    // memo = Array.from({length : m+1}, ()=> new Array(n+1).fill(-1))
    // const result   = m + n - 2*lcsMemo(s1, s2, m-1, n-1, memo);
    const result  =  m + n - 2*lcsTabulation(s1, s2, m, n);

  const pass = result === expTotal

  console.log(`Test ${i + 1}: s1="${s1}" | s2="${s2}"`);
  console.log(`  Expected: ${expTotal} Got ${result} → ${pass ? "✅ PASS" : "❌ FAIL"}`);
  console.log("-".repeat(60));
});