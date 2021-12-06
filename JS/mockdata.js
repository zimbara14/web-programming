function rndGenerator() {
    function rnd() {
        return Math.floor(Math.random() * 10) + 1;
    }
    return 'https://jsonplaceholder.typicode.com/posts?userId=' + rnd();
}

function getMockData() {
    return fetch(rndGenerator())
        .then(function (response) {
            return response.json();
        })
        .then(function (json){
            return json;
        })
}

window.shuffle = () => {
    // stuff
}

function appendNewRows(Data) {
    const container = document.querySelector('.random-user__table');
    const template = document.querySelector('#template-row');
    for (let i = 0; i < Data.length; i++) {
        const clone = template.content.cloneNode(true);
        const user = clone.querySelector('.userId');
        const id = clone.querySelector('.id');
        const title = clone.querySelector('.title');
        const body = clone.querySelector('.body');
        user.innerHTML = Data[i]['userId'];
        id.innerHTML = Data[i]['id'];
        title.innerHTML = Data[i]['title'];
        body.innerHTML = Data[i]['body'];
        container.appendChild(clone);
    }
}

function removeLoadingAndDisplayTable() {
    document.querySelector('.random-user__loader').style.display = 'none';
    document.querySelector('.random-user__table').style.display = 'grid';
    document.querySelector('.random-user__button').style.display = 'inherit';
}

function displayError() {
    document.querySelector('.random-user__loader').style.display = 'none';
    document.querySelector('.random-user__table').style.display = 'none';
    document.querySelector('.random-user__button').style.display = 'none';
    document.querySelector('.random-user__error').style.display = 'inline-block';
}

getMockData().then(function(data) {
    appendNewRows(data);
}).then(() => removeLoadingAndDisplayTable()).catch(() => displayError())
