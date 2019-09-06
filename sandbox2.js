
let random = [ Math.round(Math.random()*9) ]
for(let i = 0; i < 9; i++){
    let randoms = ( Math.round(Math.random()*9))
    // if(i === 0){
    //     random.push(randoms)
    // }
    for(j = 0; j < random.length; j++){
        // console.log(i,j)
        if(randoms === random[i]){
            i--
        }else{
            random.push(randoms)
        }
    }
}

console.log(random)