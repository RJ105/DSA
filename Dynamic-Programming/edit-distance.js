//Given two strings s1 and s2, find the minimum number of insertions, deletions and replace  required to convert s1 into s2.


//-----------------------------Recursive implementation--------------
function minOperationRecursive(s, t, m, n){
    
    if(m<0) return n+1 // source is over, we have to insert remaining chars of target in source to acheive target

    if(n<0) return m+1 // target length is over, we have to delete remaining chars of source to acheive target

    if(s[m] === t[n]){
        return minOperationRecursive(s, t, m-1, n-1)
    }
    else{
        //insertion is done before m, so m+1 matches with n, but m remains the same hence pointers move to n-1
        let insertion = 1 + minOperationRecursive(s, t, m, n-1) 

        //we delete current char in source and move to m-1 to check whether it matchs with n
        let deletion = 1 + minOperationRecursive(s, t, m-1, n)

        //we replace current char of soruce with the required char of traget hence its match and both pointers move
        let replace = 1+ minOperationRecursive(s, t, m-1, n-1)
        return Math.min(insertion, deletion, replace) 
    }
}

//-----------------------------Memoization implementation--------------
function minOperationMemo(s, t, m, n, memo){
    if(m<0) return n+1 // source is over, we have to insert remaining chars of target in source to acheive target

    if(n<0) return m+1 // target length is over, we have to delete remaining chars of source to acheive target

    if(memo[m][n] != -1)
        return memo[m][n]
    if(s[m] === t[n]){
        memo[m][n] = minOperationMemo(s, t, m-1, n-1, memo)
        return memo[m][n]
    }
    else{
        let insertion = 1 + minOperationMemo(s, t, m, n-1, memo)
        let deletion = 1 + minOperationMemo(s, t, m-1, n, memo)
        let replace = 1+ minOperationRecursive(s, t, m-1, n-1)

        memo[m][n] = Math.min(insertion, deletion, replace)
        return memo[m][n] 
    }
}


//-----------------------------Tabulation implementation--------------

function minOperationTabulation(s1, s2, m, n){
    const dp = Array.from({length: m+1}, ()=> new Array(n+1).fill(0))

    for(let i=0; i<=m; i++)
        dp[i][0] = i
    for(let j=0; j<=n; j++)
        dp[0][j] = j
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s1[i - 1] === s2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1+ Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
            }
        }
   }
   return dp[m][n]
}

const testCases = [
  { s1: "horse",    s2: "ros",      expected: 3 },
  { s1: "intention",s2: "execution",expected: 5 },
  { s1: "ABC",      s2: "ABC",      expected: 0 }, // identical
  { s1: "ABC",      s2: "DEF",      expected: 3 }, // all replace
  { s1: "",         s2: "ABC",      expected: 3 }, // all insert
  { s1: "ABC",      s2: "",         expected: 3 }, // all delete
  { s1: "A",        s2: "A",        expected: 0 }, // single char match
  { s1: "A",        s2: "B",        expected: 1 }, // single char replace
  { s1: "ABCDEF",   s2: "ACF",      expected: 3 }, // 3 deletions
  { s1: "ACF",      s2: "ABCDEF",   expected: 3 }, // 3 insertions
  { s1: "sunday",   s2: "saturday", expected: 3 },
];

console.log("=".repeat(60));
testCases.forEach(({ s1, s2, expected}, i) => {
    let m = s1.length
    let n = s2.length
    // const result   = minOperationRecursive(s1, s2, m-1, n-1);

    // memo = Array.from({length : m+1}, ()=> new Array(n+1).fill(-1))
    // const result   = minOperationMemo(s1, s2, m-1, n-1, memo);
    const result  = minOperationTabulation(s1, s2, m, n);

  const pass = result === expected

  console.log(`Test ${i + 1}: s1="${s1}" | s2="${s2}"`);
  console.log(`  Expected: ${expected} Got ${result} → ${pass ? "✅ PASS" : "❌ FAIL"}`);
  console.log("-".repeat(60));
});