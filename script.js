const refs = {
  startBtn: document.querySelector("#start_btn"),
  screen: document.querySelectorAll(".screen"),
  timeBtns: document.querySelector("#time-list"),
  timeEl: document.querySelector("#time"),
  board: document.querySelector("#board"),
  scoreBoard: document.querySelector("#score"),
};

let time = 0;
let score = 0;

refs.startBtn.addEventListener("click", (e) => {
  e.preventDefault();
  refs.screen[0].classList.add("up");
});

refs.timeBtns.addEventListener("click", (e) => {
  if (e.target.classList.contains("time-btn")) {
    time = parseInt(e.target.getAttribute("data-time"));
    startGame();
  }
});

refs.board.addEventListener("click", (e) => {
  if (e.target.classList.contains("circle")) {
    score++;
    refs.scoreBoard.innerHTML = score;
    refs.scoreBoard.classList.add("primary");
    e.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  setInterval(decreaseTime, 1000);
  refs.screen[1].classList.add("up");
  setTime(time);
  createRandomCircle();
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  refs.timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
  refs.timeEl.parentNode.classList.add("hide");
  refs.scoreBoard.parentNode.classList.add("hide");
  refs.board.innerHTML = `<h1>Score: <span class="primary">${score}</span> </h1>`;
}

function createRandomCircle() {
  const circle = document.createElement("div");
  const size = getRandomNumber(15, 45);
  const { width, height } = refs.board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);

  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;

  refs.board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
