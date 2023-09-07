import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputText = document.querySelector('input[type="text"]');
const btnStart = document.querySelector('button[data-start]');
const boxTimerEl = document.querySelector('.timer');

const valueSpans = boxTimerEl.querySelectorAll('.value');
const daysSpan = valueSpans[0];
const hoursSpan = valueSpans[1];
const minutesSpan = valueSpans[2];
const secondsSpan = valueSpans[3];

let interval;

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
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

btnStart.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    const selectedDate = selectedDates[0].getTime();
    const currentMS = options.defaultDate.getTime();
    console.log(currentMS);
    console.log(selectedDate);
    if (currentMS <= selectedDate) {
      btnStart.removeAttribute('disabled');
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
      btnStart.setAttribute('disabled', true);
      daysSpan.textContent = '00';
      hoursSpan.textContent = '00';
      minutesSpan.textContent = '00';
      secondsSpan.textContent = '00';
      clearInterval(interval);
      return;
    }
  },
};
btnStart.addEventListener('click', functionalCounting);
function functionalCounting() {
  const selectedDate = new Date(inputText.value).getTime();

  clearInterval(interval);

  interval = setInterval(() => {
    const updateTime = new Date().getTime();
    const newArrDataDate = selectedDate - updateTime;
    let arrReferenceValues = convertMs(newArrDataDate);
    // console.log(arrReferenceValues);
    daysSpan.textContent = addLeadingZero(arrReferenceValues.days);
    hoursSpan.textContent = addLeadingZero(arrReferenceValues.hours);
    minutesSpan.textContent = addLeadingZero(arrReferenceValues.minutes);
    secondsSpan.textContent = addLeadingZero(arrReferenceValues.seconds);

    if (
      !arrReferenceValues.days &&
      !arrReferenceValues.hours &&
      !arrReferenceValues.minutes &&
      !arrReferenceValues.seconds
    ) {
      clearInterval(interval);
      Notiflix.Notify.success('Congratulations, countdown is over!');
    }
  }, 1000);
}
flatpickr(inputText, options);
