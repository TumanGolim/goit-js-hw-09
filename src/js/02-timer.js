import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    updateStartButtonState(selectedDates[0]);
  },
};

const datetimePicker = flatpickr('#datetime-picker', options);

const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let countdownInterval;

function updateStartButtonState(selectedDate) {
  if (selectedDate instanceof Date && !isNaN(selectedDate)) {
    startButton.disabled = false; 
  } else {
    startButton.disabled = true; 
  }
}

updateStartButtonState(null);

startButton.addEventListener('click', () => {
  const selectedDate = datetimePicker.selectedDates[0];

  if (!selectedDate) {
    alert('Будь ласка, виберіть дійсну дату і час.');
    return;
  }

  const updateTimer = () => {
    const timeRemaining = selectedDate - new Date();

    if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
      updateTimerDisplay({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
      alert('Зворотний відлік завершено!');
    } else {
      const time = convertMs(timeRemaining);
      updateTimerDisplay(time);
    }
  };

  updateTimer();

  countdownInterval = setInterval(updateTimer, 1000);
});

function updateTimerDisplay(time) {
  daysElement.textContent = addLeadingZero(time.days);
  hoursElement.textContent = addLeadingZero(time.hours);
  minutesElement.textContent = addLeadingZero(time.minutes);
  secondsElement.textContent = addLeadingZero(time.seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}
