// DP problem : Triangle - mini path sum 
//--------------------------------------recusrion--------------------------------------
// function minimumPathSum(triangle, i,j){
//     //edge case is required only for i because j will be never exceed the column length 
//     if(i == triangle.length-1){
//         console.log(i,j,'==>',triangle[triangle.length-1][j])
//         return triangle[triangle.length-1][j]
//     }
//     else
//         return triangle[i][j] + Math.min(minimumPathSum(triangle, i+1, j), minimumPathSum(triangle, i+1, j+1))
   
// }

//--------------------------------------Memoization--------------------------------------
function minimumPathSum(triangle, i,j){
    //edge case is required only for i because j will be never exceed the column length 
    if(i == triangle.length-1){
        // console.log(i,j,'==>',triangle[triangle.length-1][j])
        memo[i][j] = triangle[triangle.length-1][j]
        return memo[i][j]
    }
    if(memo[i][j] != -1)
        return memo[i][j]
    else{
        memo[i][j] =   triangle[i][j] + Math.min(minimumPathSum(triangle, i+1, j), minimumPathSum(triangle, i+1, j+1))
        return memo[i][j]
    }
   
}




m=4
n=4
// triangle =  [[2], [3, 7], [8, 5, 6], [6, 1, 9, 3]]
triangle =  [[3], [6, 9], [8, 7, 1], [9, 6, 8, 2]]
memo = Array.from({length : 4}, ()=> Array(4).fill(-1))
console.log(minimumPathSum(triangle, 0, 0, memo))