const numbers = [];

for (let i = 0; i < 5; i++) {
    const number = Number(prompt(`Enter Number ${i + 1}:`));
    numbers.push(number);
}

console.log("Numbers:", numbers);

const searchNumber = Number(prompt("Enter a Number to Search:"));

if (numbers.includes(searchNumber)) {
    console.log(`Number ${searchNumber} is found in the array.`);
} else {
    console.log(`Number ${searchNumber} is not found in the array.`);
}

numbers.pop();

console.log("Updated Numbers:", numbers);

numbers.sort((a, b) => a - b);

console.log("Sorted Numbers:", numbers);

document.getElementById("result").textContent =
    `Sorted Numbers: ${numbers.join(", ")}`;