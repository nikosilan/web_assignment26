const number = Number(prompt("Enter a positive integer:"));

const table = document.getElementById("table");

for (let row = 1; row <= number; row++) {

    const tr = document.createElement("tr");

    for (let column = 1; column <= number; column++) {

        const td = document.createElement("td");

        td.textContent = row * column;

        tr.appendChild(td);
    }

    table.appendChild(tr);
}