const divfields = document.querySelectorAll('.field')
const datafield = document.querySelectorAll('[data-field]')
const turntext = document.querySelector('.whoseturn')

divfields.forEach(field => {
    field.addEventListener('click', clickHandler, { once: true })
})

let player2Turn;

function startGame() {
    player2Turn = false;
    divfields.forEach(field => {
        field.textContent = null;
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

    //switch marks
    switchplayers();

    //win condition checker
    if (win(currentmark)) {
        divfields.forEach(field => {
            field.style.pointerEvents = "none";
        })
        
    }
    //draw condition checker
    else if (draw()) {
        
    }
    //restart
}

function switchplayers() {
    player2Turn = !player2Turn;
    if (player2Turn) { 
        turntext.textContent = "P2's Turn"
    } else if (!player2Turn) {
        turntext.textContent = "P1's Turn"
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

