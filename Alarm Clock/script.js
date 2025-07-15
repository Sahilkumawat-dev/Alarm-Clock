const currentTime = document.querySelector(".current-time"),
  content = document.querySelector(".content"),
  selectMenu = document.querySelectorAll("select"),
  setAlarmBtn = document.querySelector("button");

let alarmTime, isAlarmSet = false,
  ringtone = new Audio("twirling-intime-lenovo-k8-note-alarm-tone-41440.mp3"); 

for (let i = 12; i > 0; i--) {
  i = i < 10 ? `0${i}` : i; 
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
  i = i < 10 ? `0${i}` : i; 
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

["AM", "PM"].forEach(ampm => {
  let option = `<option value="${ampm}">${ampm}</option>`;
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
});

setInterval(() => {
  let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = h >= 12 ? "PM" : "AM";

  h = h > 12 ? h - 12 : h === 0 ? 12 : h; 
  h = h < 10 ? `0${h}` : h; 
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;

  currentTime.textContent = `${h}:${m}:${s} ${ampm}`;

  //check current time match alaram time
  if (alarmTime === `${h}:${m} ${ampm}`) {
    ringtone.play();
    ringtone.loop = true;
  }
}, 1000);

//function for clear alram
function setAlarm() {
  if (isAlarmSet) {
    alarmTime = ""; // Clear the alarm time
    ringtone.pause();
    ringtone.currentTime = 0; // Reset ringtone
    content.classList.remove("disable");
    setAlarmBtn.textContent = "Set Alarm";
    isAlarmSet = false;
    return;
  }

  // Get the selected time values
  let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
  if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
    return alert("Please select a valid time to set the alarm!");
  }
  // NotesSociety
  alarmTime = time;
  isAlarmSet = true;
  content.classList.add("disable"); // Disable dropdowns
  setAlarmBtn.textContent = "Clear Alarm";
}

// Event listener for the Set Alarm button
setAlarmBtn.addEventListener("click", setAlarm);
