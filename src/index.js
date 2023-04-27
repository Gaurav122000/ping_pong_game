import "./styles.css";
var rod1 = document.getElementById("rod-1"); /* for rod1 */
var rod2 = document.getElementById("rod-2"); /* for rod2 */
var ball = document.getElementById("ball"); /* for ball */
var movement = 20;

const thisrod1 = "rod-1";
const thisrod2 = "rod-2";
const storeName = "abc";
const storeScore = 123;

let whichBar;
let moveX = 2;
let moveY = 2;
let ballMoving;
let border = 12;
let score;
let highScore;
let gameStart = false;
/* first alert code */
localStorage.setItem(storeScore, "null");
localStorage.setItem(storeScore, "null");
(function () {
  highScore = localStorage.getItem(storeScore);
  whichBar = localStorage.getItem(storeName);
  if (whichBar === "null" || highScore === "null") {
    alert("Hello.. This is your first game");
    highScore = 0;
    whichBar = thisrod1;
  } else {
    alert(whichBar + " has maximum score of " + highScore * 100);
  }
  gameReset(whichBar);
})();

/* main code functionality */
function gameReset(barName) {
  rod1.style.left = (window.innerWidth - rod1.offsetWidth) / 2 + "px";
  rod2.style.left = (window.innerWidth - rod2.offsetWidth) / 2 + "px";
  ball.style.left = (window.innerWidth - ball.offsetWidth) / 2 + "px";

  if (barName === thisrod1) {
    ball.style.top =
      rod2.getBoundingClientRect().y -
      rod2.getBoundingClientRect().height +
      "px";
    moveY = -2;
  } else if (barName === thisrod2) {
    ball.style.top = rod1.getBoundingClientRect().height + "px";
    moveY = 2;
  }

  score = 0;
  gameStart = false;
}

document.addEventListener("keydown", function (event) {
  if (event.keyCode === 68 || event.keyCode === 39) {
    if (
      parseInt(rod1.style.left) <
      window.innerWidth - rod1.offsetWidth - border
    ) {
      rod1.style.left = parseInt(rod1.style.left) + movement + "px";
      rod2.style.left = rod1.style.left;
    }
  }

  if (event.keyCode === 65 || event.keyCode === 37) {
    if (parseInt(rod1.style.left) > border) {
      rod1.style.left = parseInt(rod1.style.left) - movement + "px";
      rod2.style.left = rod1.style.left;
    }
  }

  if (event.keyCode === 13) {
    if (!gameStart) {
      gameStart = true;
      let ballRect = ball.getBoundingClientRect();
      let ballX = ballRect.x;
      let ballY = ballRect.y;
      let ballDia = ballRect.width;

      let rod1Height = rod1.offsetHeight;
      let rod2Height = rod2.offsetHeight;
      let rod1Width = rod2.offsetWidth;
      let rod2Width = rod2.offsetWidth;

      ballMoving = setInterval(function () {
        let rod1X = rod1.getBoundingClientRect().x;
        let rod2X = rod2.getBoundingClientRect().x;

        let ballCentre = ballX + ballDia / 2;

        ballX += moveX;
        ballY += moveY;

        ball.style.left = ballX + "px";
        ball.style.top = ballY + "px";

        if (ballX + ballDia > window.innerWidth || ballX < 0) {
          moveX = -moveX;
        }

        if (ballY <= rod1Height) {
          moveY = -moveY;
          score++;

          if (ballCentre < rod1X || ballCentre > rod1X + rod1Width) {
            dataStoring(score, thisrod2);
          }
        }
        if (ballY + ballDia >= window.innerHeight - rod2Height) {
          moveY = -moveY;
          score++;

          if (ballCentre < rod2X || ballCentre > rod2X + rod2Width) {
            dataStoring(score, thisrod1);
          }
        }
      }, 10);
    }
  }
});

/* score function */
function dataStoring(scoreObtained, winningRod) {
  if (score > highScore) {
    highScore = score;
    localStorage.setItem(storeName, winningRod);
    localStorage.setItem(storeScore, highScore);
  }
  clearInterval(ballMoving);
  gameReset(winningRod);

  alert(
    winningRod +
      " wins with score of " +
      scoreObtained * 100 +
      ". Max Score is: " +
      highScore * 100
  );
}
