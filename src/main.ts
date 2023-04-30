import { createPopup } from "./popup";
import confetti from "canvas-confetti";
import "./style.css";

const secondsContainer = document.querySelector("#seconds") as HTMLElement;
const hundredsContainer = document.querySelector("#hundreds") as HTMLElement;
const toggleButton = document.querySelector("#toggle-button") as HTMLElement;

const timeBetweenUpdates = 10;
const correctSeconds = 1;
const correctHundreds = 0;

let seconds = 0;
let hundreds = 0;
let isTimerActive = false;
let interval: number;

const colors = ["#00b200", "#b20000"];
const buttonContents = ["démarrer", "arrêter"];

window.addEventListener("keyup", e => {
  if (e.key === " ") toggleTimer();
});
toggleButton.addEventListener("click", () => toggleTimer());

function toggleTimer() {
  isTimerActive = !isTimerActive;
  if (isTimerActive) {
    startTimer();
    return;
  }
  stopTimer();
}

function startTimer() {
  interval = setInterval(updateTimer, timeBetweenUpdates);
  toggleButton.style.setProperty("--color", colors[1]);
  toggleButton.textContent = buttonContents[1];
}
function updateTimer() {
  incrementTime();
  renderTime();
}
function incrementTime() {
  if (hundreds === 99) {
    hundreds = 0;
    seconds++;
    return;
  }
  hundreds++;
}
function renderTime() {
  secondsContainer.textContent = formatNumber(seconds);
  hundredsContainer.textContent = formatNumber(hundreds);
}
function stopTimer() {
  clearInterval(interval);
  isTimeGood();
  resetTime();
  toggleButton.style.setProperty("--color", colors[0]);
  toggleButton.textContent = buttonContents[0];
}
function resetTime() {
  seconds = 0;
  hundreds = 0;
}
function formatNumber(nbr: number) {
  if (nbr < 10) return `0${nbr}`;
  return String(nbr);
}
function isTimeGood() {
  const difference = calcDifference();
  if (difference === 0) {
    createPopup("parfait");
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    return;
  }
  if (difference < 5) {
    createPopup("bien");
    return;
  }
  if (difference < 10) {
    createPopup("moyen");
    return;
  }
  createPopup("nul");
}

function calcDifference() {
  const localHundreds = hundreds + seconds * 100;
  const localCorrectHundreds = correctHundreds + correctSeconds * 100;
  return Math.abs(localCorrectHundreds - localHundreds);
}
