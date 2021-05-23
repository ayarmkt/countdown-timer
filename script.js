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

const newDeadline = new Date('May 23, 2021, 14:43');
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

const calcTime = function () {
  const deadlineTime = newDeadline.getTime();
  let currentTime = new Date().getTime();
  const remainingTime = deadlineTime - currentTime;

  //converting format
  const formatDays = 1000 * 60 * 60 * 24;
  const formatHours = 1000 * 60 * 60;
  const formatMins = 1000 * 60;
  const formatSecs = 1000;

  const remainingDays = Math.floor(remainingTime / formatDays);
  const remainingHours = Math.floor((remainingTime % formatDays) / formatHours);
  const remainingMins = Math.floor((remainingTime % formatHours) / formatMins);
  const remainingSecs = Math.floor((remainingTime % formatMins) / formatSecs);

  const remainingTimeArr = [
    remainingDays,
    remainingHours,
    remainingMins,
    remainingSecs,
  ];

  remainingTimeArr.map((item) => (item < 10 ? `0${item}` : item));

  console.log(remainingTimeArr.map((item) => (item < 10 ? `0${item}` : item)););

  if (remainingTime < 1) {
    timerFinished.classList.add('active');
    clearInterval(countdown);
    remainingTimeText.forEach(function (text, index) {
      text.innerHTML = 00;
    });
  } else {
    const countdown = setInterval(calcTime, 1000);
    remainingTimeText.forEach(
      (text, index) => (text.innerHTML = remainingTimeArr[index])
    );
  }
};

//
///////////////////CHANGE REMAINING TIME HTML///////////////////
calcTime();
