let arr = [ 
  [ '1', '4', '5', '8', '3', '2', ' ', ' ', ' ' ],
  [ ' ', '9', ' ', ' ', '7', '6', '4', ' ', '5' ],
  [ '2', ' ', ' ', '4', ' ', ' ', '8', '1', '9' ],
  [ ' ', '1', '9', ' ', ' ', '7', '3', ' ', '6' ],
  [ '7', '6', '2', ' ', '8', '3', ' ', '9', ' ' ],
  [ ' ', ' ', ' ', ' ', '6', '1', ' ', '5', ' ' ],
  [ ' ', ' ', '7', '6', ' ', ' ', ' ', '3', ' ' ],
  [ '4', '3', ' ', ' ', '2', ' ', '5', ' ', '1' ],
  [ '6', ' ', ' ', '3', ' ', '8', '9', ' ', ' ' ] 
]

function cekKanan(array, posI, posJ, cekAngka) {
  for(let j = 0; j < array.length; j++){
    if(array[posI][j] == cekAngka){
      return false
    }
  }
  return true;
}

function cekBawah(array, posI, posJ, cekAngka) {
  for(let i = 0; i < array.length; i++){
    if(array[i][posJ] == cekAngka){
      return false
    }
  }
  return true;
}

function cekKotak(array, posI, posJ, cekAngka){
  for(let i = Math.floor(posI/3)*3; i < (Math.floor(posI/3)*3)+3; i++){
    for(let j = Math.floor(posJ/3)*3; j < (Math.floor(posJ/3)*3)+3; j++){
      if(array[i][j] == cekAngka){
        return false;
      }
    }
  }
  return true;
}

for(let i = 1; i <= 9; i++){
  console.log(cekKanan(arr, 0, 6, `${i}`));
  console.log(cekBawah(arr, 0, 6, `${i}`));
  console.log(cekKotak(arr, 0, 6, `${i}`));
  console.log(i);
  
}