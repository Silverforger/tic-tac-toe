const divfields = document.querySelectorAll('.field')
const datafield = document.querySelectorAll('[data-field]')

divfields.forEach(field => {
    field.addEventListener('click', clickHandler, { once: true })
})

let player2Turn;

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
        
    }

    //draw condition checker
    if (draw()) {
        console.log("Ey yo its a draw!")
    }
    //restart
}

function switchplayers() {
    player2Turn = !player2Turn;
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
    for (let i=0; i<datafield.length; i++) {
        if (datafield[i].textContent != "") {
            if (i = 8) {
                return true;
            } else { continue }
        } else {
            continue;
        }
    }
}

