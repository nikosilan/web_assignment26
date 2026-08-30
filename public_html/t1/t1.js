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


const target = document.querySelector("#todo-list");


todoList.forEach((todo) => {

    const checked =
        todo.completed ? "checked" : "";

    target.insertAdjacentHTML(
        "beforeend",
        `
            <li>
                <input
                    type="checkbox"
                    id="todo-${todo.id}"
                    ${checked}
                >

                <label for="todo-${todo.id}">
                    ${todo.title}
                </label>
            </li>
        `
    );

});