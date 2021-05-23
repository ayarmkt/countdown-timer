const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const deadline = document.querySelector('.deadline');
const remainingTimeText = document.querySelectorAll('.remaining-time');
const timerFinished = document.querySelector('.timer-finished');
//
///////////////////CHANGE DEADLINE HTML///////////////////

const newDeadline = new Date('May 23, 2023, 15:30');
const year = newDeadline.getUTCFullYear();
const month = months[newDeadline.getMonth()];
const date = newDeadline.getDate();
const hours =
  newDeadline.getHours() > 12
    ? newDeadline.getHours() - 12
    : newDeadline.getHours();
const mins = newDeadline.getMinutes();
const timeFormat = newDeadline.getHours() > 12 ? 'pm' : 'am';

deadline.textContent = `${month} ${date} ${year}, ${hours}:${mins}${timeFormat}`;

//
///////////////////CALCULATE REMAINING TIME///////////////////

const deadlineTime = newDeadline.getTime();
let currentTime;
let remainingTime;

const calcTime = function (curTime, futureTime) {
  remainingTime = futureTime - curTime;

  //converting format
  const formatDays = 1000 * 60 * 60 * 24;
  const formatHours = 1000 * 60 * 60;
  const formatMins = 1000 * 60;
  const formatSecs = 1000;

  const remainingDays = Math.floor(remainingTime / formatDays);
  const remainingHours = Math.floor((remainingTime % formatDays) / formatHours);
  const remainingMins = Math.floor((remainingTime % formatHours) / formatMins);
  const remainingSecs = Math.floor((remainingTime % formatMins) / formatSecs);

  const changeNumFormat = function (num) {
    if (num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  };

  const remainingTimeArr = [
    remainingDays,
    remainingHours,
    remainingMins,
    remainingSecs,
  ];

  const newRemainingTimeArr = remainingTimeArr.map((item) =>
    changeNumFormat(item)
  );

  if (remainingTime < 1000) {
    timerFinished.classList.add('active');
    clearInterval(countdown);
    remainingTimeText.forEach((text, index) => (text.innerHTML = '00'));
  } else {
    remainingTimeText.forEach(
      (text, index) => (text.innerHTML = newRemainingTimeArr[index])
    );
  }
};

const runTimer = function () {
  currentTime = new Date().getTime();
  calcTime(currentTime, deadlineTime);

  if (remainingTime < 1000) {
    timerFinished.classList.add('active');
    clearInterval(countdown);
  }
};

//
///////////////////CHANGE REMAINING TIME HTML///////////////////
window.addEventListener('DOMContentLoaded', runTimer);
const countdown = setInterval(runTimer, 1000);
