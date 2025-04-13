

def allUniquePath(i,j,matirx):
    if(i == 0 and j == 0):
        return 1
    if(i < 0 or J < 0):
        return 0
    else:
        left = allUniquePath(i, j-1)
        up = allUniquePath(i-1, J)
    return left + up 


n = 1
matrix = [
     [10, 50, 1],
    [5, 100, 11]
]
