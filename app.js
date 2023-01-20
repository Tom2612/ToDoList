const newTodo = document.querySelector('#newTodo');
const addTodoBtn = document.querySelector('#addTodoBtn');
const displayField = document.querySelector('.display-field');
const todos = [{item: 'Collect eggs'}, {item: 'Wash car'}];
console.log(todos);
const projects = [{name: 'Home'}];


//Todo stuff controllers
function addTodo() {
    if (newTodo.value === ''){
        return alert('Please enter a todo!');
    }
    const objectTodo = { item: newTodo.value };
    todos.push(objectTodo);
    printTodo(objectTodo);
    newTodo.value = '';
};

function getTodoList() {
    let array = [];
    for (let todo of todos) {
        array.push(todo.item);
    }
    return array;
};

function deleteTodo(index) {
    todos.splice(index , 1);
    // render();
};

function toggleDone(task) {
    task.classList.toggle('done');
};

function findIndex(e) {
    const input = e.target.textContent;
    for (let todo of getTodoList()) {
        if (input === todo) {
            const index = getTodoList().indexOf(input)
            return index;
        }
    }
};

//Display stuff
function printTodo(todo) {
    const parent = document.querySelector('ul');
    const item = document.createElement('li');
    const done = document.querySelector('.done');
    item.id = 'todo-item';
    item.textContent = todo.item;
    const dltBtn = document.createElement('div');
    dltBtn.textContent = 'X';
    dltBtn.classList.add('dlt-btn');
    item.append(dltBtn);
    if (done) {
        parent.insertBefore(item, done);
    } else {
        parent.append(item);
    }
    addListeners();
};

function saveList() {
    const todoList = document.querySelectorAll('#todo-item');
    let currentList = [...todoList];
    return currentList;
};

function render(list) {
    if(!list) {
        list = getTodoList();
    }
    displayField.innerHTML = '';
    const listBlock = document.createElement('ul');
    for (item of list) {
        const todoListItem = document.createElement('li');
        todoListItem.id = 'todo-item';
        if (typeof(item) == 'string'){
            todoListItem.textContent = item;
        } else {
            todoListItem.textContent = item.textContent;
        }
        const dltBtn = document.createElement('div');
        dltBtn.textContent = 'X';
        dltBtn.classList.add('dlt-btn');
        todoListItem.append(dltBtn);
        listBlock.append(todoListItem);
    }
    displayField.append(listBlock);
    addListeners();
};
render();

function getItems() {
    let todoItems = [];
    todoItems = document.querySelectorAll('#todo-item');
    return todoItems;
};

function reorderList(e) {
    toggleDone(e.target);
    const parent = document.querySelector('ul');
    parent.removeChild(e.target);
    if (e.target.classList.value === 'done'){
        parent.append(e.target); 
    } else {
        parent.prepend(e.target);
    }
};

function removeItem(e) {
    console.log(e)
    const parent = document.querySelector('ul');
    const target = findIndex(e);
    deleteTodo(target);
    parent.removeChild(e.target.parentElement);
}

function addListeners() {
    const todoItems = getItems();
    const dltBtn = document.querySelectorAll('.dlt-btn');

    //Delete functionatlity
    dltBtn.forEach(item => {
        item.addEventListener('click', removeItem);
    });

    addTodoBtn.addEventListener('click', addTodo);

    //Strike-through functionality
    todoItems.forEach(item => {
        item.addEventListener('click', reorderList);
    });
};