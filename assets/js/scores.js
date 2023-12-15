function printHighscores() {
var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];

// sort highscores by score property in descending order
highscores.sort(function (a, b) {
  return b.score - a.score;
});

for (var i = 0; i < highscores.length; i += 1) {
  // create a li tag for each high score
  var liTag = document.createElement('li');
  liTag.textContent = highscores[i].initials + ' - ' + highscores[i].score;

  // display on the page
  var olEl = document.getElementById('highscores');
  olEl.appendChild(liTag);
  }
}

function clearHighscores() {
  window.localStorage.removeItem('highscores');
  window.location.reload();
}

document.getElementById('clear').onclick = clearHighscores;

// run function when the page loads
printHighscores();