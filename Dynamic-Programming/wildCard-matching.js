//Given a string s and a pattern p, determine if the pattern fully matches the string. The pattern can contain:
// ? → matches any single character
// * → matches any sequence of characters (including empty)

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

// wildCardRecursive('aa', '*', 1, 0)

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
  const result  = wildCardRecursive(s, p, m-1, n-1);
//   const memo       = wildcardMemo(s, p);
//   const tabulation = wildcardTabulation(s, p);

  const pass = result === expected 

  console.log(`Test ${String(idx + 1).padStart(2, "0")}: s="${s}" | p="${p}"`);
  console.log(`${pass ? "✅ PASS" : "❌ FAIL"} → Expected: ${expected} Got : ${result}`);
  console.log("-".repeat(65));
});