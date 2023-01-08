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
let nighthour = 0;
let nightmin = 0;
let nighthoursplit = 0;
let nightminsplit = 0;
let totalhour = 0;
let dhour = 0;
let dmin = 0;
let ehour = 0;
let emin = 0;
let fhour = 0;
let fmin = 0;
let tot = 0;
let xhour = 0;
let xmin = 0;
let itmin = 0;
let currentperiodhour = 0;
let currentperiodmin = 0;
let timearrayh = [];
let timearraym = [];
let nightarrayh = [];
let nightarraym = [];
let currentperiod = 0;


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
getSunriseSunset(47.559601, 7.588576).then((data) => {
    const sunr = data.results.civil_twilight_begin;
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
    getSunriseSunset(47.559601, 7.588576).then((data) => {
    const suns = data.results.civil_twilight_end;
    let sliceset;
    if (sunset[4] != ":") {
    sliceset = suns.slice(0, 4);
    }
    else {
    sliceset = suns.slice(0, 5);
    }

    temp = sliceset.split(":");
    temp[0] = parseInt(temp[0]) + 12;
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

const diff = () => {
    

if (lset != 0 || lrise != 0) {
    dhour = lset.slice(0, 2);
    dmin = lset.slice(3, 5);
    ehour = lrise.slice(0, 2);
    emin = lrise.slice(2, 4);
    fhour = parseInt(dhour) - parseInt(ehour);
    fmin = parseInt(dmin) - parseInt(emin);
    // tot = fhour + ":" + fmin;
    
    itmin = parseInt((fhour * 60) / 12 + fmin / 12);
    while (itmin > 60) {
    xhour += 1;
    itmin = itmin - 60;
    }
    if (itmin < 10) {
    itmin = "0" + itmin;
    }
    tot = xhour + ":" + itmin;
    nighthour = 24 - fhour;
    nightmin = 60 - fmin;
    if (nightmin < 0) {
    nightmin = 60 + nightmin;
    nighthour -= 1;
    
    }
    totalhour = fhour + ":" + fmin;
    }
    
    nighthoursplit = parseInt(nighthour / 4);
    nightminsplit = parseInt(nightmin / 4);
    // console.log("night: " + nighthoursplit + ":" + nightminsplit);

    // console.log(emin);
    for (let i = 0; i < 12; i++) {
        timearrayh[i] = parseInt(ehour) + i * xhour;
        timearraym[i] = parseInt(emin) + i * itmin;
        // console.log("time: " + timearraym[0]);
        while (timearraym[i] > 60) {
            timearraym[i] = timearraym[i] - 60;
            timearrayh[i] += 1;
        }
        console.log(timearrayh[i]);
    }

    for (let i = 0; i < 4; i++) {
        nightarrayh[i] = parseInt(dhour) + i * nighthoursplit;
        nightarraym[i] = parseInt(dmin) + i * nightminsplit;
        while (nightarraym[i] > 60) {
            nightarraym[i] = nightarraym[i] - 60;
            nightarrayh[i] += 1;
        }
        while (nightarrayh[i] > 24) {
            nightarrayh[i] = nightarrayh[i] - 24;
        }
        // console.log("night: " + nightarrayh[i] + ":" + nightarraym[i]);
    }
}    

diff();
setInterval(diff, 10000);

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

let dayornight = "day";
currentperiodhour = parseInt(hh) + xhour;
currentperiodmin = parseInt(mm) + itmin;
if (currentperiodmin > 60) {
    currentperiodmin = currentperiodmin - 60;
    currentperiodhour += 1;
    }
if (dayornight == "day"){
    for (let j = 0; j < 12; j++) {
        // console.log(timearrayh[j] + ":" + timearraym[j]);
        if (hh >= timearrayh[j] && hh < dhour) {
            currentperiod = j +1;
            dayornight = "day";
        }
        else if (hh >= dhour){
            dayornight = "night";
        }
    }
}
if (dayornight == "night") {
    for (let j = 0; j < 4; j++) {
            // console.log(timearrayh[j] + ":" + timearraym[j]);
            if (hh >= nightarrayh[j] && hh <= 24 && hh > 12 && nightarrayh[j] > 12 || hh >= nightarrayh[j] && hh >= 0 && hh < ehour) {
                currentperiod = j +1;
                dayornight = "night";
            }
            else if (hh >= ehour){
                dayornight = "day";
            }
    }
}
th = "th";
if (currentperiod == 1) {
    th = "st";
}
else if (currentperiod == 2) {
    th = "nd";
}
else if (currentperiod == 3) {
    th = "rd";
}

// let night = nighthour + ":" + nightmin;
// console.log(nightarrayh[3] + ":" + nightarraym[3]);
document.getElementById("d-clock").innerHTML = hh + ":" + mm + ":" + ss;
document.getElementById("sunclock").innerHTML = "It is the " + currentperiod + " " + th + " hour of the " + dayornight;
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


