// script.js
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let timerInterval;
let running = false;

const minutesElem = document.getElementById("minutes");
const secondsElem = document.getElementById("seconds");
const millisecondsElem = document.getElementById("milliseconds");
const startPauseBtn = document.getElementById("start-pause-btn");
const resetBtn = document.getElementById("reset-btn");
const lapBtn = document.getElementById("lap-btn");
const lapsContainer = document.getElementById("laps");

function updateDisplay() {
  minutesElem.textContent = String(minutes).padStart(2, "0");
  secondsElem.textContent = String(seconds).padStart(2, "0");
  millisecondsElem.textContent = String(milliseconds).padStart(2, "0");
}

function startTimer() {
  timerInterval = setInterval(() => {
    milliseconds += 1;
    if (milliseconds === 100) {
      milliseconds = 0;
      seconds += 1;
    }
    if (seconds === 60) {
      seconds = 0;
      minutes += 1;
    }
    updateDisplay();
  }, 10); // Runs every 10ms
}

function stopTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  stopTimer();
  milliseconds = 0;
  seconds = 0;
  minutes = 0;
  running = false;
  updateDisplay();
  lapsContainer.innerHTML = ""; // Clear laps
  startPauseBtn.textContent = "Start";
}

function recordLap() {
  const lapTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(milliseconds).padStart(2, "0")}`;
  const lapItem = document.createElement("li");
  lapItem.textContent = `Lap: ${lapTime}`;
  lapsContainer.appendChild(lapItem);
}

startPauseBtn.addEventListener("click", () => {
  if (!running) {
    startTimer();
    startPauseBtn.textContent = "Pause";
  } else {
    stopTimer();
    startPauseBtn.textContent = "Start";
  }
  running = !running;
});

resetBtn.addEventListener("click", resetTimer);

lapBtn.addEventListener("click", () => {
  if (running) {
    recordLap();
  }
});
