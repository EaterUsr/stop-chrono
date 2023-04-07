import { createPopup } from "./popup";
import confetti from "canvas-confetti";
import "./style.css";

const secondsContainer = document.querySelector("#seconds")!;
const hundredsContainer = document.querySelector("#hundreds")!;
const infoContainer = document.querySelector("#info")!;

const timeBetweenUpdates = 10;
const correctSeconds = 1;
const correctHundreds = 0;

let seconds = 0;
let hundreds = 0;
let isTimerActive = false;
let interval: number;

const infos = [
  "Appuyez sur la barre espace pour démarrer le chronomètre",
  "Arrêtez le chronomètre avec la barre espace à 1 seconde pile",
];

window.addEventListener("keyup", e => {
  if (e.key === " ") toggleTimer();
});

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
  infoContainer.textContent = infos[1];
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
  infoContainer.textContent = infos[0];
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
