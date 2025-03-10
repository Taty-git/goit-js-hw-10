import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const inputData = document.querySelector("#datetime-picker");
const btnStart = document.querySelector("[data-start]");

let userSelectedDate;
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

btnStart.addEventListener("click", userSelectedDate => {
    userSelectedDate = new Date(inputData.value);
    if (userSelectedDate < new Date()) {
        window.alert("Please choose a date in the future");
        btnStart.disabled = true;
        return;
    } else {
        btnStart.disabled = false;
    }
});