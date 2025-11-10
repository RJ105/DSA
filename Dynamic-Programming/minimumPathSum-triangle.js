// DP problem : Triangle - mini path sum 
//--------------------------------------recusrion--------------------------------------
function minimumPathSum(triangle, i,j){
    //edge case is required only for i because j will be never exceed the column length 
    if(i == triangle.length-1){
        console.log(i,j,'==>',triangle[triangle.length-1][j])
        return triangle[triangle.length-1][j]
    }

    else
        return triangle[i][j] + Math.min(minimumPathSum(triangle, i+1, j), minimumPathSum(triangle, i+1, j+1))
   
}


m=4
n=4
console.log(minimumPathSum(triangle, 0, 0))