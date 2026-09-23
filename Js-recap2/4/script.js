function sortArray(numbers) {
    return [...numbers].sort((a, b) => a - b);
}

const numbers = [5, 2, 8, 1, 9];

console.log("Original array:", numbers);

const sortedNumbers = sortArray(numbers);

console.log("Sorted array:", sortedNumbers);