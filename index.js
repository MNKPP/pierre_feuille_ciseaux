"use strict";

const imagesGame = document.querySelectorAll(".images-group img");
let computerSelectionImage = document.querySelector(".computer-selection img");
const result = document.querySelector(".result p");
const score = document.querySelector("#score");
const userScoreDiv = document.querySelector(".user-score p");
const computerScoreDiv = document.querySelector(".computer-score p");

let computerScore = 0;
let userScore = 0;

let finalUserScore = 0;
let finalComputerScore = 0;

const winText = "Vous avez gagné !";

const choices = {
    pierre: "pierre",
    feuille: "feuille",
    ciseaux: "ciseaux",
}

function userSelection(imagesGame) {
    imagesGame.forEach(element => {
        element.addEventListener("click", (event) => {
            score.innerText = "";
            resetGrayElement(imagesGame)
            const clickedElementId = event.target.id;
            const computerChoice = computerSelection();
            setGrayElement(element);
            logicGame(clickedElementId, computerChoice)
            displayComputerSelectionImage(computerChoice)
        })
    })
}

function computerSelection() {
    const randomComputerSelection = Math.floor(Math.random() * Object.keys(choices).length);
    return Object.keys(choices)[randomComputerSelection];
}

function logicGame(userSelection, randomComputerSelection) {
    switch (true) {
        case userSelection === randomComputerSelection:
            result.innerText = "Egalité !"
            endGame();
            break;
        case userSelection === choices.pierre && randomComputerSelection === choices.ciseaux:
            result.innerText = winText;
            userScore++;
            endGame();
            break;
        case userSelection === choices.feuille && randomComputerSelection === choices.pierre:
            result.innerText = winText;
            userScore++;
            endGame();
            break;
        case userSelection === choices.ciseaux && randomComputerSelection === choices.feuille:
            result.innerText = winText;
            userScore++;
            endGame();
            break;
        default:
            result.innerText = "L'ordinateur a gagné !"
            computerScore++;
            endGame();
    }
}

function displayComputerSelectionImage(computerSelection) {
    const parentElement = document.querySelector(".computer-selection");
    let image = parentElement.querySelector('img');

    if (!image) {
        image = document.createElement('img');
        parentElement.appendChild(image);
    }

    switch (computerSelection) {
        case choices.pierre:
            image.src = `assets/images/${choices.pierre}.png`;
            break;
        case choices.feuille:
            image.src = `assets/images/${choices.feuille}.png`;
            break;
        case choices.ciseaux:
            image.src = `assets/images/${choices.ciseaux}.png`;
            break;
    }

    computerSelectionImage = image;
}


function setGrayElement(element) {
    element.disabled = true;
    if (element.disabled) {
        element.style.opacity = 0.5;
    }
}

function resetGrayElement(imagesGame) {
    imagesGame.forEach(element => {
        element.style.opacity = 1;
        element.disabled = false;
    })
}

function displayScore(user, computer) {
    const scoreText = `${user} - ${computer}`;
    score.innerText = scoreText;
    return scoreText;
}

function endGame() {
    if (userScore === 3 || computerScore === 3) {
        score.innerText = `La partie est terminé avec le score de ${displayScore(userScore, computerScore)}`;

        if (userScore === 3) {
            finalUserScore++;
            userScoreDiv.innerText = finalUserScore;
            computerScoreDiv.innerText = finalComputerScore;
        } else if (computerScore === 3) {
            finalComputerScore++;
            userScoreDiv.innerText = finalUserScore;
            computerScoreDiv.innerText = finalComputerScore;
        }

        userScore = 0;
        computerScore = 0;
    } else {
        score.innerText = displayScore(userScore, computerScore);
    }
}
userSelection(imagesGame);