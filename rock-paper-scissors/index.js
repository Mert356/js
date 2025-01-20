let playerScore = 0;
let computerScore = 0;
const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
const player = document.getElementById("player");
const computer = document.getElementById("computer");
const result = document.getElementById("result")

let list = ["Rock","Paper","Scissors"];

rock.addEventListener("click",()=>game("Rock"));
paper.addEventListener("click",()=>game("Paper"));
scissors.addEventListener("click",()=>game("Scissors"));
function game(playerName){
    let randomNumber = Math.floor(Math.random()*3);
    let computersChose = list[randomNumber];
    player.textContent = "Player: " + playerName;
    computer.textContent = "Computer: "+computersChose;
    choseWinner(playerName,computersChose);
}
function choseWinner(player, computer) {
    if (computer === player) {
        result.textContent = "It is a TIE";
        result.style.color = "black";
    } else {
        if (
            (player === "Rock" && computer === "Scissors") ||
            (player === "Scissors" && computer === "Paper") ||
            (player === "Paper" && computer === "Rock")
        ) {
            result.textContent = "You WIN!";
            result.style.color = "green";
            playerScore++;
            document.getElementById("player-score").textContent = "Player Score: " + playerScore;
            document.getElementById("computer-score").textContent = "Computer Score: " + computerScore;
        } else {
            result.textContent = "Computer WINS!";
            result.style.color = "red";
            computerScore++;
            document.getElementById("player-score").textContent = "Player Score: " + playerScore;
            document.getElementById("computer-score").textContent = "Computer Score: " + computerScore;
        }
    }
}

