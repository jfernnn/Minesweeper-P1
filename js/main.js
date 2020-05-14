/*----- constants -----*/ 
const boardSize = {
    's': [9, 9],
    'm': [16, 16],
    'l': [16, 30],
}

const numMines = {
    's': 10,
    'm': 40,
    'l': 99
}

/*----- app's state (variables) -----*/ 
let board;
let seconds = 0;
let interval = null;
let size;

let newGame = true;
let counter = 0;

/*----- cached element references -----*/ 
let gameBoardEl = document.getElementById('gameBoard');


/*----- event listeners -----*/ 
document.getElementById('gameBoard').addEventListener('click', handleClick);
document.getElementById('gameBoard').addEventListener('contextmenu', handler);
document.getElementById('buttons').addEventListener('click', init)

document.querySelector('button').addEventListener('click', resetBtn);

/*----- functions -----*/


function init(e) {
    //Create the divs/the board dynamically
    size = e.target.id;
    //let small = document.createElement('button');
    document.getElementById('buttons').style.display = 'none';
    gameBoardEl.style.backgroundColor = '#918c7e';
    gameBoardEl.style.border = '2px solid black';
    gameBoardEl.style.display = 'grid';
    gameBoardEl.style.marginTop = '38px';
    gameBoardEl.style.textAlign = 'center';
    if(size === 's'){
        gameBoardEl.style.width = '246px';
        gameBoardEl.style.gridTemplateColumns = 'repeat(9, 27px)';
        gameBoardEl.style.gridTemplateRows = 'repeat(9, 27px)';
    }
    if(size === 'm'){
        gameBoardEl.style.width = '435px';
        gameBoardEl.style.gridTemplateColumns = 'repeat(16, 27px)';
        gameBoardEl.style.gridTemplateRows = 'repeat(16, 27px)';
    }
    if(size === 'l'){
        gameBoardEl.style.width = '814px';
        gameBoardEl.style.gridTemplateColumns = 'repeat(30, 27px)';
        gameBoardEl.style.gridTemplateRows = 'repeat(16, 27px)';
    }
    gameBoardEl.innerHTML = '';

    document.querySelector('h3').style.marginLeft = '68px';
    document.querySelector('h3').innerText = 'Good Luck...';
    document.getElementById('minesLeft').innerText = numMines[size];
    document.getElementById('timer').innerText = `00:00`;

    for(let i = 0; i < boardSize[size][0]; i++) {
        for(let j = 0; j < boardSize[size][1]; j++) {
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
    for(let i = 0; i < boardSize[size][0]; i++) {
        board[i] = [];
    }
    for(let i = 0; i < boardSize[size][0]; i++){
        for(let j = 0; j < boardSize[size][1]; j++) {
            board[j][i] = {
                pos: `c${j}r${i}`,
                isMine: false,
                revealed: false,
                surroundsMines: 0,
                isEmpty: false,
                hasFlag: false
            }
        }
    }
}


function render(c, r) {

    let squareEl = document.getElementById(`c${c}r${r}`);

    if(board[c][r].isMine === true) {
        if(board[c][r].hasFlag) {
            document.getElementById(`c${c}r${r}`).removeChild(document.getElementById(`c${c}r${r}img`));
        }
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
            if(board[c][r].surroundsMines === 5){
                squareEl.style.color = 'orange';
            }
        }
    } 
}

function checkWinner(){
    for(let i = 0; i < boardSize[size][1]; i++){
        for(let j = 0; j < boardSize[size][0]; j++){
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
    console.log('asdfadf');
    let idOfEl = e.target.id;
    
    const ind2 = (e.target.id).indexOf('r');
    console.log(ind2);
    var col = parseInt((e.target.id).substring(1, ind2));
    console.log(col);
    var row = parseInt((e.target.id).substring(ind2+1, (e.target.id).length));
    console.log(row);
    let mines1to10 = 1;
    let r = 0;
    let c = 0;
    while(mines1to10 <= numMines[size]) {
        r = Math.floor(Math.random() * boardSize[size][0]);
        c = Math.floor(Math.random() * boardSize[size][1]);
        if((!board[c][r].isMine)&&(board[col][row] !== board[c][r])) {
            
            board[c][r].isMine = true;
            asignNumbers(c, r);
            mines1to10++;
        }

    }
}

function findEmptySpaces() {
    for(let i = 0; i < boardSize[size][1]; i++){
        for(let j = 0; j < boardSize[size][0]; j++){
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
            if(!(c + i < 0)&&!(c + i > boardSize[size][1] - 1)){
                if(!(r + j < 0)&&!(r + j > boardSize[size][0] - 1)){
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
            if(!(zz < 0)&&!(zz > boardSize[size][1] - 1)){
                if(!(yy < 0)&&!(yy > boardSize[size][0] - 1)){
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
    if(newGame) {
        newGame = false;
        placeMines(e);
        findEmptySpaces();
        interval = setInterval(formatTime, 1000);
    }
    const ind2 = (e.target.id).indexOf('r');
    var col = parseInt((e.target.id).substring(1, ind2));
    var row = parseInt((e.target.id).substring(ind2+1, (e.target.id).length));

    //if(e.target.innerText !== '*'){
        if(board[col][row].isMine) {
            for(let i = 0; i < boardSize[size][1]; i++){
                for(let j = 0; j < boardSize[size][0]; j++){
                    render(i, j);
                }
            }
            clearInterval(interval);
            document.querySelector('h3').style.marginLeft = '-20px';
            document.querySelector('h3').innerText = 'Did you expect any better?';     
        } else {
        render(col, row);
        checkWinner();
        }
    //}
}

function handleRghtClick(e) {
    const ind2 = (e.target.id).indexOf('r');
    var col = parseInt((e.target.id).substring(1, ind2));
    var row = parseInt((e.target.id).substring(ind2+1, (e.target.id).length));

    let squareEl = document.getElementById(`c${col}r${row}`);

    if(!board[col][row].revealed){
        if(!(board[col][row].hasFlag) && (parseInt(document.getElementById('minesLeft').innerText) > 0)){

            let flagImg = document.createElement('img');
            flagImg.src = 'images/flag.png';
            flagImg.style.width = '15px';
            flagImg.style.height = '15px';
            flagImg.id = `c${col}r${row}img`;

            board[col][row].hasFlag = true;
            
            squareEl.append(flagImg);
            //squareEl.innerText = '*';

            document.getElementById('minesLeft').innerText = `${parseInt(document.getElementById('minesLeft').innerText) - 1}`;
        } else  {
            board[col][row].hasFlag = false
            squareEl.removeChild(document.getElementById(`c${col}r${row}img`));
            //squareEl.innerText = '';

            document.getElementById('minesLeft').innerText = `${parseInt(document.getElementById('minesLeft').innerText) + 1}`;
        }
    }
    checkWinner();
}

function resetBtn() {
    interval = null;
    seconds = 0;
    gameBoardEl.innerHTML = '';
    $('#gameBoard').removeAttr('style');
    document.getElementById('buttons').style.display = 'block';

    newGame = true;


    //Clears and resets the timer so that it will
    // restart properly
}


function formatTime() {
    seconds++;
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    document.getElementById('timer').innerText = `${mins}:${secs}`;
}