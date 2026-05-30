function lisRecursive(nums, i, prevIndex ) {
  if (i === nums.length) return 0;

  // Skip current element
  let skip = lisRecursive(nums, i + 1, prevIndex);

  // Pick current element only if it's greater than previous picked
  let pick = 0;
  if (prevIndex === -1 || nums[i] > nums[prevIndex]) {
    pick = 1 + lisRecursive(nums, i + 1, i);
  }

  return Math.max(pick, skip);
}


function lisMemo(nums, i, prevIndex, memo) {
  if (i === nums.length) return 0;

  // Skip current element
  if(memo[i][prevIndex +1 ] != -1)
    return memo[i][prevIndex +1]
  let skip = lisMemo(nums, i + 1, prevIndex, memo);

  // Pick current element only if it's greater than previous picked
  let pick = 0;
  if (prevIndex === -1 || nums[i] > nums[prevIndex]) {
    pick = 1 + lisMemo(nums, i + 1, i, memo);
  }
  memo[i][prevIndex +1] = Math.max(pick, skip)
  return memo[i][prevIndex +1]
}
const testCases = [
  { nums: [10, 9, 2, 5, 3, 7, 101, 18],  expected: 4 }, // [2,3,7,101]
  { nums: [0, 1, 0, 3, 2, 3],            expected: 4 }, // [0,1,2,3]
  { nums: [7, 7, 7, 7, 7],               expected: 1 }, // all same — strictly increasing
  { nums: [1, 2, 3, 4, 5],              expected: 5 }, // already sorted
  { nums: [5, 4, 3, 2, 1],              expected: 1 }, // reverse sorted
  { nums: [3],                           expected: 1 }, // single element
  { nums: [1, 3, 2, 4],                  expected: 3 }, // [1,2,4] or [1,3,4]
  { nums: [4, 10, 4, 3, 8, 9],           expected: 3 }, // [4,8,9]
];

console.log("=".repeat(65));
testCases.forEach(({ nums, expected }, idx) => {
  const n = nums.length 
  // const result  = lisRecursive(nums, 0, -1);
  memo = Array.from({length : n}, ()=> new Array(n+1).fill(-1))
  const result     = lisMemo(nums, 0, -1, memo);
  // const tabulation = lisTabulation(nums);

  const pass = result === expected;

  console.log(`Test ${String(idx + 1).padStart(2, "0")}: nums=[${nums}]`);
  console.log(`  Result: ${result}`);
  console.log(`${pass ? "✅ PASS" : "❌ FAIL"}  Expected: ${expected}`);
  console.log("-".repeat(65));
});