# max sum of non adjacent subsequence


def maxSum(n, arr):
    if(n == 0):
        return arr[0]
    if(n==1):
        return arr[1]
    pick = arr[n] + maxSum(n-2, arr)
    notPick = 0 + maxSum(n-1, arr)
    return max(pick , notPick)

arr = [1, 2, 3, 4, 5]
maxSum(len(arr), arr)