let input = document.querySelector('.todo_input');
let MainTodoContainer = document.getElementById('todo')
let addingButton = document.querySelector('.add-item');
document.addEventListener('DOMContentLoaded', getTodos);

addingButton.addEventListener('click', function(e){
    e.preventDefault();
    if(input.value.trim()){
        let ulTag = document.createElement('ul');
        ulTag.classList.add('todo-list-container');

        let todoList = document.createElement('div');
        todoList.classList.add('todo-list');

        let liTag = document.createElement('li');
        liTag.innerText = input.value;
        saveLocalTodos(input.value);
        liTag.classList.add('todo-item');

        let buttonDiv = document.createElement('div');
        buttonDiv.classList.add('button');

        let completeButton = document.createElement('button');
        completeButton.classList.add('completed');
        completeButton.innerHTML = '<i class="fas fa-check"></i>';

        let editBtn = document.createElement('button');
        editBtn.innerHTML = '<i class="far fa-edit"></i>';
        editBtn.classList.add('editBtn');
        editBtn.onclick = function(){
            editWorking(liTag);
        }

        let trashButton = document.createElement('button');
        trashButton.classList.add('trash');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';

        ulTag.appendChild(todoList);
        todoList.appendChild(liTag);
        todoList.appendChild(buttonDiv);
        buttonDiv.appendChild(completeButton);
        buttonDiv.appendChild(editBtn);
        buttonDiv.appendChild(trashButton);

        MainTodoContainer.appendChild(ulTag);

        input.value = '';

        todoList.addEventListener('click', function(e){
            let items = e.target;
            if(items.classList[0] === 'completed'){
                let todo = items.parentElement;
                let todo2 = todo.parentElement;
                todo2.classList.add('line_through')
            }
            else if(items.classList[0] === 'trash'){
                let todo = items.parentElement;
                let todo2 = todo.parentElement;
                removeLocalTodos(todo2);
                todo2.classList.add('fall');
                todo2.addEventListener('transitionend', function(){
                    let todo3 = todo2.parentElement;
                    todo3.remove();
                });
            }
        });
    } else if(input.value === ''){
        alert('Пожалуйста заполни поле!')
    }
});

function editWorking(e){
    let editValue = prompt('Измени содержание этого поля.', e.firstChild.nodeValue);
    if(e.firstChild.nodeValue === "") {
        alert("Пустая строка!");
        return;
    }
    e.firstChild.nodeValue = editValue;
}

function deleteAllElements(){
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    let gettingUlTag = document.querySelectorAll('.todo-list-container');
    for(let i = 0; i < gettingUlTag.length; i++){
        gettingUlTag[i].remove();
    }
    input.value = '';
    todos.splice(0,todos.length);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function saveLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo) {
        let ulTag = document.createElement('ul');
        ulTag.classList.add('todo-list-container');

        let todoList = document.createElement('div');
        todoList.classList.add('todo-list');

        let liTag = document.createElement('li');
        liTag.innerText = todo;
        liTag.classList.add('todo-item');
        let buttonDiv = document.createElement('div');
        buttonDiv.classList.add('button');

        let completeButton = document.createElement('button');
        completeButton.classList.add('completed');
        completeButton.innerHTML = '<i class="fas fa-check"></i>';

        let editBtn = document.createElement('button');
        editBtn.innerHTML = '<i class="far fa-edit"></i>';
        editBtn.classList.add('editBtn');
        editBtn.onclick = function(){
            editWorking(liTag);
        }

        let trashButton = document.createElement('button');
        trashButton.classList.add('trash');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';

        ulTag.appendChild(todoList);
        todoList.appendChild(liTag);
        todoList.appendChild(buttonDiv);
        buttonDiv.appendChild(completeButton);
        buttonDiv.appendChild(editBtn);
        buttonDiv.appendChild(trashButton);

        MainTodoContainer.appendChild(ulTag);
    });
}