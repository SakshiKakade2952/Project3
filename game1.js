let playerO = "O";
let playerX = "X";
let currentPlayer = playerO;

let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameCells;

let winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let gameOver = false;

window.onload = function() {
    gameCells = document.getElementsByClassName("game-cell");
    for(let cell of gameCells) {
        cell.addEventListener("click", placeCell);
    }
    restartGameButton = document.getElementById("game-restart-button");
    restartGameButton.addEventListener("click", restartGame);
}

function placeCell() {
    if(gameOver) {
        return;
    }

    const index = parseInt(this.getAttribute("data-cell-index"));
    if(gameBoard[index] !== "") {
        return; 
    }

    this.innerText = currentPlayer;
    if(currentPlayer === "O"){
        this.classList.add("o");
    }else{
        this.classList.add("x")
    }

    gameBoard[index] = currentPlayer;

    //Change players
    currentPlayer = (currentPlayer === playerO) ? playerX : playerO;

    //Check for winner
    checkWinner();
}

function checkWinner() {
    for(let winCondition of winningConditions) {
        let a = gameBoard[winCondition[0]];
        let b = gameBoard[winCondition[1]];
        let c = gameBoard[winCondition[2]];

        if(a == b && b == c && a != "") {
            //Update styling for winning cells
            for (let i=0; i < gameBoard.length; i++) {
                if(winCondition.includes(i)) {
                    gameCells[i].classList.add("winning-game-cell");
                }
            } 

            //Show Winner Message
            if (a == "O") {
                document.getElementById("result").style.display = "block";
                document.getElementById("result").innerHTML = "🎉🏆 Congratulations! Player O Wins 🏆🎉";
            }
            else{
                document.getElementById("result").style.display = "block";
                document.getElementById("result").innerHTML = "🎉🏆 Congratulations! Player X Wins 🏆🎉";
            }

            gameOver = true;
            return;
        }
    }

    //Draw Match
    if (!gameBoard.includes("")) {
        document.getElementById("result").style.display = "block";
        document.getElementById("result").innerHTML = "🤝 It's a Draw 🤝";
        gameOver = true;
    }
}


function restartGame() {
    document.getElementById("exitMessage").style.display = "block";
}

function exitGame() {
    gameOver = false;
    gameBoard = ["", "", "", "", "", "", "", ""];

    for (let cell of gameCells) {
        cell.innerText = "";
        cell.classList.remove("o");
        cell.classList.remove("x");
        cell.classList.remove("winning-game-cell");
    }

    document.getElementById("result").innerHTML = "";
    document.getElementById("result").style.display = "none";

    document.getElementById("exitMessage").style.display = "none";
}

function cancelExit() {
    document.getElementById("exitMessage").style.display = "none";
}