#Ninja training : 2d DP probblem 



def maxMerit(day,last,matrix,dp):
    if(day == 0):
        maxm =-1
        for i in range(len(matrix[day])):
            if(last != i):
                maxm = max(maxm,matrix[day][i])
        # print('last day 0 = ', day, maxm)
        dp[0] = maxm
        return maxm
    if(dp[day] != 0):
        return dp[day]
    maxm = -1
    for i in range(len(matrix[day])):
        if(last != i):
            currentMerit = matrix[day][i] + maxMerit(day-1, i, matrix,dp)
            maxm = max(maxm, currentMerit)

    # print(day, maxm)
    return maxm



n = 2
matrix = [
     [10, 50, 1],
    [5, 100, 11]
]
# print('first len = ',len(matrix[0]))
print(maxMerit(n-1, len(matrix[0]), matrix,[0]*n))
# The above code is a recursive solution to the problem of finding the maximum merit score that can be obtained by a ninja over a series of days, given a matrix of scores.
# The function maxMerit takes in the current day, the last index of the previous day's score, and the matrix of scores as input.

#----------------------------------------
#tabulation solution:   
