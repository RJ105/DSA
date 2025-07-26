

def allUniquePath(i,j,matirx):
    if(i == 0 and j == 0):
        return 1
    if(i < 0 or j < 0):
        return 0
    else:
        left = allUniquePath(i, j-1, matirx)
        up = allUniquePath(i-1, j, matirx)
    return left + up 


n = 1
matrix = [
     [10, 50, 1],
    [5, 100, 11]
]

print(allUniquePath(len(matrix), len(matrix[0]), matrix))