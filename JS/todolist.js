const template = document.querySelector('#task');
const todoList = document.querySelector('.todo-list');

const todoForm = document.querySelector('#todo');
const todoInputField = document.querySelector('.todo-input-container');

document.addEventListener('DOMContentLoaded', getTodos);

todoForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let input = todoInputField.value.toString();
    addTodo(input);
    getTodos();
    todoInputField.value = '';
});

// error: when i click trash button, it wants to submit a form
todoForm.addEventListener('click', function(e) {
    let target = e.target;
    if(target.classList[0] === 'delete'){
        window.localStorage.clear();
        getTodos();
        todoInputField.value = '';
    }
});

window.checkItem = () => {
    let target = event.target;
    let targetButtons = target.parentElement;
    let elementID = targetButtons.parentElement.getAttribute('data-key');
    changeStatus(elementID);
    getTodos();
};

function changeStatus(elementID) {
    let todos = getTodosLocalStorage();
    Object.entries(todos).forEach(task => {
        if(task[0] === elementID) {
            let tas;
            for(let t of task) {
                tas = {
                    content: t.content,
                    status: !t.status
                };
            }
            let tasJson = JSON.stringify(tas);
            localStorage.setItem(task[0], tasJson);
        }
    })
    getTodos();
}

window.deleteItem = () => {
    let target = event.target;
    let targetButtons = target.parentElement;
    let elementID = targetButtons.parentElement.getAttribute('data-key');
    localStorage.removeItem(elementID);
    getTodos();
}

function getTodosLocalStorage() {
    function allStorage() {
        let archive = {},
            keys = Object.keys(localStorage),
            i = keys.length;
        while ( i-- ) {
            archive[ keys[i] ] = JSON.parse(localStorage.getItem(keys[i]));
        }
        return archive;
    }

    let todos = allStorage();
    if(!todos) {
        return null;
    } else {
        return todos;
    }
}

function addTodo(input) {
    function arrayMax(arr) {
        let len = arr.length, max = -Infinity;
        while (len--) {
            if (Number(arr[len]) > max) max = (Number(arr[len]) > max) ? Number(arr[len]) : max;
        }
        return max;
    }

    function getNextID() {
        let arr = [...Object.keys(localStorage)];
        if(arr.length === 0) return 1;
        return arrayMax(arr) + 1;
    }

    if(input.trim()) {
        let task = {
            content: input,
            status: false
        };
        let taskJson = JSON.stringify(task);
        localStorage.setItem(getNextID(), taskJson);
    }
}

function getTodos() {
    let todos = getTodosLocalStorage();
    let cont, stat;
    if (todos.length !== 0) {
        todoList.innerHTML = '';
        Object.entries(todos).forEach(task => {
            for(let t of task) {
                cont = t.content;
                stat = t.status;
            }
            todoList.appendChild(makeTodoHtml(task[0], cont, stat));
        })
    }
}

function makeTodoHtml(taskID, taskContent, taskStatus) {
    const clone = template.content.cloneNode(true);
    const li = clone.querySelector('.task__list-item');
    const inputText = clone.querySelector('.task__list-item-input');

    li.setAttribute('data-key', taskID);
    inputText.classList.toggle('checked', taskStatus);
    inputText.innerHTML = taskContent;

    return clone;
}