const cityImg = document.querySelector('#city-bg');
const curTime = document.querySelector('#time');
const happyNewYear = document.querySelector("#after-new-year");

const daysUntil = document.querySelector("#daysUntil");
const hoursUntil = document.querySelector("#hoursUntil");
const minutesUntil = document.querySelector("#minutesUntil");
const secondsUntil = document.querySelector("#secondsUntil");

/**
 * Precondition: {Number} unit is a valid integer between 0 and 3.
 * @param {Date} now | Date object for now
 * @param {Number} unit | 0 = daysUntil, 1 = hoursUntil, 2 = minutesUntil, 3 = secondsUntil 
 * @returns {Number} | the requested data
 */
function untilNewYear(now, unit) {
    const nextYear = now.getFullYear() + 1;
    const newYearDate = new Date(nextYear, 0, 1);
    const diff = newYearDate - now;

    const units = {
        0: 1000 * 60 * 60 * 24, // days
        1: 1000 * 60 * 60,      // hours
        2: 1000 * 60,           // minutes
        3: 1000                 // seconds
    };

    const oneOfUnit = units[unit];
    
    return unit === 0 
        ? Math.ceil(diff / oneOfUnit)   // if days, round up
        : Math.floor(diff / oneOfUnit); // if hours, minutes, or seconds, round down
}

function update() {

    const now = new Date();
    if ((now.getHours() < 6 || now.getHours() >= 16) && !cityImg.src.endsWith("./images/bam.png")) {
        cityImg.src = "./images/bam.png";
        curTime.style.color = "white";
        happyNewYear.style.color = "white";
    } else if (!cityImg.src.endsWith("./images/achim.png")) {
        cityImg.src = "./images/achim.png";
        curTime.style.color = "black";
        happyNewYear.style.color = "black";
    }

    daysUntil.textContent = untilNewYear(now, 0);
    hoursUntil.textContent = untilNewYear(now, 1) % 24;
    minutesUntil.textContent = untilNewYear(now, 2) % 60;
    secondsUntil.textContent = untilNewYear(now, 3) % 60;

    if (untilNewYear(now, 0) == 7 && untilNewYear(now, 1) % 24 == 6 && untilNewYear(now, 2) % 60 == 0) {
        curTime.style.display = "none";
        happyNewYear.style.display = "block";
        happyNewYear.style.fontSize = "75px";
        happyNewYear.textContent = untilNewYear(now, 3) % 60;
    }

    document.body.onkeyup = function(e) {
        if (e.key == " " || e.code == "Space") {
            animate();
        }
    }

}

setInterval(update, 1000);