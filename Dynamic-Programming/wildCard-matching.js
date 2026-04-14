//Given a string s and a pattern p, determine if the pattern fully matches the string. The pattern can contain:


function wildCardRecursive(s, p, m, n){

    if(s[m] == p[n] || p[n] == '?'){
        return wildCardRecursive(s, p, m-1, n-1)
    }
    if(p[n] === '*'){
        return (wildCardRecursive(s, p, m, n-1) || wildCardRecursive(s, p, m-1, n))
    }
}