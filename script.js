const divfield = document.querySelectorAll('.field')
const turntext = document.querySelectorAll('.whoseturn')

//event listener for clicking on input fields X-player
divfield.forEach(field => {
    field.addEventListener('click', () => {
        field.textContent = 'X';
    })
})

//event listener for clicking on input fields X-player
divfield.forEach(field => {
    field.addEventListener('click', () => {
        field.textContent = 'O';
    })
})

//for VS AI
