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

let firstClick = true;
let counter = 0;

/*----- cached element references -----*/ 
let gameBoardEl = document.getElementById('gameBoard');


/*----- event listeners -----*/ 
$('#gameBoard').one('click', function(e) {
    firstClick = false;
    placeMines(e);
    findEmptySpaces();
    interval = setInterval(formatTime, 1000);
})

document.getElementById('gameBoard').addEventListener('click', handleClick);
document.getElementById('gameBoard').addEventListener('contextmenu', handler);

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
            newDiv.style.fontStlye = 'cursive';
            //newDiv.style.gap = '1px';
            gameBoardEl.appendChild(newDiv);
        }
    }
    //Initializes the board with objects
    board = [];
    for(let i = 0; i < 9; i++) {
        board[i] = [];
    }
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++) {
            board[j][i] = {
                pos: `c${j}r${i}`,
                isMine: false,
                revealed: false,
                surroundsMines: 0,
                isEmpty: false,
            }
        }
    }
    console.log(board);
}

function render(c, r) {

    let squareEl = document.getElementById(`c${c}r${r}`);

    if(board[c][r].isMine === true) {
        let bombImg = document.createElement('img');
        bombImg.src = 'images/bomb.png';
        bombImg.style.width = '15px';
        bombImg.style.height = '15px';
        squareEl.append(bombImg);
    } else {
        board[c][r].revealed = true;

        squareEl.style.backgroundColor = '#c9c1ad';
        if(board[c][r].isEmpty) {
            revealNearbyEmpties(c, r);
        }
        else {
            
            squareEl.style.backgroundColor = '#c9c1ad';
            squareEl.style.borderRightColor = 'black';
            squareEl.style.borderBottomColor = 'black';

            squareEl.innerText = board[c][r].surroundsMines;

            if(board[c][r].surroundsMines === 1) {
                squareEl.style.color = 'red';
            }
            if(board[c][r].surroundsMines === 2) {
                squareEl.style.color = 'blue';
            }
            if(board[c][r].surroundsMines === 3) {
                squareEl.style.color = 'green';
            }
            if(board[c][r].surroundsMines === 4){
                squareEl.style.color = 'purple';
            }
        }
    } 
}

function checkWinner(){
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            if (!(board[i][j].isMine)&&!(board[i][j].revealed)) {
                return;
            }
        }
    }
    clearInterval(interval);
    document.querySelector('h3').innerText = 'Look at you';
}


function placeMines(e) {
    //Randomly places 10 mines throughout the board
    var col = (e.target.id).charAt(1);
    var row = (e.target.id).charAt(3);
    let mines1to10 = 1;
    let r = 0;
    let c = 0;
    while(mines1to10 <= 10) {
        r = Math.floor(Math.random() * 9);
        c = Math.floor(Math.random() * 9);
        if((!board[c][r].isMine)&&(board[col][row] !== board[c][r])) {
            
            board[c][r].isMine = true;
            asignNumbers(c, r);
            mines1to10++;
        }

    }
}

function findEmptySpaces() {
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            if(board[i][j].surroundsMines === 0) {
                if(board[i][j].isMine === false) {
                    board[i][j].isEmpty = true;
                }
            }
        }
    }
}

function asignNumbers(c, r) {
    //Asigns the numbers surrounding mines
    //All end cases are checked

    for(var i = -1; i <= 1; i++) {
        for(var j = -1; j <= 1; j++) {
            if(!(c + i < 0)&&!(c + i > 8)){
                if(!(r + j < 0)&&!(r + j > 8)){
                    if((c+i!==0)||(r+j!==0)){
                        board[c+i][j+r].surroundsMines++;
                    }
                }
            }
        }
    }
 }


function revealNearbyEmpties(c, r) {
    for(var i = -1; i <= 1; i++) {
        for(var j = -1; j <= 1; j++) {
            var zz = 0;
            var yy = 0;
            zz = parseInt(c) + i;
            yy = parseInt(r) + j;
            if(!(zz < 0)&&!(zz > 8)){
                if(!(yy < 0)&&!(yy > 8)){
                    if((zz!==c)||(yy!==r)){
                        if(board[zz][yy].revealed === false){
                            if(board[zz][yy].isMine === false){
                                render(zz,yy);
                                
                            }
                        }
                    }
                }
            }
        }
    }
}


//Handles when someone right clicks
function handler(e) {
    e.preventDefault();
    switch(e.button){
        case 0: handleRghtClick(e); break;
        
        case 2: handleClick(e); break;
    }
}

function handleClick(e) {
    var col = (e.target.id).charAt(1);
    var row = (e.target.id).charAt(3);
    if(e.target.innerText !== '*'){
        if(board[col][row].isMine) {
            for(let i = 0; i < 9; i++){
                for(let j = 0; j < 9; j++){
                    render(i, j);
                }
            }
            document.querySelector('h3').style.marginLeft = '0px';
            document.querySelector('h3').innerText = 'Did you expect any better?';     
        } else {
        render(col, row);
        checkWinner();
        }
    }
}

function handleRghtClick(e) {
    var col = (e.target.id).charAt(1);
    var row = (e.target.id).charAt(3);

    if(!board[col][row].revealed){
        if((e.target.innerText !== '*') && (parseInt(document.getElementById('minesLeft').innerText) > 0)){
            e.target.innerText = '*';

            document.getElementById('minesLeft').innerText = `${parseInt(document.getElementById('minesLeft').innerText) - 1}`;
        } else if(e.target.innerText === '*') {
            e.target.innerText = '';

            document.getElementById('minesLeft').innerText = `${parseInt(document.getElementById('minesLeft').innerText) + 1}`;
        }
    }
    checkWinner();
}

function resetBtn() {
    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++){
            board[i][j].surroundsMines = 0;
            board[i][j].isMine = false;
            board[i][j].revealed = false;

            document.getElementById(`c${i}r${j}`).innerText = '';
            document.getElementById(`c${i}r${j}`).style.backgroundColor = '#918c7e';
            //document.getElementById(`c${i}r${j}`).style.borderColor = 'black';
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