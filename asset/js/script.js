// Call in all the required elements
const startButton = document.getElementById("startBtn");
const quizBox = document.getElementById("quizBox");
const questionBox = document.getElementById("question");
const answersBox = document.getElementById("answersBox");
const timerText = document.getElementById("timer");
const scoreCount = document.getElementById("score");
const endScreen = document.getElementById("endpage");
const startScreen = document.getElementById("startpage");
const queAns = document.getElementById("queAnswered");

const nameInput = document.getElementById("nameInput");
const submitButton = document.getElementById("submitBtn");

const scoreName = document.getElementById("scorenameBox");
const scorecounter = document.getElementById("scoreBox");

// global variables - for question, score and time
let questionIndex = 0;
let score = 0;
let secondsLeft = 120;

let scoresArray = [];

// questions with answers and correct answers
const codeQuiz = [
  {
    questionNumber: 1,
    question: "Inside which HTML element do we put the JavaScript??",
    answers: [
        "<script>",
        "<javascript>",
        "<js>",
        "<scripting>",
    ],
    correctAnswer:
      "<script>",
  },
  {
    questionNumber: 2,
    question: "Where is the correct place to insert a JavaScript?",
    answers: [
        "The <body> section",
        "Both the <head> section and the <body> section are correct",
        "The <head> section",
        "Outside the <body>",
    ],
    correctAnswer: "Both the <head> section and the <body> section are correct",
  },

  {
    questionNumber: 3,
    question:
    "What is the correct syntax for referring to an external script called 'xxx.js'?",
    answers: [
        "<script src='xxx.js'>",
        "<script href='xxx.js'>",
        "<script name='xxx.js'>",
        "ALL",
    ],
    correctAnswer: "<script src='xxx.js'>",
  },
  {
    questionNumber: 4,
    question:
      "The external JavaScript file must contain the <script> tag?",
    answers: [
        "True",
        "False",
        "Neither",
        "Irrelevant",
    ],
    correctAnswer: "False",
  },
  {
    questionNumber: 5,
    question: "How do you write 'Hello World' in an alert box?",
    answers: [
        "alert('Hello World');",
        "msg('Hello World');",
        "msgBox('Hello World');",
        "alertBox('Hello World');",
    ],
    correctAnswer: "alert('Hello World');",
  },
  {
    questionNumber: 6,
    question: "How do you create a function in JavaScript??",
    answers: [
        "function myFunction() ",
        "function:myFunction()",
        "function = myFunction()",
        "function >= myFunction()",
    ],
    correctAnswer: "function myFunction() ",
  },
  {
    questionNumber: 7,
    question:
    "How do you declare a Javascript variable ?",
    answers: [
        "v petName;",
        "variable petName;",
        "var petName;",
        "declare var petName;",,
    ],
    correctAnswer: "var petName;",
  },
  {
    questionNumber: 8,
    question:
    "How do you call a function named 'myFunction'?",
    answers: [
        "myFunction()",
        "call myFunction()",
        "function myFunction()",
        "call function myFunction()",
    ],
    correctAnswer: "myFunction()",
  },
  {
    questionNumber: 9,
    question: "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
    answers: [
        "if (i <> 5)",
        "if i <> 5",
        "if (i != 5)",
        "if i =! 5 then",
    ],
    correctAnswer: "if (i != 5)",
  },
  {
    questionNumber: 10,
    question: "Which event occurs when the user clicks on an HTML element??",
    answers: [
        "onclick  ",
        "onmouseclick",
        "onchange",
        "onmouseover",
    ],
    correctAnswer: "onclick  ",
  },
 
];

// call upon high score button and make it into flex
document.getElementById("highScoreBtn").style.display = "flex";
// hide the highscores page
scoreName.style.display = "none";

// a function for restart button- make it into a flex and use an if else statement to display the questions by one
function quizItems() {
  document.getElementById("restart").style.display = "flex";
  if (questionIndex === codeQuiz.length) {
    queAns.textContent = questionIndex;
  } else {
    queAns.textContent = questionIndex + 1;
  }

// a function for highscores button 
// once start button is pressed, hide the start page
// display the text by using a for loop, let i be 0 and increase by 1. 
// the answer text is displayed and for every question there is a correct answer
  document.getElementById("highScoreBtn").style.display = "none";
  startScreen.style.display = "none";
  quizBox.style.display = "flex";
  questionBox.textContent = codeQuiz[questionIndex].question;
  for (let i = 0; i <= 3; i++) {
    answersBox.children[i].children[0].textContent =
      codeQuiz[questionIndex].answers[i];
  }
}


// show the end page
// activate quizstyle to make the quiz screen hide.
// show end screen and activate the submit button and input a name. 
// local storage to put scores in it
// keep the old scores and add new ones
// load high scores and names after the end page 
function endpage() {
    quizStyle();
  endScreen.style.display = "flex";
  submitButton.addEventListener("click", function () {
    let scoresObject = { userName: nameInput.value.trim(), userScore: score, timerText: style.display = "none"};
    if (typeof localStorage.getItem("scores") == "object") {
      scoresArray.push(scoresObject);
      localStorage.setItem("scores", JSON.stringify(scoresArray));
    } else {
      var pulledScores = JSON.parse(localStorage.getItem("scores"));
      pulledScores.push(scoresObject);
      localStorage.setItem("scores", JSON.stringify(pulledScores));
    }
    setTimeout(function () {
      endScreen.style.display = "none";
      loadHighscores();
      timerText.style.display= "none";
    }, 100);
  });
}


// when start button is activated go to the first question and start timer
startButton.addEventListener("click", function () {
    let timerInterval = setInterval(timerFunc, 1000);
    function timerFunc() {
      secondsLeft = secondsLeft - 1;
      timerText.textContent = secondsLeft + "s";
      if (secondsLeft <= 0) {
        document.getElementById("timeout").style.display = "block";
        setTimeout(function () {
          document.getElementById("timeout").style.display = "none";
        }, 1000);
        endpage();
        clearInterval(timerInterval);
        return;
      } else {
        quizItems();
      }
    }
  });

// Click answer - add to score if correct, go to next question
answersBox.addEventListener("click", function (event) {
    if (questionIndex === codeQuiz.length) {
      endpage();
      return;
    } else {
      quizItems();
      questionIndex++;
      if (event.target.textContent === codeQuiz[questionIndex - 1].correctAnswer) {
        score = score + 1;
        secondsLeft = secondsLeft + 5;
        document.getElementById("correct").style.display = "block";
        setTimeout(function () {
          document.getElementById("correct").style.display = "none";
        }, 400);
      } else {
        secondsLeft = secondsLeft - 20;
        document.getElementById("wrong").style.display = "block";
        setTimeout(function () {
          document.getElementById("wrong").style.display = "none";
        }, 400);
      }
      scoreCount.textContent = score;
    }
  });

// a function for the last page (names and high score)
//when restart actiavted, close all the not needed elements 
// style the end page and make it display 
function loadHighscores() {
  document.getElementById("restart").style.display = "flex";
  quizStyle();
  startScreen.style.display = "none";
  scorecounter.style.display = "none";
  scoreName.style.display = "flex";
  if (typeof localStorage.getItem("scores") == "object") {
    document.getElementById("nameTag").style.display = "none";
    document.getElementById("scoreTag").style.display = "none";
    var noScores = document.createElement("h1");
    noScores.textContent = "You don't have any highscores yet!";
    scoreName.appendChild(noScores);
  } else {
    document.getElementById("nameTag").style.display = "flex";
    document.getElementById("scoreTag").style.display = "flex";
    var theHighScores = JSON.parse(localStorage.getItem("scores"));
    for (let i = 0; i < theHighScores.length; i++) {
      var nameStyle = document.createElement("div");
      var scoreStyle = document.createElement("div");
      scoreName.appendChild(nameStyle);
      scoreName.appendChild(scoreStyle);
      nameStyle.style.display = "flex";
      nameStyle.style.width = "50%";
      nameStyle.style.justifyContent = "center";
      nameStyle.style.alignItems = "center";
      scoreStyle.style.display = "flex";
      scoreStyle.style.width = "50%";
      scoreStyle.style.justifyContent = "center";
      scoreStyle.style.alignItems = "center";
      var forName = document.createElement("h3");
      var forScore = document.createElement("h3");
      nameStyle.appendChild(forName);
      scoreStyle.appendChild(forScore);
      forName.textContent = theHighScores[i].userName;
      forScore.textContent = theHighScores[i].userScore;
    }
  }
}

// to not dsiplay the quiz screen during the input screen
function quizStyle() {
    quizBox.innerHTML = "";
    quizBox.style.height = "0px";
  }

// call the high score button, when called go to the scores page
document
  .getElementById("highScoreBtn")
  .addEventListener("click", function () {
    loadHighscores();
    document.getElementById("highScoreBtn").style.display = "none";
  });

// call restart button when called reload the page, so it goes back to the start
document.getElementById("restart").addEventListener("click", function () {
  location.reload();
});