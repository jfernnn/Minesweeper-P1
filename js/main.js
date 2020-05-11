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

/*----- cached element references -----*/ 
/*----- event listeners -----*/ 
document.getElementById('gameBoard').addEventListener('click', handleClick);
document.querySelector('button').addEventListener('click', resetBtn)

if(interval === null) {
    document.getElementById('gameBoard').addEventListener('click', function() {
        interval = setInterval(formatTime, 1000);
    });
}


/*----- functions -----*/





init();

function init() {
    board = [
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null]
    ];

    render();
}

function render() {

}

function handleClick(e) {
    if(e.target.innerText != '*'){
        e.target.innerText = '*';
        document.getElementById('minesLeft').innerText = `${parseInt(document.getElementById('minesLeft').innerText) - 1}`
    }
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