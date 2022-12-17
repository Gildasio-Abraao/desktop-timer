// HTML Elements
const timerLabel = document.querySelector('.timer-label');
const editBtn = document.querySelector('.edit');
const startBtn = document.querySelector('.start');
const reloadBtn = document.querySelector('.reload');
const stopBtn = document.querySelector('.stop');
const countDownForm = document.querySelector('#change-count-down-time');


// Items for countdown logic
initialTime = timerLabel.innerHTML;
const timeArray = initialTime.split(/[:]+/);
var minutes = timeArray[0];
var seconds = timeArray[1];
countdownIntervalID = null;

// Control system interator
class ControlSystem {
  // Lock Screen
  lockScreen = async () => {
    const response = await window.controller.lockScreen()
    console.log(response) // prints out 'bloquado'
  }
}

// Control Timer countdown
class ControlTimer {
  // Start Countdown
  startTime() {
    clearInterval(countdownIntervalID);
    const SystemController = new ControlSystem;
    countdownIntervalID = setInterval(function(){
      seconds--;
  
      if(seconds < 0) {
        seconds = 59;
        minutes--;
      }
  
      if(minutes < 0) {
        SystemController.lockScreen();
        clearInterval(countdownIntervalID);
        return;
      }
  
      const time = minutes + ':' + seconds.toString().padStart(2, '0');
  
      timerLabel.innerHTML = time;
    }, 1000);
  }

  // Stop Countdown
  stopTime() {
    clearInterval(countdownIntervalID);
    timerLabel.innerHTML = timerLabel.innerHTML;
  }

  // Edit time
  editCountDownTime(newCountDownTime) {
    clearInterval(countdownIntervalID);
    if (!newCountDownTime.includes(':')) {
      return;
    }

    timerLabel.innerHTML = newCountDownTime;
    initialTime = newCountDownTime;
    const newCountDownTimeArr = initialTime.split(/[:]+/);
    minutes = newCountDownTimeArr[0];
    seconds = newCountDownTimeArr[1];
  }

  // Reload Time
  reload() {
    clearInterval(countdownIntervalID);
    const newTimeValue = document.querySelector('#timer-input').value;
    if (newTimeValue.length < 1) {
      minutes = '5';
      seconds = '0';
      timerLabel.innerHTML = '5:00';
      return;
    }
    this.editCountDownTime(newTimeValue);
    timerLabel.innerHTML = newTimeValue;
  }
}

// Call ControlTimer class
const control = new ControlTimer;

startBtn.addEventListener('click', function() {
  control.startTime();
});

stopBtn.addEventListener('click', function() {
  control.stopTime();
});

reloadBtn.addEventListener('click', function() {
  control.reload();
});

countDownForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const newTimeValue = document.querySelector('#timer-input').value;
  countDownForm.classList.toggle('none');
  if (newTimeValue.length < 1) {
    control.editCountDownTime('5:00');
    return;
  }
  control.editCountDownTime(newTimeValue);
});

editBtn.addEventListener('click', function() {
  countDownForm.classList.toggle('none');
});