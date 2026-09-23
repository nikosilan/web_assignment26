const number = Number(prompt("Enter a positive integer:"));

let sum = 0;

for (let i = 1; i <= number; i++) {
    sum += i;
}

document.getElementById("result").textContent =
    `The sum is: ${sum}`;