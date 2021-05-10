const divfields = document.querySelectorAll('.field')
const datafield = document.querySelectorAll('[data-field]')
const turntext = document.querySelector('.whoseturn')
const endgame = document.querySelector('.endgame')
const playagain = document.querySelector('.play-again')
const endtext = document.querySelector('.end-text')
const vsPlayer2 = document.querySelector('#vsPlayer2')
const selection = document.querySelector('.selection')
const lastfield = document.querySelector('#last-field')

divfields.forEach(field => {
    field.addEventListener('click', clickHandler, { once: true })
})

playagain.addEventListener('click', startGame);
vsPlayer2.addEventListener('click', () => {
    selection.style.transitionDuration = "0.5s";
    selection.style.transform = "scale(0)";
    turntext.style.transform = "scale(1)";
    let fieldanimationdelay = 1;
    for (let i=0; i<datafield.length; i++) {
        datafield[i].style.transitionDelay = `${fieldanimationdelay}s`;
        datafield[i].style.transform = "scale(1)";
        fieldanimationdelay += 0.15;
        }
    //reset animation delay using transitionend event
    lastfield.ontransitionend = () => {
        for (let i=0; i<datafield.length; i++) {
            datafield[i].style.transitionDelay = `0s`
        }
    };
    startGame();
})

let player2Turn;
let winner;

function startGame() {
    endgame.style.display = "none";
    player2Turn = false;
    divfields.forEach(field => {
        field.textContent = null
        field.style.pointerEvents = "all";
        field.removeEventListener('click', clickHandler)
        field.addEventListener('click', clickHandler, { once: true })
    })
    turntext.textContent = "P1's Turn"
}

function clickHandler(e) {
    //for mark
    let currentmark = "X";
    if (player2Turn) {
        currentmark = "O"
    } else {
        currentmark = "X"
    }
    e.target.textContent = `${currentmark}`

    //win condition checker
    if (win(currentmark)) {
        divfields.forEach(field => {
            field.style.pointerEvents = "none";
        })
        endgame.style.display = "flex";
        endtext.textContent = `${winner} wins!`
    }
    //draw condition checker
    else if (draw()) {
        divfields.forEach(field => {
            field.style.pointerEvents = "none";
        })
        endgame.style.display = "flex"; 
        endtext.textContent = "It's a draw!"
    }
    //switch marks
    switchplayers();
}

function switchplayers() {
    player2Turn = !player2Turn;
    if (player2Turn) { 
        turntext.textContent = "P2's Turn"
        winner = "Player 2"
    } else if (!player2Turn) {
        turntext.textContent = "P1's Turn"
        winner = "Player 1"
    }
}

const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function win(currentmark) {
    return winCombinations.some(combination => {
        return combination.every(index => {
            return datafield[index].textContent.includes(currentmark)
        })
    })
}

function draw() {
    return [...datafield].every(field => {
        return field.textContent.includes("X") || field.textContent.includes("O");
    })
}

