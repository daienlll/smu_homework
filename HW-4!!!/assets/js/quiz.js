var wordBlank = document.querySelector(".word-blanks");
var win = document.querySelector(".win");
var lose = document.querySelector(".lose");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var que_text = document.querySelector(".questions");
var option_list = document.querySelector(".options");
var que_count = 0;
var userScore = 0;
var timer;
var timerCount;

// Arrays used to create blanks and letters on screen
var lettersInChosenWord = [];
var blanksLetters = [];

// Array of words the user will guess
var questions = [
  {
    "numb": 1,
    "question": "What is Javascript?",
    "answer": "The muscles of a website",
    "options": [
      "The muscles of a website",
      "The power house of the cell",
      "The best there ever was",
      "A jelly baby"
    ]
  },
  {
    "numb": 2,
    "question": "What kind of language is Javascript?",
    "answer": "Dynamic",
    "options": [
      "Hellish",
      "Savory",
      "Simple",
      "Dynamic"
    ]
  }, {
    "numb": 3,
    "question": "How do you define a function?",
    "answer": "Function functionName(){}",
    "options": [
      "With difficulty",
      "Function functionName(){}",
      "def",
      "Your hands"
    ]
  }, {
    "numb": 4,
    "question": "Can you affect the HTML using Javascript?",
    "answer": "Yes",
    "options": [
      "Maybe",
      "Kinda",
      "Yes",
      "No"
    ]
  }, {
    "numb": 5,
    "question": "In Destiny 2, which handcannon has an RPM of 150?",
    "answer": "Sunshot",
    "options": [
      "Sunshot",
      "Ace of Spades",
      "Thorn",
      "Lumina"
    ]
  }
];

// The startGame function is called when the start button is clicked
function startGame() {
  isWin = false;
  timerCount = 30;
  showQuetions(que_count)
  startButton.disabled = true;
  startTimer()
}

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
  // Sets timer
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount >= 0) {
      // Tests if win condition is met
      if (isWin && timerCount > 0) {
        // Clears interval and stops timer
        clearInterval(timer);
        winGame();
      }
    }
    // Tests if time has run out
    if (timerCount <= 0) {
      timerCount = 0
      clearInterval(timer);
      showScore();
    }
  }, 1000);
}

// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);

function init() {
  if (localStorage.getItem("score") === null || localStorage.getItem("score") === '') {
    console.log("Setting local score")
    localStorage.setItem("score", JSON.stringify([]))
  }
  console.log("The local storage score amount is " + localStorage.getItem("score"))
  showhs()
}

function showhs() {
  var localScores = JSON.parse(localStorage.getItem("score"));
  var myScores = "";
  for (i = 0; i < localScores.length; i++) {
    myScores = myScores + '<div class="hs">'+ Object.keys(localScores[i])[0] + ': ' + Object.values(localScores[i])[0] +'</div>'
  }
  document.querySelector(".highScores").innerHTML = myScores
};

function savescore() {
  var initials = prompt("Please enter your name");
  var savescore = {}
  savescore[initials] = userScore
  var allScores = JSON.parse(localStorage.getItem("score"))
  console.log(allScores)
  allScores.push(savescore)
  localStorage.setItem("score", JSON.stringify(allScores))
}

// Calls init() so that it fires when page opened
init();

// Bonus: Add reset button
var resetButton = document.querySelector(".reset-button");

function resetGame() {
  que_count = 0;
  userScore = 0;
  timer;
  timerCount;
  document.querySelector(".word-blanks").innerHTML = "Press START To BEGIN!!!";
  document.querySelector(".showScore").innerHTML = "";
  startButton.disabled = false;
}
// Attaches event listener to button
resetButton.addEventListener("click", resetGame);

function showScore() {
  que_text.innerHTML = "";
  option_list.innerHTML = "";
  document.querySelector(".showScore").innerHTML = userScore;
  savescore()
};



function showQuetions(index) {
  document.querySelector(".word-blanks").innerHTML = "";
  //creating a new span and div tag for question and option and passing the value using array index
  let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
  let option_tag = '<div class="option"><span>' + questions[index].options[0] + '</span></div>'
    + '<div class="option"><span>' + questions[index].options[1] + '</span></div>'
    + '<div class="option"><span>' + questions[index].options[2] + '</span></div>'
    + '<div class="option"><span>' + questions[index].options[3] + '</span></div>';
  que_text.innerHTML = que_tag; //adding new span tag inside que_tag
  option_list.innerHTML = option_tag; //adding new div tag inside option_tag

  const option = option_list.querySelectorAll(".option");

  // set onclick attribute to all available options
  for (i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}
// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer) {
  // clearInterval(counter); //clear counter
  // clearInterval(counterLine); //clear counterLine
  let userAns = answer.textContent; //getting user selected option
  let correcAns = questions[que_count].answer; //getting correct answer from array
  const allOptions = option_list.children.length; //getting all option items

  if (userAns == correcAns) { //if user selected option is equal to array's correct answer
    userScore += 1;
  } else {
    timerCount -= 5;
  }
  for (i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
  }
  que_count++;
  if (que_count < questions.length) {
    showQuetions(que_count);
  } else {
    timerCount = 1
  };
};
