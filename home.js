var e = document.getElementById("clock");
var list = document.getElementById("list");
var alarm = new Map();


// Function to get the current time in given format 
function getTime() {
  //   console.log(datetime);
  var currentdate = new Date();
  var datetime =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    (currentdate.getMinutes() < 10
      ? "0" + currentdate.getMinutes()
      : currentdate.getMinutes()) +
    ":" +
    (currentdate.getSeconds() < 10
      ? "0" + currentdate.getSeconds()
      : currentdate.getSeconds()) +
    ":" +
    (currentdate.getMilliseconds() % 10) +
    ": " +
    (currentdate.getHours() < 12 ? "A.M" : "P.M");
  e.innerHTML = datetime;
  return datetime;
}


// Function to show the current time in the time-box 
function showTime() {
  var currentdate = new Date();
  var datetime =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " @ " +
    (currentdate.getHours() % 12 < 10
      ? "0" + (currentdate.getHours() % 12)
      : currentdate.getHours() % 12) +
    ":" +
    (currentdate.getMinutes() < 10
      ? "0" + currentdate.getMinutes()
      : currentdate.getMinutes()) +
    ":" +
    (currentdate.getSeconds() < 10
      ? "0" + currentdate.getSeconds()
      : currentdate.getSeconds()) +
    ":" +
    (currentdate.getMilliseconds() % 10) +
    ": " +
    (currentdate.getHours() < 12 ? "A.M" : "P.M");
  e.innerHTML = datetime;
}

// This interval is set to 1 millisecond to ensure that the current time is accurate upto milliseconds
setInterval(showTime, 1);


//  function to add functionatlites for setting the time values for alarm
function create_clock() {
  var hr = document.getElementById("hr");
  for (let i = 0; i < 12; i++) {
    let opt = document.createElement("option");
    opt.appendChild(document.createTextNode(i + 1));
    opt.value = i + 1;
    hr.appendChild(opt);
  }
  // opt.value = "Select time";
  // time_box.appendChild(opt);

  var min = document.getElementById("min");
  for (let i = 0; i < 60; i++) {
    let opt = document.createElement("option");
    opt.appendChild(document.createTextNode(i < 10 ? "0" + i : i));
    opt.value = i;
    min.appendChild(opt);
  }

  var sec = document.getElementById("sec");
  for (let i = 0; i < 60; i++) {
    let opt = document.createElement("option");
    opt.appendChild(document.createTextNode(i < 10 ? "0" + i : i));
    opt.value = i;
    sec.appendChild(opt);
  }
}

create_clock();

//  Function to alert the user whenever any alarm goes off
function alert_helper(index,time) {
  if (alarm.has(time)) {
    alert("Time up !!");
    delete_helper(index,time );
    if (alarm.get(time) > 1) {
      alarm.set(time,parseInt(alarm.get(time)) - 1);
    } else {
      alarm.delete(time);
    }
  }
}

// Function to delete any set alarm
function delete_helper(index, time_ms) {
  document.getElementById(index).remove();
  if (alarm.has(time_ms)) {
    if (alarm.get(time_ms) > 1) {
      alarm.set(time_ms,parseInt(alarm.get(time_ms)) - 1);
    } else {
      alarm.delete(time_ms);
    }
  }
  console.log("deleted");
}


// Function to set alarm .. It triggers whenever set alarm is called
function setAlarm() {
  let hr = document.getElementById("hr").value;
  hr = hr < 10 ? "0" + hr : hr;
  let min = document.getElementById("min").value;
  min = min < 10 ? "0" + min : min;
  let sec = document.getElementById("sec").value;
  sec = sec < 10 ? "0" + sec : sec;
  let temphr = hr;
  hr =
    document.getElementById("lg").value == "pm" ? (hr = parseInt(hr) + 12) : hr;
//   console.log(hr);
let times = (temphr + ":" + min + ":" + sec + ": " + document.getElementById("lg").value).trim();
let time = (hr + ":" + min + ":" + sec + ": " + document.getElementById("lg").value).trim();
  let mainTime = getTime().split("@")[1].split("P.M")[0].trim();
  //   console.log(mainTime);
  //   console.log(time);

  //   console.log(time < mainTime);
  let time_ms = parseInt(hr) * 60 * 60 + parseInt(min) * 60 + parseInt(sec);
  let main_ms =
    parseInt(mainTime.split(":")[0].trim()) * 60 * 60 +
    parseInt(mainTime.split(":")[1].trim()) * 60 +
    parseInt(mainTime.split(":")[2].trim());
  let global_ms = 24 * 60 * 60;

  let r = 0;
  

  if (mainTime < time) {
    r = time_ms - main_ms;
    setTimeout(function () {
      alert_helper(mainTime,time_ms);
    }, r * 1000);
  } else {
    r = global_ms - Math.abs(time_ms - main_ms);
    setTimeout(function () {
      alert_helper(mainTime,time_ms);
    }, r * 1000);
  }

  console.log("Remaining time is :" + r + " seconds.");
  if (alarm.has(time_ms)) {
    alarm.set(time_ms, parseInt(alarm.get(time_ms)) + 1);
  } else {
    alarm.set(time_ms, 1);
  }

  // let new_alarm = document.createElement("div");
  // let main_box = document.createElement("div");
  // let delete_button = document.createElement("button");
  // delete_button.innerHTML = "delete";
  // new_alarm.innerHTML = time;
  // main_box.appendChild(delete_button);
  let new_alarm = document.createElement("div");
  let main_box = document.createElement('div');
  let delete_button =document.createElement('i');
  delete_button.classList.add("fas", "fa-trash");
  new_alarm.innerHTML = times;
  new_alarm.classList.add('alarm-el'); 
  new_alarm.appendChild(delete_button);
  main_box.appendChild(new_alarm);
  main_box.id = mainTime;
  delete_button.addEventListener("click", function () {
    delete_helper(main_box.id, time_ms);
  });
  list.appendChild(main_box);
}

var set = document.getElementById("set");
set.addEventListener("click", function () {
  setAlarm();
});
