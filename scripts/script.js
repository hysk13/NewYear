const TARGET_MONTH = 11;
const TARGET_DATE = 25;

const today = new Date();
const untilTable = document.querySelector("#time");

if (today.getMonth() === TARGET_MONTH && today.getDate() === TARGET_DATE) {
    animate();
    untilTable.style.display = "none";
    happyNewYear.style.display = "block";
    happyNewYear.style.fontSize = "50px";
    happyNewYear.textContent = "Happy New Year!";
}