const todoList = [
    {
        id: 1,
        title: "Buy milk",
        completed: true
    },
    {
        id: 2,
        title: "Buy eggs",
        completed: false
    },
    {
        id: 3,
        title: "Buy bread",
        completed: false
    }
];


const target =
    document.querySelector("#todo-list");


todoList.forEach((todo) => {

    const li =
        document.createElement("li");


    const checkbox =
        document.createElement("input");

    checkbox.type = "checkbox";

    checkbox.id =
        `todo-${todo.id}`;

    checkbox.checked =
        todo.completed;


    const label =
        document.createElement("label");

    label.htmlFor =
        checkbox.id;

    label.textContent =
        todo.title;


    li.appendChild(checkbox);

    li.appendChild(label);

    target.appendChild(li);

});