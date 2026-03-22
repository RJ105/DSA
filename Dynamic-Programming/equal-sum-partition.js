//Given an array of numbers, determine whether it can be partitioned into two subsets such that the sum of both subsets is equal.

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

function main(weights, target, n){

    const total = weights.reduce((a, b) => a + b, 0)
    if(total % 2) return false 
    return subset(weights, total/2, weights.length -1)
}

console.log(main([1, 2, 3, 5], 4))