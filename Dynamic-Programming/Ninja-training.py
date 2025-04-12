#Ninja training : 2d DP probblem 



def maxMerit(day,last,matrix,dp):
    if(dp[day][last] != -1):
        return dp[last][-1]
    if(day == 0):
        maxm =-1
        for i in range(len(matrix[day])):
            if(last != i):
                maxm = max(maxm,matrix[day][i])
        # print('last day 0 = ', day, maxm)
        dp[last][last] = maxm
        return dp[last][last]
    maxm = -1
    for i in range(len(matrix[day])):
        if(last != i):
            currentMerit = matrix[day][i] + maxMerit(day-1, i, matrix,dp)
            maxm = max(maxm, currentMerit)
    dp[day][last] = maxm
    return dp[day][last]


n = 2
matrix = [
     [10, 50, 1],
    [5, 100, 11]
]
# print('first len = ',len(matrix[0]))
print(maxMerit(n-1, len(matrix[0]), matrix,[[-1]*len(matrix[0])]*n))
# The above code is a recursive solution to the problem of finding the maximum merit score that can be obtained by a ninja over a series of days, given a matrix of scores.
# The function maxMerit takes in the current day, the last index of the previous day's score, and the matrix of scores as input.

#----------------------------------------
#tabulation solution:   

def maxMerit(day,last,matrix,dp):
    dp[0][0] = max(matrix[0][1], matrix[0][2])
    dp[0][1] = max(matrix[0][0], matrix[0][2])
    dp[0][2] = max(matrix[0][0], matrix[0][1])
    maxm = -1
    for i in range(len(matrix)):
        for last in range(len(matrix(0))):
            for j in range(len(matrix[day])):
                if(last != i):
                    currentMerit = matrix[day][i] + maxMerit(day-1, i, matrix,dp)
                    maxm = max(maxm, currentMerit)
    dp[day][last] = maxm
    return dp[day][last]


n = 2
matrix = [
     [10, 50, 1],
    [5, 100, 11]
]