let boxes = document.querySelectorAll(".box");
let game = document.querySelector(".game");
let reset = document.querySelector(".reset");
let scoreBoard = document.querySelector("#score");
let score = 0;
let moleImage = "hippopotamus.png";
let timeleft = 20;
let timerid;
let timerDisplay = document.querySelector("#timer");

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("clicked");
    if (box.classList.contains("mole")) {
      score++;
      scoreBoard.innerText = score;
    } else {
      box.classList.add("flash");
      console.log("miss");
      setTimeout(() => {
        box.classList.remove("flash");
      }, 200);
    }
  });
});

let moleInterval;
function startGame() {
  timerid = setInterval(() => {
    timeleft--;
    timerDisplay.innerText = timeleft; // UI update

    if (timeleft === 0) {
      clearInterval(timerid);
      clearInterval(moleInterval);
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });
      game.classList.add("disabled");
      document.querySelector("#over").innerText = "Game Over";
    }
  }, 1000);

  moleInterval = setInterval(() => {
    boxes.forEach((box) => {
      box.classList.remove("mole");
      box.innerText = "";
    });
    let randNum = Math.floor(Math.random() * boxes.length); // floor he decimal value collect krt so we use floor
    boxes[randNum].classList.add("mole");
    boxes[randNum].innerHTML = `<img src="${moleImage}" alt="mole" />`;
  }, 1000); // Mole he 1000ms madhe change hoyil
}

reset.addEventListener("click", () => {
  console.log("clicked");
  score = 0;
  scoreBoard.innerText = 0;
  timeleft = 20;
  document.querySelector("#over").innerText = "";
  clearInterval(timerid);
  clearInterval(moleInterval);
  game.classList.remove("disabled");

  boxes.forEach((box) => {
    box.style.pointerEvents = "auto";
    box.classList.remove("mole");
    box.innerHTML = "";
  });
  startGame();
});
startGame();
