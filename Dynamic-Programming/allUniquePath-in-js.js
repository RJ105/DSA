
function allUniquePath(i,j){
    if(i==0 && j==0)
        return  1
    if(i<0 || j < 0)
        return 0
    else
        return allUniquePath(i-1, j) + allUniquePath(i,j-1)
}



const m = 3, n = 2;
console.log(allUniquePath(m-1,n-1))

//Recursion
//Space complexity : 
