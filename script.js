let cscore = document.getElementById("comp-score");
let pscore = document.getElementById("player-score");
const hands = document.querySelectorAll(".hand");
const handSetup = document.querySelector(".hand-setup");
const lines = document.querySelector(".triangle-lines");
const resultZone = document.querySelector(".result-zone");
const sideIcon = document.querySelectorAll(".side-icon");
const winText = document.querySelector("#win-text");
const lostText = document.querySelector("#lost-text");
const tieText = document.querySelector("#tie-text");
const subText = document.querySelector(".sub-text");
const nextBtn = document.querySelector(".next-btn");
const ruleBtn = document.querySelector(".rule-btn");
const playAgainBtn = document.querySelector(".playBtn");
const replayBtn = document.querySelector(".replayBtn");
const gameRuleBook = document.querySelector(".game-rule-box");
const closebtn = document.querySelector(".close-btn");



let playerScore = localStorage.getItem("playerScore")? parseInt(localStorage.getItem("playerScore"))  : 0; //converting string to number
let computerScore = localStorage.getItem("computerScore") ? parseInt(localStorage.getItem("computerScore")) : 0;

// Display the current scores when the page loads
cscore.textContent = computerScore;
pscore.textContent = playerScore;

hands.forEach((hand) => {
  hand.addEventListener("click", function () {
    handSetup.style.display = "none"; // Hide the entire game setup after clicking on a hand

    lines.style.display = "none"; // Optionally hide other elements, like the triangle lines, etc.

    resultZone.style.display = "flex"; // Show the game result section or any other element if needed

    const playerChoice = this.getAttribute("data-hand"); //get the players choice[rock,paper,scissor]

    const choices = ["rock", "paper", "scissor"];//PC random  choice->using random function()

    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    // Display player's and computer's selections in the result section
    // Hide icons initially
    document.querySelectorAll(".user-side-icon .side-icon").forEach((icon) => {
      icon.style.display = "none";
      icon.classList.remove("ripple-multiple"); // Remove ripple class if any
    });
    document.querySelector(`#user-${playerChoice}`).style.display = "block";


    document.querySelectorAll(".pc-side-icon .side-icon").forEach((icon) => {
      icon.style.display = "none";
      icon.classList.remove("ripple-multiple"); // Remove ripple class if any
    });
    document.querySelector(`#pc-${computerChoice}`).style.display = "block";

    //determining the result between player and PC

    let resultText = "";
    if (playerChoice === computerChoice) {
      resultText = "tie";
    } else if (
      (playerChoice === "rock" && computerChoice === "scissor") ||
      (playerChoice === "paper" && computerChoice === "rock") ||
      (playerChoice === "scissor" && computerChoice === "paper")
    ) {
      resultText = "winner";
      playerScore++;
      localStorage.setItem("playerScore", playerScore); //save player score
      document.querySelector(`#user-${playerChoice}`).classList.add("ripple-multiple"); // Add ripple effect to player's icon
    } else {
      resultText = "lose";
      computerScore++;
      localStorage.setItem("computerScore", computerScore); //save computer score      
      document.querySelector(`#pc-${computerChoice}`).classList.add("ripple-multiple");// Add ripple effect to computer's icon
    }

    //result display
    updateResultDisplay(resultText);

    //score update on the page
    pscore.textContent = playerScore;
    cscore.textContent = computerScore;
  });
});


//function to update the result display

function updateResultDisplay(result) {
  if (result === "winner") {
    winText.style.display = "block";
    lostText.style.display = "none";
    tieText.style.display = "none";
    nextBtn.style.display = "inline-block"; // Show the next button
    ruleBtn.style.display = "inline-block"; // Make sure the rule button is visible
    playAgainBtn.style.display = "block";
    replayBtn.style.display = "none";
    subText.style.display = "block";
  } else if (result === "lose") {
    winText.style.display = "none";
    lostText.style.display = "block";
    tieText.style.display = "none";
    subText.style.display = "block";
    playAgainBtn.style.display = "block";
    replayBtn.style.display = "none";
  } else {
    winText.style.display = "none";
    lostText.style.display = "none";
    tieText.style.display = "block";
    subText.style.display = "none";
    playAgainBtn.style.display = "none";
    replayBtn.style.display = "block";
  }
}

//button ->PLAY AGAIN and REPLY

playAgainBtn.addEventListener("click", returnToGame);
replayBtn.addEventListener("click", returnToGame);

// Function to return to the  back to the game
function returnToGame() {
  // Hide the result zone
  resultZone.style.display = "none";

  // Show the hand selection zone again
  handSetup.style.display = "flex";

  lines.style.display = "block";

  nextBtn.style.display = "none";
}

// localStorage.clear();

//rule book open and close
ruleBtn.addEventListener("click", displayRuleBook);

function displayRuleBook() {
  gameRuleBook.style.display = "block";
  closebtn.style.display = "block";
}
closebtn.addEventListener("click", closeRuleBook);

function closeRuleBook() {
  gameRuleBook.style.display = "none";
  closebtn.style.display = "none";
}
