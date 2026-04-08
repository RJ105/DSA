//Given two strings s1 and s2, find the minimum number of insertions and deletions required to convert s1 into s2.

//-----------------------------Recursive implementation--------------
function minOperationRecursive(s, t, m, n){
        if(m<0) return n+1 // source is over, we have to insert remaining chars of target in source to acheive target

    if(n<0) return m+1 // target length is over, we have to delete remaining chars of source to acheive target

    if(s[m] === t[n]){
        return minOperationRecursive(s, t, m-1, n-1)
    }
    else{
        let insertion = 1 + minOperationRecursive(s, t, m, n-1)
        let deletion = 1 + minOperationRecursive(s, t, m-1, n)
        return Math.min(insertion, deletion) 
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
        memo[m][n] = Math.min(insertion, deletion)
        return memo[m][n] 
    }
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
    // const result   = minOperationRecursive(s1, s2, m-1, n-1);

    memo = Array.from({length : m+1}, ()=> new Array(n+1).fill(-1))
    const result   = minOperationMemo(s1, s2, m-1, n-1, memo);
    // const result  = lcsTabulation(s1, s2, m, n);

  const pass = result === expTotal

  console.log(`Test ${i + 1}: s1="${s1}" | s2="${s2}"`);
  console.log(`  Expected: ${expTotal} Got ${result} → ${pass ? "✅ PASS" : "❌ FAIL"}`);
  console.log("-".repeat(60));
});