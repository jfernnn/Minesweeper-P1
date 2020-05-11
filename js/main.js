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
/*----- event listeners -----*/ 
document.getElementById('gameBoard').addEventListener('click', handleClick);
document.querySelector('button').addEventListener('click', resetBtn)
let gameBoardEl = document.getElementById('gameBoard');


init();
$('#gameBoard').one('click', function(e) {
    placeMines();
    render();
    interval = setInterval(formatTime, 1000);
})

// if(interval === null) {
//     document.getElementById('gameBoard').addEventListener('click', function() {
//         placeMines();
//         interval = setInterval(formatTime, 1000);
//     });
// }


/*----- functions -----*/

function init() {
    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++) {
            let newDiv = document.createElement('div');
            newDiv.id = `c${j}r${i}`;
            newDiv.style.border = '1px solid';
            newDiv.style.fontSize = '28px';
            gameBoardEl.appendChild(newDiv);

        }
    }
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
        if(board[c-1][r] !== -1) board[c-1][r]++;
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
    // for(let i = -1; i <= 1; i++) {
    //     if(board[c + i][r] !== -1) board[c + 1][r]++;

    // }
}

function revealBoard(c, r) {
    //if(board[c][r] === -1) alert('You lose');
    if(board[c][r] === 0) {
        revealEmpty(c, r);
        revealBoard(c-1, r-1);
        revealBoard(c-1, r);
        revealBoard(c-1, r+1);
        revealBoard(c, r-1);
        revealBoard(c, r1);
        revealBoard(c, r+1);
        revealBoard(c+1, r-1);
        revealBoard(c+1, r1);
        revealBoard(c+1, r+1);

    }
    if(board[c][r] === 1) {
        document.getElementById(`c${c}r${r}`).innerText = board[c][r];
    }
    if(board[c][r] === 2) {
        document.getElementById(`c${c}r${r}`).innerText = board[c][r];
    }
    if(board[c][r] === 3) {
        document.getElementById(`c${c}r${r}`).innerText = board[c][r];
    }
    
}

function revealEmpty(c, r) {
    document.getElementById(`c${c}r${r}`).style.backgroundColor = 'black';
    document.getElementById(`c${c}r${r}`).style.borderColor = '#cceef6';
}

function handleClick(e) {
    var col = (e.target.id).charAt(1);
    var row = (e.target.id).charAt(3);
    if(e.target.innerText != '*'){
        document.getElementById('minesLeft').innerText = `${parseInt(document.getElementById('minesLeft').innerText) - 1}`
    }
    revealBoard(col, row);
}

function resetBtn() {
    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++){
            document.getElementById(`c${i}r${j}`).innerText = '';
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