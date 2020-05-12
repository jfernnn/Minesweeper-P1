/*----- constants -----*/ 
const spaceLookUp = {
    '-1': 'mine',    
    '0': 'empty',
    '1': 'one',
    '2': ''
};

/*----- app's state (variables) -----*/ 
let board;
let seconds = 0;
let interval = null;
let r = 0;
let c = 0;
let num1to10 = 1;

/*----- cached element references -----*/ 
let gameBoardEl = document.getElementById('gameBoard');


/*----- event listeners -----*/ 
$('#gameBoard').one('click', function(e) {
    placeMines();
    render();
    interval = setInterval(formatTime, 1000);
})

document.getElementById('gameBoard').addEventListener('click', handleClick);
document.getElementById('gameBoard').addEventListener('dblclick', handleDblClick);

document.querySelector('button').addEventListener('click', resetBtn);

/*----- functions -----*/

init();

function init() {
    //Create the divs/the board dynamically
    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++) {
            let newDiv = document.createElement('div');
            newDiv.id = `c${j}r${i}`;
            newDiv.style.border = '1px solid';
            newDiv.style.borderTopColor = 'white';
            newDiv.style.borderLeftColor = 'white';
            newDiv.style.fontSize = '24px';
            newDiv.style.fontStlye = 'cursive'
            gameBoardEl.appendChild(newDiv);

        }
    }
    //Initializes the board array to 0
    board = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    console.log(board);
    render();
}

function render() {
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            // if(board[i][j] === 1){
            // document.getElementById(`c${i}r${j}`).innerText = board[i][j];
            // }
        }
    }
}

function placeMines() {
    //Randomly places 10 mines throughout the board
    while(num1to10 <= 10) {
        r = Math.floor(Math.random() * 9);
        c = Math.floor(Math.random() * 9);
        if(board[c][r] !== -1) {
            
            board[c][r] = -1;
            asignNumbers(c, r);
            num1to10++;
        }
    }
    console.log(board);
}

function asignNumbers(c, r) {
    //Asigns the numbers surrounding mines
    //All end cases are checked
    if((c===8)&&(r===8)){
        if(board[c-1][r-1] !== -1) board[c-1][r-1]++;
        if(board[c-1][r] !== -1) board[c-1][r]++;
        if(board[c][r-1] !== -1) board[c][r-1]++;
    }
    else if((c===0)&&(r===0)){
        if(board[c+1][r+1] !== -1) board[c+1][r+1]++;
        if(board[c+1][r] !== -1) board[c+1][r]++;
        if(board[c][r+1] !== -1) board[c][r+1]++;
    }
    else if((c===0)&&(r===8)){
        if(board[c+1][r-1] !== -1) board[c+1][r-1]++;
        if(board[c+1][r] !== -1) board[c+1][r]++;
        if(board[c][r-1] !== -1) board[c][r-1]++;
    }
    else if((c===8)&&(r===0)){
        if(board[c-1][r] !== -1) board[c-1][r]++;
        if(board[c-1][r+1] !== -1) board[c-1][r+1]++;
        if(board[c][r+1] !== -1) board[c][r+1]++;
    }
    else if(c===8){
        if(board[c-1][r-1] !== -1) board[c-1][r-1]++;
        if(board[c-1][r] !== -1) board[c-1][r]++;
        if(board[c-1][r+1] !== -1) board[c-1][r+1]++;
        if(board[c][r-1] !== -1) board[c][r-1]++;
        if(board[c][r+1] !== -1) board[c][r+1]++;
    }
    else if(r===8){
        if(board[c-1][r-1] !== -1) board[c-1][r-1]++;
        if(board[c-1][r] !== -1) board[c-1][r]++;
        if(board[c][r-1] !== -1) board[c][r-1]++;
        if(board[c+1][r-1] !== -1) board[c+1][r-1]++;
        if(board[c+1][r] !== -1) board[c+1][r]++;   
    }
    else if(c===0){
        if(board[c][r-1] !== -1) board[c][r-1]++;
        if(board[c][r+1] !== -1) board[c][r+1]++;
        if(board[c+1][r-1] !== -1) board[c+1][r-1]++;
        if(board[c+1][r] !== -1) board[c+1][r]++;
        if(board[c+1][r+1] !== -1) board[c+1][r+1]++;
    }
    else if(r===0){
        if(board[c-1][r+1] !== -1) board[c-1][r+1]++;
        if(board[c-1][r] !== -1) board[c-1][r]++;
        if(board[c][r+1] !== -1) board[c][r+1]++;
        if(board[c+1][r+1] !== -1) board[c+1][r+1]++;
        if(board[c+1][r] !== -1) board[c+1][r]++;  
    }
    else{
        if(board[c-1][r-1] !== -1) board[c-1][r-1]++;
        if(board[c-1][r] !== -1) board[c-1][r]++;
        if(board[c-1][r+1] !== -1) board[c-1][r+1]++;
        if(board[c][r-1] !== -1) board[c][r-1]++;
        if(board[c][r+1] !== -1) board[c][r+1]++;
        if(board[c+1][r-1] !== -1) board[c+1][r-1]++;
        if(board[c+1][r] !== -1) board[c+1][r]++;
        if(board[c+1][r+1] !== -1) board[c+1][r+1]++;
    }
}

function revealBoard(c, r) {
    //if(board[c][r] === -1) alert('You lose');
    if(board[c][r] === -1) {
        document.getElementById(`c${c}r${r}`).innerText = '@';
    } else {
        document.getElementById(`c${c}r${r}`).style.backgroundColor = '#c9c1ad';
        document.getElementById(`c${c}r${r}`).style.borderBottomColor = 'black';
        document.getElementById(`c${c}r${r}`).style.borderRIghtColor = 'black';
        document.getElementById(`c${c}r${r}`).style.borderTopColor = 'white';
        document.getElementById(`c${c}r${r}`).style.borderLeftColor = 'white';
        if(board[c][r] === 0) {
        
        } else {
            document.getElementById(`c${c}r${r}`).style.backgroundColor = '#c9c1ad';
            if(board[c][r] === 1) {
                document.getElementById(`c${c}r${r}`).style.color = 'red';
            }
            if(board[c][r] === 2) {
                document.getElementById(`c${c}r${r}`).style.color = 'blue';
            }
            if(board[c][r] === 3) {
                document.getElementById(`c${c}r${r}`).style.color = 'green';
            }
            if(board[c][r] === 4){
                document.getElementById(`c${c}r${r}`).style.color = 'purple';
            }
            document.getElementById(`c${c}r${r}`).style.borderRightColor = 'black';
            document.getElementById(`c${c}r${r}`).innerText = board[c][r];
        }
    }   
}

function handleClick(e) {
    var col = (e.target.id).charAt(1);
    var row = (e.target.id).charAt(3);
    revealBoard(col, row);
}

function handleDblClick(e) {
    e.target.innerText = '*';
    document.getElementById('minesLeft').innerText = `${parseInt(document.getElementById('minesLeft').innerText) - 1}`;
}

function resetBtn() {
    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++){
            board[i][j] = 0;
            document.getElementById(`c${i}r${j}`).innerText = '';
            document.getElementById(`c${i}r${j}`).style.backgroundColor = '#918c7e';
            document.getElementById(`c${i}r${j}`).style.borderColor = 'black';
        }
    }
    document.getElementById('minesLeft').innerText = '10';
    //Clears and resets the timer so that it will
    // restart properly
    clearInterval(interval);
    interval = null;
    seconds = 0;
    document.getElementById('timer').innerText = `00:00`;
}


function formatTime() {
    seconds++;
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    document.getElementById('timer').innerText = `${mins}:${secs}`;
}