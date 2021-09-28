// all the required elements
const start_btn = document.querySelector("#startButton");
const highscore_btn = document.querySelector("high_scores");
const timerBox = document.querySelector("timer");
const questionsAns = document.querySelector("questionsAnswered");
const questionsBox = document.querySelector("questions_box");
const optionsBox = document.querySelector("options_list");
const scoreBox = document.querySelector("score");
const correctlyAns = document.querySelector("correctlyAnswered");

const scoreNameBox = document.querySelector("scoreNameContainer");
const scoreName = document.querySelector("scoreName");
const submit_btn = document.querySelector("submitBtn");

const highScoreBox = document.querySelector("highscoresBox");
const restart_btn = document.querySelector("restart_button");
const endpage = document.querySelector("restart_box");

// setting initial score, questions and seconds
let questions = 0;
let score = 0;
let seconds = 120;

// when start button is clicked go to the questions and start the timer
start_btn.addEventListener("click", function () {
    let timerInterval = setInterval(timerFunc, 1000);
    function timerFunc() {
      secondsLeft = secondsLeft - 1;
      timerBox.textContent = secondsLeft + "s";
      if (secondsLeft <= 0) {
        document.getElementById('timeout').style.display = "block";
        setTimeout(function(){
          document.getElementById('timeout').style.display = "none";
        }, 1000)
        endpage();
        clearInterval(timerInterval);
        return;
    }
}
}
