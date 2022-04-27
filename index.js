'use strict'

let currentUser = 'X'
let iterator = 0;
let table = document.querySelector('table');

let firstColumn = Array.from(table.querySelectorAll('td[data-position="0"]')),
    secondColumn = Array.from(table.querySelectorAll('td[data-position="1"]')),
    thirdColumn = Array.from(table.querySelectorAll('td[data-position="2"]')),
    firstRow = Array.from(table.querySelectorAll('tr')[0].children),
    secondRow = Array.from(table.querySelectorAll('tr')[1].children),
    thirdRow = Array.from(table.querySelectorAll('tr')[2].children),
    mainDia = [table.querySelectorAll('tr')[0].querySelectorAll('td')[0], table.querySelectorAll('tr')[1].querySelectorAll('td')[1],table.querySelectorAll('tr')[2].querySelectorAll('td')[2]],
    notMainDia = [table.querySelectorAll('tr')[2].querySelectorAll('td')[0], table.querySelectorAll('tr')[1].querySelectorAll('td')[1],table.querySelectorAll('tr')[0].querySelectorAll('td')[2]];

table.addEventListener('click', (e) => {
    pointingArea(e.target);
    checkingAreas();
    changeUser();
})

function changeUser () {
    if (currentUser === 'X') currentUser = 'O'
    else currentUser = 'X'
}

function pointingArea (target) {
    if (target.matches('td') && target.innerText === '') {
        target.innerText = currentUser
        iterator++
        console.log(iterator)
    }
}

function checkingAreas () {
    if (firstColumn.every((item)=> item.innerText === 'X') ||
        secondColumn.every((item)=> item.innerText === 'X') ||
        thirdColumn.every((item)=> item.innerText === 'X') ||
        firstRow.every((item)=> item.innerText === 'X') ||
        secondRow.every((item)=> item.innerText === 'X') ||
        thirdRow.every((item)=> item.innerText === 'X') ||
        mainDia.every((item)=> item.innerText === 'X') ||
        notMainDia.every((item)=> item.innerText === 'X')) endingGame(`X`)
    else if (firstColumn.every((item)=> item.innerText === 'O') ||
            secondColumn.every((item)=> item.innerText === 'O') ||
            thirdColumn.every((item)=> item.innerText === 'O') ||
            firstRow.every((item)=> item.innerText === 'O') ||
            secondRow.every((item)=> item.innerText === 'O') ||
            thirdRow.every((item)=> item.innerText === 'O') ||
            mainDia.every((item)=> item.innerText === 'O') ||
            notMainDia.every((item)=> item.innerText === 'O')) endingGame(`O`)
    else if (iterator === 9) endingGame("Nobody");
}

function endingGame(player) {
    document.querySelector('.whoWon').innerHTML = `${player} wins`
    bluring();
}

function bluring() {
    let blur = document.createElement('div');
    blur.classList.add ('blur');

    let tableCoors = table.getBoundingClientRect();
    tableCoors.width = table.offsetWidth;
    tableCoors.height = table.offsetHeight;
    console.log(tableCoors);

    blur.style.cssText = `
        left: ${tableCoors.left}px;
        top: ${tableCoors.top}px;
        right: ${tableCoors.right}px;
        bottom: ${tableCoors.bottom}px;
        width: ${tableCoors.width}px;
        height: ${tableCoors.height}px;
        position: absolute;
        background-color: rgba(0,0,0,0.05);
        z-index:2;
    `
    document.body.append(blur);

    let button = document.createElement('div');
    button.classList.add('restart');
    button.innerHTML = 'Start NEW game'
    document.body.append(button);
    button.addEventListener('click', () => {
        table.querySelectorAll('td').forEach(item => item.textContent = '')
        document.querySelector('.blur').remove();
        button.remove();
        document.querySelector('.whoWon').innerHTML = ``
        iterator = 0;
        currentUser = 'X'
    })
}

