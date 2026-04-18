//Given a string s and a pattern p, determine if the pattern fully matches the string. The pattern can contain:
// ? → matches any single character
// * → matches any sequence of characters (including empty)

//-----------------------------Recursive implementation--------------

function wildCardRecursive(s, p, m, n){

    // Both exhausted — full match
  if (m < 0 && n < 0) return true;

  // Pattern exhausted but s still has chars
  if (n < 0) return false;

  //s exhausted then pattern must have only *
  if(m < 0 ){
    for (let i = n; i< p.length; i++){
        if(p[i] != '*') return false
    }
    return true
  }

    if(s[m] == p[n] || p[n] === '?'){
        return wildCardRecursive(s, p, m-1, n-1)
    }
    if(p[n] === '*'){
        return (wildCardRecursive(s, p, m, n-1) || wildCardRecursive(s, p, m-1, n))
    }
    return false// no match means there in one extra char which cannot be managed by ? or *
}



//-----------------------------Memoization implementation--------------

function wildCardMemo(s, p, m, n, memo){

    // Both exhausted — full match
  if (m < 0 && n < 0) return true;

  // Pattern exhausted but s still has chars
  if (n < 0) return false;

  //s exhausted then pattern must have only *
  if(m < 0 ){
    for (let i = n; i< p.length; i++){
        if(p[i] != '*') return false
    }
    return true
  }

  if (memo[m][n] != -1)
    return memo[m][n]

    if(s[m] == p[n] || p[n] === '?'){
        memo[m][n] = wildCardMemo(s, p, m-1, n-1, memo)
        return memo[m][n]
    }
    if(p[n] === '*'){
        memo[m][n] = (wildCardMemo(s, p, m, n-1, memo) || wildCardMemo(s, p, m-1, n, memo))
        return memo[m][n]
    }
    memo[m][n] = false// no match means there in one extra char which cannot be managed by ? or *
    return memo[m][n]
}


//-----------------------------Tabulation implementation--------------
function wildcardTabulation(s, p){
    let m = s.length
    let n = p.length 

    let dp = Array.from({length : m+1}, ()=> new Array(n+1).fill(false))
    dp[0][0] = true 
    for(let j=1; j <= n; j++){
        if(p[j-1] === '*'){
            dp[0][j] = dp[0][j - 1] //right approach 
            // dp[0][j] = true ------wrong approach
        }
    }


    for(let i=1; i<=m; i++){
        for(let j=1; j<=n; j++){
            if(s[i-1] === p[j-1] || p[j-1] === '?'){
                dp[i][j] = dp[i-1][j-1]
            }
            else if(p[j-1] === '*'){
                dp[i][j] = dp[i][j-1] || dp[i-1][j]
            }

        }
    }
    return dp[m][n] 
}


const testCases = [
  { s: "baaabab",  p: "ba*b",      expected: true  },
  { s: "baaabab",  p: "ba*a?",     expected: true  },
  { s: "baaabab",  p: "ba*c",      expected: false },
  { s: "aa",       p: "a",         expected: false }, // too short pattern
  { s: "aa",       p: "*",         expected: true  }, // * matches all
  { s: "aa",       p: "a*",        expected: true  },
  { s: "ab",       p: "?*",        expected: true  }, // ? matches a, * matches b
  { s: "abc",      p: "abc",       expected: true  }, // exact match
  { s: "abc",      p: "a?c",       expected: true  }, // ? matches b
  { s: "abc",      p: "a*c",       expected: true  }, // * matches b
  { s: "abc",      p: "a*d",       expected: false }, // * can't help, d != c
  { s: "",         p: "*",         expected: true  }, // empty s, * matches empty
  { s: "",         p: "",          expected: true  }, // both empty
  { s: "",         p: "a",         expected: false }, // empty s, non-empty p
  { s: "abc",      p: "***",       expected: true  }, // multiple stars
];

console.log("=".repeat(65));
testCases.forEach(({ s, p, expected }, idx) => {
    m = s.length
    n = p.length 
//   const result  = wildCardRecursive(s, p, m-1, n-1);
//     let memo = Array.from({length: m+1}, ()=> new Array(n+1).fill(-1))
// const result   = wildCardMemo(s, p, m-1, n-1, memo);
  const result  = wildcardTabulation(s, p);

  const pass = result === expected 

  console.log(`Test ${String(idx + 1).padStart(2, "0")}: s="${s}" | p="${p}"`);
  console.log(`${pass ? "✅ PASS" : "❌ FAIL"} → Expected: ${expected} Got : ${result}`);
  console.log("-".repeat(65));
});