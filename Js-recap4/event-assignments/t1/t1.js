// array for todo list

const todoList = [
    {
        id: 1,
        task: 'Learn HTML',
        completed: true,
    },
    {
        id: 2,
        task: 'Learn CSS',
        completed: true,
    },
    {
        id: 3,
        task: 'Learn JS',
        completed: false,
    },
    {
        id: 4,
        task: 'Learn TypeScript',
        completed: false,
    },
    {
        id: 5,
        task: 'Learn React',
        completed: false,
    },
];

// Get HTML elements
const ul = document.querySelector('ul');
const dialog = document.querySelector('dialog');
const form = document.querySelector('form');
const input = document.querySelector('input');
const addButton = document.querySelector('.add-btn');

// Render todo list
function renderTodoList() {
    ul.innerHTML = '';

    todoList.forEach((todo) => {
        const li = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;

        const label = document.createElement('label');
        label.textContent = todo.task;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';

        // Checkbox changes completed value
        checkbox.addEventListener('change', () => {
            todo.completed = checkbox.checked;
            console.log(todoList);
        });

        // Delete todo
        deleteButton.addEventListener('click', () => {
            const index = todoList.indexOf(todo);

            todoList.splice(index, 1);
            ul.removeChild(li);

            console.log(todoList);
        });

        li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(deleteButton);

        ul.appendChild(li);
    });
}

// Open dialog
addButton.addEventListener('click', () => {
    dialog.showModal();
});

// Add new todo
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const task = input.value.trim();

    if (task === '') {
        return;
    }

    const newTodo = {
        id: todoList.length + 1,
        task: task,
        completed: false,
    };

    todoList.push(newTodo);

    console.log(todoList);

    input.value = '';
    dialog.close();

    renderTodoList();
});

// Initial render
renderTodoList();