   // Just noticed accessing localStorage is banned from codepen, so disabling saving theme to localStorage

const deg = 18;
const hour = document.querySelector(".hour");
const min = document.querySelector(".min");
const sec = document.querySelector(".sec");
const clocktimer = document.querySelector(".timer");
let dayLight;
let Lhour = 1;
let Lmin;
let Lsec;
let handlePosition = -120;
  // Set the final position of the clock handle
let finalPosition = 120;
let degree = 1 / 24 * 360;

async function getSunriseSunset(latitude, longitude) {
  const response = await fetch(`https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}`);
  const data = await response.json();
  return data;
}
async function getDayLength(latitude, longitude) {
  const response = await fetch(`https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}`);
  const data = await response.json();
  const dayLength = data.results.day_length;
  return dayLength;
}

getDayLength(47.559501, 7.588576).then((dayLength) => {
//   document.getElementById("daylight").innerHTML = dayLength; 
    dayLight = dayLength;
    Lhour = dayLight.slice(0, 2);
    Lmin = dayLight.slice(3, 5);
    Lsec = dayLight.slice(6, 8);
});

getDayLength();
setInterval(getDayLength, 1000);



const setSet = () => {
getSunriseSunset(47.559501, 7.588576).then((data) => {
  const sunrise = data.results.sunrise;
  const sunset = data.results.sunset;

  if (sunrise[4] == ":") {
    var slicerise = sunrise.slice(0, 4);
  }
  else {
    var slicerise = sunrise.slice(0, 5);
  }
  if (sunset[4] == ":") {
    var sliceset = sunset.slice(0, 4);
  }
  else {
    var sliceset = sunset.slice(0, 5);
  }

  temp = sliceset.split(":");
  temp[0] = -(temp[0] - 18);
  sliceset = temp.join(":");

  document.getElementById("sunrise").innerHTML = slicerise;  // slice off seconds and AM/PM
  document.getElementById("sunset").innerHTML = sliceset;  // slice off seconds and AM/PM
});
}
setSet();
setInterval(setSet, 100000);
const setClock = () => {
  let day = new Date();
  let hh = day.getHours() * 30;
  let mm = day.getMinutes() * deg;
  let ss = day.getSeconds() * deg;
  let thh = day.getHours() * 60;
  let tmm = day.getMinutes() * degree;
  let tss = day.getSeconds() * degree;
  let posmin = 20 * deg * Lmin; 
  let posmax = 40 * deg * Lmin;

  let nighthour = 24 - Lhour;
  let nightmin = 60 - Lmin;
  let nightsec = 60 - Lsec;
  const hourDegree = (1 / 24) * 360;
  let d = day.getHours();
  document.getElementById("daylight").innerHTML = d;  // display night time in HTML element
  getSunriseSunset();

  // let totalHours = parseInt(dayHours) + parseInt(nightHours);  // total number of hours in a day
  // let hourDegree = (1 / totalHours) * 360;  // degree per hour

  // update hour hand
  
  // hour.style.transform = `rotateZ(${totalHours + currentHour / hourDegree}deg)`;

  // hour.style.transform = `rotateZ(${Lhour + Lmin / 12}deg)`;
  // min.style.transform = `rotateZ(${Lmin}deg)`;
  hour.style.transform = `rotateZ(${hh + mm / 12}deg)`;
  min.style.transform = `rotateZ(${tmm}deg)`;
  sec.style.transform = `rotateZ(${ss}deg)`;
  // Set the speed of the movement (in degrees per second)
  let speed = (  d * 60 * 1000 ) /  1;
  clocktimer.style.transform = `rotateZ(${hh + tmm / 12}deg)`;


};

// function updateClock() {
//   dayLength = getDayLength(47.559501, 7.588576);
//   nightHours = 24 - dayLength;
//   const dayHours = dayLength.split(":")[0];  // get number of hours in day
//   const nightHours = nightLength.split(":")[0];  // get number of hours in night
//   const totalHours = parseInt(dayHours) + parseInt(nightHours);  // total number of hours in a day
//   const hourDegree = (1 / totalHours) * 360;  // degree per hour

//   // update hour hand
  
//   hour.style.transform = "rotateZ(" + (hourDegree * currentHour) + "deg)";
// }


// first time
setClock();
// Update every 1000 ms
setInterval(setClock, 1000);

const switchTheme = (evt) => {
  const switchBtn = evt.target;
  if (switchBtn.textContent.toLowerCase() === "light") {
    switchBtn.textContent = "dark";
    // localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    switchBtn.textContent = "light";
    // localStorage.setItem("theme", "light"); //add this
    document.documentElement.setAttribute("data-theme", "light");
  }
};

const switchModeBtn = document.querySelector(".switch-btn");
switchModeBtn.addEventListener("click", switchTheme, false);

let currentTheme = "dark";
// currentTheme = localStorage.getItem("theme")
//  ? localStorage.getItem("theme")
//  : null;

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  switchModeBtn.textContent = currentTheme;
}
function updateDate() {
    var now = new Date();
    var month = now.getMonth();
    var day = now.getDate();
    var year = now.getFullYear();
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
    var dateString = months[month] + ' ' + day + ', ' + year;
  
    document.getElementById("Date").innerHTML = dateString;
  }
updateDate();
setInterval(updateDate, 100000);   


