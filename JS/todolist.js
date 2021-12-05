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
// error : when i click trash button, it wants to submit a form
todoForm.addEventListener('click', function(e) {
    let target = e.target;
    if(target.classList[0] === 'delete'){
        window.localStorage.clear();
        getTodos();
        todoInputField.value = '';
    }
});

/*window.check = () => {
    let target = event.target;
    let targetButtons = target.parentElement;
    targetButtons.parentElement.classList.add("checked");
    console.log(targetButtons.parentElement.classList);

    changeStatus();
    getTodos();
};

function changeStatus() {

}

function check() {
    let tr = event.target;
    let id_us = tr.parentElement.getAttribute('data-key');
    console.log("ENTER CHECK");
    let todos = getTodosLocalStorage();
    Object.entries(todos).forEach(task => {
        console.log("task: " + task);
        for(let t of task) {
            console.log("t: " + t);
        }
    })
}*/


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
    function getNextID() {
        let arr = [...Object.keys(localStorage)];
        if(arr.length === 0) return 1;
        return arr.length + 1;
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
            todoList.appendChild(makeTodoHtml(cont, stat));
        })
    }
}


function makeTodoHtml(taskContent, taskStatus) {
    const clone = template.content.cloneNode(true);
    const li = clone.querySelector('.task__list-item');
    const inputText = clone.querySelector('.task__list-item-input');

    li.classList.toggle('checked', taskStatus);
    inputText.innerHTML = taskContent;

    return clone;
}