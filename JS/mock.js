const button = document.querySelector('.random-user__button');
const template = document.querySelector('#template-row');
const table = document.querySelector('.table');
const loader = document.querySelector('.random-user__loader');
const error = document.querySelector('.random-user__error');

document.addEventListener('DOMContentLoaded', getData);
button.addEventListener('click', getData);

function rndGenerator(seed) {
    function rnd() {
        return Math.floor(Math.random() * 10 * seed) + 1;
    }
    return 'https://jsonplaceholder.typicode.com/posts?id=' + rnd();
}

function getData() {
    return Promise.all([
        fetch(rndGenerator(1)),
        fetch(rndGenerator(2)),
        fetch(rndGenerator(3)),
        fetch(rndGenerator(4)),
        fetch(rndGenerator(5)),
        fetch(rndGenerator(6)),
        fetch(rndGenerator(7)),
        fetch(rndGenerator(8)),
        fetch(rndGenerator(9)),
        fetch(rndGenerator(10)),
    ]).then(function (responses) {
        return Promise.all(responses.map(function (response) {
            return response.json();
        }));
    }).then(function (data) {
        return data;
    }).then(displayElements).catch(displayError);
}

function displayElements(data) {

    function refresh() {
        console.log("we good");
        table.style.display = 'none';
        button.style.display = 'none';
        error.style.display = 'none';
        loader.style.display = 'inherit';
        document.querySelectorAll(".random-user__data.table__cell.userId").forEach(el => el.remove());
        document.querySelectorAll(".random-user__data.table__cell.id").forEach(el => el.remove());
        document.querySelectorAll(".random-user__data.table__cell.title").forEach(el => el.remove());
        document.querySelectorAll(".random-user__data.table__cell.body").forEach(el => el.remove());
    }

    function makeHtmlElems() {
        for (let i = 0; i < 10; i++) {
            const clone = template.content.cloneNode(true);
            const user = clone.querySelector('.userId');
            const id = clone.querySelector('.id');
            const title = clone.querySelector('.title');
            const body = clone.querySelector('.body');
            user.textContent = data[i][0]['userId'];
            id.textContent = data[i][0]['id'];
            title.textContent = data[i][0]['title'];
            body.textContent = data[i][0]['body'];
            table.appendChild(clone);
        }
    }

    refresh();
    makeHtmlElems();
    loader.style.display = 'none';
    table.style.display = 'grid';
    button.style.display = 'inherit';
}

function displayError() {
    loader.style.display = 'none';
    table.style.display = 'none';
    button.style.display = 'none';
    error.style.display = 'inline-block';
}