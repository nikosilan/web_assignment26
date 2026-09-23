const numbers = [];

let input;

while (true) {
    input = prompt("Enter a number (or 'done' to finish):");

    if (input === "done") {
        break;
    }

    const number = Number(input);

    if (!isNaN(number)) {
        numbers.push(number);
    }
}

const evenNumbers = [];

for (const number of numbers) {
    if (number % 2 === 0) {
        evenNumbers.push(number);
    }
}

if (evenNumbers.length > 0) {
    document.getElementById("result").textContent =
        `Even Numbers: ${evenNumbers.join(", ")}`;
} else {
    document.getElementById("result").textContent =
        "Even Numbers: None";
}

console.log("Program ended.");