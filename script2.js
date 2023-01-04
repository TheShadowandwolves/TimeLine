// Just noticed accessing localStorage is banned from codepen, so disabling saving theme to localStorage

const deg = 18;
// const hour = document.querySelector(".d-hour");
// const min = document.querySelector(".d-min");
// const sec = document.querySelector(".d-sec");
// const clock = document.querySelector(".d-clock");
let dayLight;
let Lhour = 1;
let Lmin = 1;
let Lsec = 1;
let lset = 0;
let lrise = 0;
let day12slider = 0;
// let sunrise;
// let sunset;


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
    dayLight = dayLength;
    Lhour = dayLight.slice(0, 2);
    Lmin = dayLight.slice(3, 5);
    Lsec = dayLight.slice(6, 8);
    
});

//    getDayLength();
//    setInterval(getDayLength, 1000);
const dayLenght = () => {
    // document.getElementById("daylight").innerHTML = Lhour + ":" + Lmin + ":" + Lsec;
    }
    
dayLenght();
setInterval(dayLenght, 1000);

const sunrise = () => {
getSunriseSunset(47.559501, 7.588576).then((data) => {
    const sunr = data.results.sunrise;
    let slicerise;
    if (sunrise[4] != ":") {
    slicerise = sunr.slice(0, 4);
    }
    else {
    slicerise = sunr.slice(0, 5);
    }
    // document.getElementById("l-sunrise").innerHTML = slicerise;  // slice off seconds and AM/PM
    lrise = slicerise;
    return slicerise;
});
}

const sunset = () => {
    getSunriseSunset(47.559501, 7.588576).then((data) => {
    const suns = data.results.sunset;
    let sliceset;
    if (sunset[4] != ":") {
    sliceset = suns.slice(0, 4);
    }
    else {
    sliceset = suns.slice(0, 5);
    }

    temp = sliceset.split(":");
    temp[0] = -(temp[0] - 18);
    sliceset = temp.join(":");

    // return sliceset; // Set the sunset variable to the sliceset value
    // sunrise = slicerise; // Set the sunrise variable to the slicerise value
    // document.getElementById("daylight").innerHTML = slicerise;  // slice off seconds and AM/PM
    // document.getElementById("l-sunset").innerHTML = sliceset;  // slice off seconds and AM/PM
    lset = sliceset;
    return sliceset;
});
}

sunrise();
sunset();
setInterval(sunrise, 840000);
setInterval(sunset, 840000);

const difference = () => {
    let inhour = 0;
    let inmin = parseInt((Lhour * 60) / 12 + Lmin / 12);
    while (inmin > 60) {
    inhour += 1;
    inmin = inmin - 60;
    }
    if (inmin < 10) {
    inmin = "0" + inmin;
    }
    day12slider = inhour + ":" + inmin;

    return day12slider;
}

difference();
setInterval(difference, 10000);

const setClock = () => {
    let day = new Date();
    let hh = day.getHours();
    if (hh < 10) {
    hh = "0" + hh;
    }
    let mm = day.getMinutes();
    if (mm < 10) {
    mm = "0" + mm;
    }
    let ss = day.getSeconds();
    if (ss < 10) {
    ss = "0" + ss;
    }
// get time now

    let nighthour = 24 - Lhour;
    let nightmin = 60 - Lmin;
    let nightsec = 60 - Lsec;

document.getElementById("d-clock").innerHTML = hh + ":" + mm + ":" + ss;
document.getElementById("sunclock").innerHTML = "It is the " + day12slider + " of the day";
document.getElementById("suntime").innerHTML = "Sunrise: " + lrise + " Sunset: " + lset;
};



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
    
    var dateString = day + ' ' +   months[month]+ ', ' + year;
    
    document.getElementById("Date").innerHTML = dateString;
    }
updateDate();
setInterval(updateDate, 100000);   


