const img = document.querySelectorAll(".img");
const dw = document.querySelector('.img-dog-w');
const db = document.querySelector('.img-dog-b');
const cw = document.querySelector('.img-cat-w');
const cb = document.querySelector('.img-cat-b');
const imgd = document.querySelector('.img-del');
const imgapi = document.querySelector('#img-api');
const imgapifail = document.querySelector('#img-api-del');

const buttons = document.querySelectorAll(".butt");
const buttstart = document.querySelector("#butt-start");
const buttmy = document.querySelector('#butt-my');
const buttd = document.querySelector('#butt-del');
const buttapi = document.querySelector('#butt-api');


window.addEventListener('load', (event) =>{
    buttons.forEach(e => e.style.display = 'none');
    buttstart.style.display = 'block';
});

function startGame() {
    buttstart.style.display = 'none';
    buttmy.style.display = 'block';
    buttapi.style.display = 'block';

    swal("Добропожаловать!", "Выбери:", {
        buttons: {
            моя: true,
            фэч: true
        },
        closeOnEsc: false,
        closeOnClickOutside: false
    }).then(value => {
        buttons.forEach(e => e.style.display = 'none');
        switch (value) {
            case "моя":
                buttmy.style.display = 'block';
                imgd.style.display = 'inherit';
                break;
            case "фэч":
                buttapi.style.display = 'block';
                break;
            default:
                break;
        }
    })
}

function myGame() {
    swal("Давай сыграем! Выбери животное:", {
        buttons: {
            cat: true,
            dog: true
        },
    })
        .then((value) => {
            switch (value) {

                case "dog":
                    swal("Выбери цвет собаки:", {
                        buttons: {
                            white: true,
                            black: true
                        },
                        closeOnEsc: false,
                        closeOnClickOutside: false
                    })
                        .then((value) => {
                            switch (value) {
                                case "white":
                                    swal("Ура!", "Ты выбрал белую собаку!",  "success", {
                                        button: "Круто!",
                                        timer: 2000
                                    });
                                    img.forEach(el => el.style.display = 'none');
                                    dw.style.display = 'block';
                                    break;

                                case "black":
                                    swal("Ура!", "Ты выбрал черную собаку!", "success", {
                                        button: "Прикольно!",
                                        timer: 2000
                                    });
                                    img.forEach(el => el.style.display = 'none');
                                    db.style.display = 'block';
                                    break;
                            }
                        });
                    break;

                case "cat":
                    swal("Выбери цвет кошки:", {
                        buttons: {
                            white: true,
                            black: true
                        }
                    })
                        .then((value) => {
                            switch (value) {
                                case "white":
                                    swal("Ура!", "Ты выбрал белую кошку!", "success", {
                                        button: "Прекрасно!",
                                        timer: 2000
                                    });
                                    img.forEach(el => el.style.display = 'none');
                                    cw.style.display = 'block';
                                    break;

                                case "black":
                                    swal("Ура!", "Ты выбрал черную кошку!", "success", {
                                        button: "Удивительно!",
                                        timer: 2000
                                    });
                                    img.forEach(el => el.style.display = 'none');
                                    cb.style.display = 'block';
                                    break;
                            }
                        });
                    break;

                default:
                    break;
            }
        });
    buttd.style.display = 'block';
}

function deleteAll() {
    swal({
        title: "Ты уверен?",
        text: "Фотка исчезнет!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        closeOnEsc: false,
        closeOnClickOutside: false
    })
        .then((willDelete) => {
            if (willDelete) {
                swal("Пуф!", "Фотки животного больше нет.", {
                    icon: "success",
                    timer: 2000
                });
                img.forEach(el => el.style.display = 'none');
                imgd.style.display = 'block';
                buttd.style.display = 'none';
            } else {
                swal("Ура!", "Фотка остается! :)", {
                    icon: "info",
                    timer: 2000
                });
            }
        });
}

function fetchGame() {
    img.forEach(el => el.style.display = 'none');
    swal("Давай сыграем! Выбери животное:", {
        buttons: {
            cat: true,
            dog: true
        },
        closeOnEsc: false,
        closeOnClickOutside: false
    })
        .then((value) => {
            switch (value) {
                case "cat":
                    swal("Ура!", "Ты выбрал кошку!.", {
                        icon: "success",
                        timer: 1000
                    });
                    return fetch("https://api.thecatapi.com/v1/images/search");
                case "dog":
                    swal("Ура!", "Ты выбрал собаку!.", {
                        icon: "success",
                        timer: 1000
                    });
                    return fetch("https://api.thedogapi.com/v1/images/search");
            }
        })
        .then(results => {
            return results.json();
        })
        .then(json => {
            imgapi.src = json[0].url;
            imgapi.style.display = 'initial';
        })
        .catch(err => {
            if (err) {
                swal("О, нет!", "Запрос AJAX не удался!", "error", {timer: 1500});
                imgapifail.style.display = 'initial';
            } else {
                swal.stopLoading();
                swal.close();
            }
        });
}