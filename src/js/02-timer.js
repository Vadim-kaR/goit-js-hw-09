import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
  days: document.querySelector('.value[data-days]'),
  hours: document.querySelector('.value[data-hours]'),
  minutes: document.querySelector('.value[data-minutes]'),
  seconds: document.querySelector('.value[data-seconds]'),
  startBtn: document.querySelector("button[data-start]"),
}
refs.startBtn.disabled = true;
let selectedDate = null;
let delta = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {

    if (selectedDates[0] < new Date()) { 
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    refs.startBtn.disabled = false;
    selectedDate = selectedDates[0];
  },
};

flatpickr('input#datetime-picker', options)

refs.startBtn.addEventListener('click', onBtnTimerStart);

function onBtnTimerStart() { 
  let timerID = null;

  timerID = setInterval(() => {
  const currentTime = new Date();
  delta = selectedDate - currentTime;
    paintTimeCounter();
    
    if (delta <= 0) { 
      delta = 0;
      paintTimeCounter();
      clearInterval(timerID);
  }

  }, 1000);
      
}

function paintTimeCounter() { 
  const msData = convertMs(delta);
  const convertedData = addLeadingZero(msData);
  const {  newDays, newHours, newMinutes, newSeconds } = convertedData;

  refs.days.textContent = newDays;
  refs.hours.textContent = newHours;
  refs.minutes.textContent = newMinutes;
  refs.seconds.textContent = newSeconds;
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero({ days, hours, minutes, seconds }) { 
  
  const newDays = String(days).padStart(2, '0');
  const newHours = String(hours).padStart(2, '0');
  const newMinutes = String(minutes).padStart(2, '0');
  const newSeconds = String(seconds).padStart(2, '0');
  
  return { newDays, newHours, newMinutes, newSeconds };
  
}


