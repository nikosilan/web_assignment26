const score = Number(prompt("Enter your score:"));

let grade;

if (score >= 0 && score <= 39) {
    grade = 0;
} else if (score <= 51) {
    grade = 1;
} else if (score <= 63) {
    grade = 2;
} else if (score <= 75) {
    grade = 3;
} else if (score <= 87) {
    grade = 4;
} else if (score <= 100) {
    grade = 5;
} else {
    grade = "Invalid score";
}

document.getElementById("result").textContent =
    `Grade: ${grade}`;