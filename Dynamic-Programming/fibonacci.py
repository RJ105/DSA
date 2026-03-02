#recursive solution 
def fibo(n):
    if(n<=1):
        return n
    return fibo(n-1) + fibo(n-2)

n = 10
print(fibo(n))

# Time complexity : O(2^n)
# space complexity : O(n)

# -----------------------------------------------------------------------------
    # Memoization

