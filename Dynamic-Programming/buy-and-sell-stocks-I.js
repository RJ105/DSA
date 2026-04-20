//buy and sell stocks
//only 1 txn allowed - one buy and one sell

function buyAndSellStocks(stocks) {
    if (!stocks || stocks.length === 0) return 0;

    let min = stocks[0];
    let maxProfit = 0;

    for (let i = 1; i < stocks.length; i++) {
        let profit = stocks[i] - min;
        maxProfit = Math.max(maxProfit, profit);
        min = Math.min(min, stocks[i]);
    }

    return maxProfit;
}


// 🧪 Test Cases
const testCases = [
    { input: [7, 1, 5, 3, 6, 4], expected: 5 },
    { input: [1, 2, 3, 4, 5], expected: 4 },
    { input: [7, 6, 4, 3, 1], expected: 0 },
    { input: [5], expected: 0 },
    { input: [2, 5], expected: 3 },
    { input: [5, 2], expected: 0 },
    { input: [3, 3, 3, 3], expected: 0 },
    { input: [5, 4, 3, 2, 1], expected: 0 },
    { input: [1, 10, 2, 9], expected: 9 },
    { input: [9, 1, 3, 10], expected: 9 },
    { input: [3, 8, 2, 5, 7, 1, 9], expected: 8 },
    { input: [8, 6, 5, 4, 10], expected: 6 },
    { input: [2, 10, 1, 5], expected: 8 },
    { input: [0, 2, 0, 3], expected: 3 },
    { input: [], expected: 0 }
];


// 🚀 Test Runner
function runTests() {
    let passed = 0;

    testCases.forEach((test, index) => {
        const result = buyAndSellStocks(test.input);
        const isPass = result === test.expected;

        if (isPass) passed++;

        console.log(
            `Test ${index + 1}: ${isPass ? "✅ PASS" : "❌ FAIL"} | ` +
            `Input: ${JSON.stringify(test.input)} | ` +
            `Expected: ${test.expected}, Got: ${result}`
        );
    });

    console.log("\n----------------------");
    console.log(`Passed ${passed} / ${testCases.length} tests`);
}


// ▶️ Run
runTests();