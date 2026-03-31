//return longest subsequence 

//-----------------------------Recursive implementation--------------
function lcsRecursive(s1, s2, m, n){
    if(m < 0 || n < 0)
        return ''
    if(s1[m] === s2[n]){
        // return lcsRecursive(s1, s2, m-1, n-1, `${s1[m]}${str}`) ==> wrong approach 

        return lcsRecursive(s1, s2, m-1, n-1) + s1[m] // right approach
    }
    else{
        const left = lcsRecursive(s1, s2, m-1, n)
        const right = lcsRecursive(s1, s2, m, n-1)
        return left.length >= right.length ? left : right 
    }

}


//-----------------------------Memoization implementation--------------
function lcsMemo(s1, s2, m, n, memo){
    if(m < 0 || n < 0)
        return ''
    if(memo[m][n] != -1)
        return memo[m][n]
    if(s1[m] === s2[n]){
        memo[m][n] =  lcsMemo(s1, s2, m-1, n-1, memo) + s1[m]
        return memo[m][n]
    }
    const left = lcsMemo(s1, s2, m-1, n, memo)
    const right = lcsMemo(s1, s2, m, n-1, memo)
    memo[m][n] = left.length >= right.length ? left : right 
    return memo[m][n]

}


//----------------------------- Tabulation implementation--------------

function lcsTabulation(s1, s2, m, n){
    const dp = Array.from({length: m+1}, ()=> new Array(n+1).fill(''))

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s1[i - 1] === s2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + s1[i-1];
            } else {
                let previousRow = dp[i - 1][j]
                let previousColumn =  dp[i][j - 1]
                dp[i][j]= previousRow.length >= previousColumn.length ? previousRow : previousColumn
            }
        }
   }
   return dp[m][n]
}


//----------------------------- another Tabulation implementation--------------

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

   //now retrieve LCS from dp table 
   let i = m, j = n
   let lcs = ''
   while(i > 0 && j > 0 ){
    if(s1[i-1] === s2[j-1] ){
        lcs = s1[i-1] + lcs
        i--
        j--
        
    }
    else if ( dp[i-1][j] >= dp[i][j-1]){
        i--
    }
    else {
        j--
    }
   }
   return lcs
}




const testCases = [
  // Uppercase
  { s1: "AGGTAB",      s2: "GXTXAYB",    expected: "GTAB"    },
  { s1: "ABCBDAB",     s2: "BDCABA",     expected: "BCBA"    },
  { s1: "ABCDEF",      s2: "ACDF",       expected: "ACDF"    },

  // Lowercase
  { s1: "hello",       s2: "hallo",      expected: "hllo"    },
  { s1: "abcdef",      s2: "acf",        expected: "acf"     },
  { s1: "abcdef",      s2: "abcdef",     expected: "abcdef"  },

  // Mixed case (case-sensitive)
  { s1: "Hello",       s2: "hello",      expected: "ello"    },

  // Numeric strings
  { s1: "1234567",     s2: "3567",       expected: "3567"    },
  { s1: "111",         s2: "111",        expected: "111"     },

  // Alphanumeric
  { s1: "a1b2c3",      s2: "abc123",     expected: "a123"    },

  // Edge cases
  { s1: "",            s2: "ABC",        expected: ""        },
  { s1: "",            s2: "",           expected: ""        },
  { s1: "A",           s2: "A",          expected: "A"       },
  { s1: "A",           s2: "B",          expected: ""        },
  { s1: "AAAA",        s2: "AA",         expected: "AA"      },
  { s1: "ABCDEF",      s2: "FEDCBA",     expected: "A"       },
]

console.log("=".repeat(60));
testCases.forEach(({ s1, s2, expected }, i) => {
    let m = s1.length
    let n = s2.length
    // const result   = lcsRecursive(s1, s2, m-1, n-1, '');

    // memo = Array.from({length : m+1}, ()=> new Array(n+1).fill(-1))
    // const result   = lcsMemo(s1, s2, m-1, n-1, memo, '');
    const result  = lcsTabulation(s1, s2, m, n);

  const pass = result === expected

  console.log(`Test ${i + 1}: s1="${s1}" | s2="${s2}"`);
  console.log(` ${pass ? "✅ PASS" : "❌ FAIL"} → Expected: ${expected} Got ${result}`);
  console.log("-".repeat(60));
});