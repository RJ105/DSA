function subset(weights, target, n){
     if(target == 0) {
        return true
    }

    if(n < 0) return false

    if(weights [n]<= target){
        const pick = subset(weights, target-weights[n], n-1)
        const skip =  subset(weights, target, n-1)
        return pick || skip 
    }
    else {
        return subset(weights, target, n-1)
    }
}

// console.log(subset([3,5,2], 5, 2))  // true
// console.log(subset([3,6,2], 7, 2))  // false

// [arr, target, expected]
const testCases = [
    // ── Zero Target ──────────────────────────────────────────────────────
    [[3,5,2],   0,  true],   // empty subset always sums to 0
    [[],        0,  true],   // empty array, target 0

    // ── Empty Array ───────────────────────────────────────────────────────
    [[],        5,  false],  // no items, target unreachable

    // ── Single Item ───────────────────────────────────────────────────────
    [[5],       5,  true],   // single item equals target
    [[5],       3,  false],  // single item greater than target

    // ── Standard Cases ────────────────────────────────────────────────────
    [[3,5,2],   2,  true],   // {2} = 2
    [[3,5,2],   3,  true],   // {3} = 3
    [[3,5,2],   5,  true],   // {5} or {3,2} = 5
    [[3,5,2],   7,  true],   // {5,2} = 7
    [[3,5,2],   8,  true],   // {3,5} = 8
    [[3,5,2],  10,  true],   // {3,5,2} = 10

    // ── Impossible Cases ──────────────────────────────────────────────────
    [[3,5,2],   1,  false],  // no subset sums to 1
    [[3,5,2],   4,  false],  // no subset sums to 4
    [[3,5,2],   6,  false],  // no subset sums to 6
    [[3,5,2],   9,  false],  // no subset sums to 9
    [[3,5,2],  11,  false],  // exceeds total sum 10

    // ── All Even Items, Odd Target ────────────────────────────────────────
    [[2,4,6],   5,  false],  // all even numbers cant sum to odd target

    // ── Multiple Subsets Possible ─────────────────────────────────────────
    [[1,5,11,5], 11, true],  // {11} or {1,5,5} = 11

    // ── All Items Used ────────────────────────────────────────────────────
    [[1,2,3],   6,  true],   // {1,2,3} = 6
    [[1,2,3],   7,  false],  // exceeds total sum 6
]

let passed = 0, failed = 0
testCases.forEach(([arr, target, expected], i) => {
    const result = subset(arr, target, arr.length-1)
    const tc = `TC-${String(i+1).padStart(2,'0')}`
    if(result !== expected){
        failed++
        console.log(`${tc}: ❌ FAIL | arr=${JSON.stringify(arr)} target=${target} Expected: ${expected}, Got: ${result}`)
    } else {
        passed++
        console.log(`${tc}: ✅ PASS | arr=${JSON.stringify(arr)} target=${target} Expected: ${expected}`)
    }
})
console.log(`\nResults: ${passed} passed, ${failed} failed out of ${testCases.length} tests`)
