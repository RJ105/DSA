
function lcsRecursive(s1, s2, m, n){
    if(m < 0 || n < 0)
        return 0
    if(s1[m] === s2[n]){
        return 1 + lcsRecursive(s1, s2, m-1, n-1)
    }
    return Math.max(lcsRecursive(s1, s2, m-1, n), lcsRecursive(s1, s2, m, n-1))

}


const testCases = [
  { s1: "AGGTAB",   s2: "GXTXAYB",  expected: 4 },
  { s1: "ABCBDAB",  s2: "BDCABA",   expected: 4 },
  { s1: "ABC",      s2: "AC",        expected: 2 },
  { s1: "ABC",      s2: "DEF",       expected: 0 }, // No common chars
  { s1: "A",        s2: "A",         expected: 1 }, // Single char match
  { s1: "",         s2: "ABC",       expected: 0 }, // Empty string
];

console.log("=".repeat(60));
testCases.forEach(({ s1, s2, expected }, i) => {
    let m = s1.length
    let n = s2.length
  const result   = lcsRecursive(s1, s2, m-1, n-1);
//   const memo        = lcsMemo(s1, s2);
//   const { length, lcs } = lcsTabulation(s1, s2);

  const pass = result === expected

  console.log(`Test ${i + 1}: s1="${s1}" | s2="${s2}"`);
  console.log(`  Expected: ${expected} Got ${result} → ${pass ? "✅ PASS" : "❌ FAIL"}`);
  console.log("-".repeat(60));
});