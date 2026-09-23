const side1 = Number(prompt("Enter the first side:"));
const side2 = Number(prompt("Enter the second side:"));
const side3 = Number(prompt("Enter the third side:"));

let result;

if (side1 === side2 && side2 === side3) {
    result = "Equilateral triangle";
} else if (
    side1 === side2 ||
    side1 === side3 ||
    side2 === side3
) {
    result = "Isosceles triangle";
} else {
    result = "Scalene triangle";
}

document.getElementById("result").textContent = result;