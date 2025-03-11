import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const inputText = document.querySelector("#datetime-picker");
const btnStart = document.querySelector("[data-start]");
const timerDisplay = document.querySelector(".timer");

let userSelectedDate;
let timerInterval;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};
flatpickr("#datetime-picker", options);

inputText.addEventListener('input', () => {
  userSelectedDate = new Date(inputText.value);

  if (userSelectedDate > new Date()) {
    btnStart.disabled = false;
    btnStart.style.backgroundColor = "#4E75FF";
    btnStart.style.color = "#FFFFFF";
  } else {
    btnStart.disabled = true;
    btnStart.style.backgroundColor = "#CFCFCF";
    btnStart.style.color = "#989898";
  
    iziToast.error({
      message: "Please choose a date in the future",
      position: "topCenter",
      timeout: 3000 
    });
  }
});

function startTimer(targetDate) {
  timerInterval = setInterval(() => {
    const currentTime = new Date();
    const timeRemaining = targetDate - currentTime;

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      updateTimer(0, 0, 0, 0); 
      inputText.disabled = false;
      btnStart.disabled = false;
      btnStart.style.backgroundColor = "#4E75FF";
      btnStart.style.color = "#FFFFFF";
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeRemaining);
    updateTimer(days, hours, minutes, seconds); 
  }, 1000);
}

function updateTimer(days, hours, minutes, seconds) {
  document.querySelector("[data-days]").textContent = days.toString().padStart(2, '0');
  document.querySelector("[data-hours]").textContent = hours.toString().padStart(2, '0');
  document.querySelector("[data-minutes]").textContent = minutes.toString().padStart(2, '0');
  document.querySelector("[data-seconds]").textContent = seconds.toString().padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

btnStart.addEventListener("click", () => {
  const currentDate = Date.now(); 
  const userDateInMs = userSelectedDate.getTime(); 
  
  if (userSelectedDate <= new Date()) {
    iziToast.error({
      message: "Please choose a date in the future",
      timeout: 3000
    });
    return;
  }

  inputText.disabled = true;
  btnStart.disabled = true;
  btnStart.style.backgroundColor = "#CFCFCF";
  btnStart.style.color = "#989898";

  startTimer(userSelectedDate);
});