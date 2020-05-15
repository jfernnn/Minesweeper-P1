/*----- constants -----*/ 
const boardSize = {
    's': 9,
    'l': 16
}

const numMines = {
    's': 10,
    'l': 40,
}

/*----- app's state (variables) -----*/ 
let board;
let seconds = 0;
let interval = null;
let size;
let newGame = true;
let gameOver = false;

/*----- cached element references -----*/ 
let gameBoardEl = document.getElementById('gameBoard');
let h3El = document.querySelector('h3');
let minesLeftEl = document.getElementById('minesLeft');
let timerEl = document.getElementById('timer');
let easyDifEl = document.getElementById('s');
let hardDifEl = document.getElementById('l');
let buttonsEl = document.getElementById('buttons');

/*----- event listeners -----*/ 
gameBoardEl.addEventListener('click', handleClick);
gameBoardEl.addEventListener('contextmenu', handler);
easyDifEl.addEventListener('click', init);
hardDifEl.addEventListener('click', init);
document.getElementById('reset').addEventListener('click', resetBtn);

/*----- functions -----*/

//Create the divs/the board dynamically
function init(e) {
    size = e.target.id;
    gameOver = false;

    styleGameBoard(size);
    createGameBoardDivs(size);
    createGameBoardArray(size);
}

//Dynamically styles the game board depending on the difficulty chosen
function styleGameBoard(size) {
    buttonsEl.style.display = 'none';
    gameBoardEl.innerHTML = '';

    gameBoardEl.style.backgroundColor = '#918c7e';
    gameBoardEl.style.border = '2px solid black';
    gameBoardEl.style.display = 'grid';
    gameBoardEl.style.marginTop = '38px';
    gameBoardEl.style.textAlign = 'center';
    gameBoardEl.style.justifyContent = 'center';
    gameBoardEl.style.margin = '30px auto';

    if(size === 's'){
        gameBoardEl.style.width = '246px';
        gameBoardEl.style.gridTemplateColumns = 'repeat(9, 27px)';
        gameBoardEl.style.gridTemplateRows = 'repeat(9, 27px)';
        h3El.innerText = '...you got it';
    }
    if(size === 'l'){
        gameBoardEl.style.width = '435px';
        gameBoardEl.style.gridTemplateColumns = 'repeat(16, 27px)';
        gameBoardEl.style.gridTemplateRows = 'repeat(16, 27px)';
        h3El.innerText = `...you're gonna need it`
    }
    minesLeftEl.innerText = numMines[size];
    timerEl.innerText = `00:00`;
}

//Creates the board elements on the dom
function createGameBoardDivs(size) {
    for(let i = 0; i < boardSize[size]; i++) {
        for(let j = 0; j < boardSize[size]; j++) {
            let newDiv = document.createElement('div');
            newDiv.id = `c${j}r${i}`;

            newDiv.style.border = '1px solid';
            newDiv.style.borderTopColor = 'white';
            newDiv.style.borderLeftColor = 'white';
            newDiv.style.fontSize = '24px';

            gameBoardEl.appendChild(newDiv);
        }
    }
}

//Creates the board elements in a 2D array of objects
function createGameBoardArray(size) {
    board = [];
    for(let i = 0; i < boardSize[size]; i++) {
        board[i] = [];
    }
    for(let i = 0; i < boardSize[size]; i++){
        for(let j = 0; j < boardSize[size]; j++) {
            board[i][j] = {
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
    //Grabs the div of the square on the board
    let squareEl = document.getElementById(`c${c}r${r}`);

    //Renders the squares with bombs if they have mines
    if(board[c][r].isMine) {
        if(board[c][r].hasFlag) {
            squareEl.removeChild(document.getElementById(`c${c}r${r}img`));
        }
        gameOver = true;
        let bombImg = document.createElement('img');

        bombImg.src = 'images/bomb.png';
        bombImg.style.width = '15px';
        bombImg.style.height = '15px';

        squareEl.append(bombImg);
    } else {
        board[c][r].revealed = true;

        squareEl.style.backgroundColor = '#c9c1ad';
        //Reveals the nearby squares if the square selected is empty
        if(board[c][r].isEmpty) {
            revealNearbyEmpties(c, r);
        }
        else {
            //Styles the numbers and squares after they are revealed
            styleNumbers(squareEl, c, r);
        }
    } 
}

//Styles each square depending on how many mines surround it
function styleNumbers(squareEl, c, r) {
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

//If all the squares that are not mines are revealed, the player wins
function checkWinner(){
    for(let i = 0; i < boardSize[size]; i++){
        for(let j = 0; j < boardSize[size]; j++){
            if (!(board[i][j].isMine)&&!(board[i][j].revealed)) {
                return;
            }
        }
    }
    gameOver = true;
    clearInterval(interval);
    h3El.innerText = 'You Won!!';
}


function placeMines(e) {
    //Randomly places mines throughout the board
    let idOfEl = e.target.id;
    
    //finds the row and column of the div from the elements id
    const ind = (idOfEl).indexOf('r');
    let col = parseInt((idOfEl).substring(1, ind));
    let row = parseInt((idOfEl).substring(ind+1, (idOfEl).length));

    let mines1to10 = 1;
    let r = 0;
    let c = 0;

    while(mines1to10 <= numMines[size]) {
        //finds 2 random numbers to find a random board slot
        r = Math.floor(Math.random() * boardSize[size]);
        c = Math.floor(Math.random() * boardSize[size]);

        //puts a mine on the random spot and calls asignNumbers
        if((!board[c][r].isMine)&&(board[col][row] !== board[c][r])) {
            board[c][r].isMine = true;
            asignNumbers(c, r);
            mines1to10++;
        }

    }
}

//Finds all empty spaces on the board and marks them
//All end cases are checked
function findEmptySpaces() {
    for(let i = 0; i < boardSize[size]; i++){
        for(let j = 0; j < boardSize[size]; j++){
            if(board[i][j].surroundsMines === 0) {
                if(board[i][j].isMine === false) {
                    board[i][j].isEmpty = true;
                }
            }
        }
    }
}

//Asigns the numbers surrounding mines
//All end cases are checked
function asignNumbers(c, r) {
    for(let i = -1; i <= 1; i++) {
        for(let j = -1; j <= 1; j++) {
            if(!(c + i < 0)&&!(c + i > boardSize[size] - 1)){
                if(!(r + j < 0)&&!(r + j > boardSize[size] - 1)){
                    board[c+i][j+r].surroundsMines++;
                }
            }
        }
    }
 }

//Marks and reveals nearby spaces on the board that are empty
//Checks all end cases
function revealNearbyEmpties(c, r) {
    var col = 0;
    var row = 0;
    for(let i = -1; i <= 1; i++) {
        for(let j = -1; j <= 1; j++) {
            col = parseInt(c) + i;
            row = parseInt(r) + j;
            if(!(col < 0)&&!(col > boardSize[size] - 1)){
                if(!(row < 0)&&!(row > boardSize[size] - 1)){
                    if((col!==c)||(row!==r)){
                        if(board[col][row].revealed === false){
                            if(board[col][row].isMine === false){
                                render(col,row);
                                
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
    //Sets the idEl with the id of e and finds the row and column of the square selected
    let idEl = e.target.id;
    const ind = (idEl).indexOf('r');
    let col = parseInt((idEl).substring(1, ind));
    let row = parseInt((idEl).substring(ind+1, (idEl).length));

    //creates the board if it is the first click on the board 
    if(newGame) {
        newGame = false;
        //Places mines and finds all empty spaces
        placeMines(e);
        findEmptySpaces();
        //Initializes the timer
        interval = setInterval(formatTime, 1000);
    }
    //finds the row and column of the div from the elements id

    //Handles the click; if they click a mine, the games over. If not, the board renders;
    if((!((board[col][row]).hasFlag))&&(!gameOver)){
        if(board[col][row].isMine) {
            for(let i = 0; i < boardSize[size]; i++){
                for(let j = 0; j < boardSize[size]; j++){
                    render(i, j);
                }
            }
            clearInterval(interval);
            h3El.innerText = 'Did you really think you could win?';     
        } else {
            render(col, row);
            checkWinner();
        }
    }
}

function handleRghtClick(e) {
    //finds the row and column of the div from the elements id
    const ind = (e.target.id).indexOf('r');
    let col = parseInt((e.target.id).substring(1, ind));
    let row = parseInt((e.target.id).substring(ind+1, (e.target.id).length));

    let squareEl = document.getElementById(`c${col}r${row}`);

    //If the square does not have a flag, place a flag
    //Otherwise, remove the flag that's already there
    if((!board[col][row].revealed)&&(!gameOver)){
        if(!(board[col][row].hasFlag) && (parseInt(minesLeftEl.innerText) > 0)){

            let flagImg = document.createElement('img');
            flagImg.src = 'images/flag.png';
            flagImg.style.width = '15px';
            flagImg.style.height = '15px';
            flagImg.id = `c${col}r${row}img`;

            board[col][row].hasFlag = true;
            
            squareEl.append(flagImg);

            minesLeftEl.innerText = `${parseInt(minesLeftEl.innerText) - 1}`;
        } else  {
            board[col][row].hasFlag = false
            squareEl.removeChild(document.getElementById(`c${col}r${row}img`));

            minesLeftEl.innerText = `${parseInt(minesLeftEl.innerText) + 1}`;
        }
    }
}

//Handles reseting the game, including clearing the timer, clearing the board, 
// reappearing the difficulty buttons, gets ready for a new game
function resetBtn() {
    clearInterval(interval);
    seconds = 0;
    gameBoardEl.innerHTML = '';
    gameBoardEl.removeAttribute('style');
    buttonsEl.style.display = 'flex';
    h3El.innerText = 'Good Luck...';
    minesLeftEl.innerText = '0';
    timerEl.innerText = `00:00`;
    newGame = true;
}

//Formats the timer to display in the 00:00 format
function formatTime() {
    seconds++;
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    timerEl.innerText = `${mins}:${secs}`;
}