var currentQuestionIndex = 0;
var time = questions.length * 10;
var timerId;

// variables for referencing DOM elements
var submitBtn = document.getElementById('submit');
var choicesEl = document.getElementById('choices');
var questionsEl = document.getElementById('questions');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');
var startBtn = document.getElementById('start');
var timerEl = document.getElementById('time');

// sound effects
var sfxCorrect = new Audio('assets/sounds/correctsound.mp3');
var sfxWrong = new Audio('assets/sounds/wrongsound.mp3');


function startQuiz() {
  var startScreenEl = document.getElementById('start-screen');
  startScreenEl.setAttribute('class', 'hide');
  
  questionsEl.removeAttribute('class');

  timerId = setInterval(clockTick, 1000);

  timerEl.textContent = time;

  getQuestion();
}

function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];

  var titleEl = document.getElementById('question-title');
  titleEl.textContent = currentQuestion.title;

  choicesEl.innerHTML = '';

for (var i = 0; i < currentQuestion.choices.length; i++) {

  var choice = currentQuestion.choices[i];
  var choiceNode = document.createElement('button');
  choiceNode.setAttribute('class', 'choice');
  choiceNode.setAttribute('value', choice);
  
  choiceNode.textContent = i + 1 + '. ' + choice;

  // display on the page
  choicesEl.appendChild(choiceNode);
  }
}

function questionClick(event) {
  var buttonEl = event.target;

  // if the clicked element is not a choice button, do nothing.
  if  (!buttonEl.matches('.choice')) {
    return;
  }


  // check if user guessed the question wrong
  if (buttonEl.value !== questions[currentQuestionIndex].answer) {
    time -=5;

    if (time < 0) {
      time = 0;
    }

    timerEl.textContent = time;

    sfxWrong.play();

    feedbackEl.textContent = 'Wrong!';
  } else {
    sfxCorrect.play();

    feedbackEl.textContent = 'Correct!';
  }

  feedbackEl.setAttribute('class', 'feedback');
  setTimeout(function () {
    feedbackEl.setAttribute('class', 'feedback hide');
  }, 1000);

  currentQuestionIndex++;

  if (time <= 0 || currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  clearInterval(timerId);

  var endScreenEl = document.getElementById('end-screen');
  endScreenEl.removeAttribute('class');

  var finalScoreEl = document.getElementById('final-score');
  finalScoreEl.textContent = time;

  questionsEl.setAttribute('class', 'hide');
}

function clockTick() {
  // update the time
  time--;
  timerEl.textContent = time;

  // check if the user has ran out of time
  if (time <= 0) {
    quizEnd();
  } 
}

function saveHighScore() {
  // get value of input box
  var initials = initialsEl.value.trim();

  // make sure value wasn't empty
  if (initials !== '') {
  // get saved scores from local storage, or if not any, set to empty array
    var highscores = 
    JSON.parse(window.localStorage.getItem('highscores')) || [];

    // format the new score object for current user
    var newScore = {
      score: time,
      initials: initials,
    };

    // save to local storage
    highscores.push(newScore);
    window.localStorage.setItem('highscores', JSON.stringify(highscores));

    // redirect to next page
    window.location.href = 'highscores.html';
  }
}

function checkForEnter(event) {
  if (event.key === 'Enter') {
    saveHighScore();
  }
}

// user clicks button to submit initials 
submitBtn.onclick = saveHighScore;

// user clicks button to start the quiz
startBtn.onclick = startQuiz;

// user clicks on the element containing choices
choicesEl.onclick = questionClick;

initialsEl.onkeyup = checkForEnter;

