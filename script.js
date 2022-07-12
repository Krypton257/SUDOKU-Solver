var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}


var board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board)
	}
	xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=hard')
	//we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	xhrRequest.send()
}

SolvePuzzle.onclick = () => {
	sudokusolver(board, 0, 0, 9);
};

function isvalid(board,i,j,num,n){
	// row check
	for(let x=0;x<n;x++){
	  if(board[i][x]==num){
		return false;
	  }
	}
  
	// column check
	for(let x=0;x<n;x++){
	  if(board[x][j]==num){
		return false;
	  }
	}
  
	// submatrix check
	let rn = Math.sqrt(n);
	let si = i - i%rn;
	let sj = j - j%rn;
  
	for(let x=si;x<si+rn;x++){
	  for(let y=sj;y<sj+rn;y++){
		if(board[x][y]==num){
		  return false;
		}
	  }
	}
  
	return true;
  }

function sudokusolver(board,i,j,n){
  // base case
  if(i==n){
    // printboard(board,n);
	FillBoard(board)
    return true;
  }

  //checking if we are going out of board
  if(j==n){
    return sudokusolver(board,i+1,0,n);
  }

  // already filled cells
  if(board[i][j]!=0){
    return sudokusolver(board,i,j+1,n);
  }

  // filling numbers

  for(let num=1;num<=9;num++){
    // checking if num is valid at this position
    if(isvalid(board,i,j,num,n)){
      board[i][j] = num;

      // recursive call to nxt
      let subans = sudokusolver(board,i,j+1,n);
      if(subans){
        return true;
      }

      // backtracking
      board[i][j] = 0;
    }
  }

  return false;
}


