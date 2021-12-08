window.addEventListener('load', (event) =>{
    onStart();
});

function onClick() {
    getPicture();
}

function getPicture() {
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
                        }
                    })
                        .then((value) => {
                            switch (value) {
                                case "white":
                                    swal("Ура!", "Ты выбрал белую собаку!",  "success", {
                                        button: "Круто!",
                                    });
                                    document.querySelectorAll(".img").forEach(el => el.style.display = 'none');
                                    document.querySelector('.img-dog-w').style.display = 'block';
                                    break;

                                case "black":
                                    swal("Ура!", "Ты выбрал черную собаку!", "success", {
                                        button: "Прикольно!",
                                    });
                                    document.querySelectorAll(".img").forEach(el => el.style.display = 'none');
                                    document.querySelector('.img-dog-b').style.display = 'block';
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
                                    });
                                    document.querySelectorAll(".img").forEach(el => el.style.display = 'none');
                                    document.querySelector('.img-cat-w').style.display = 'block';
                                    break;

                                case "black":
                                    swal("Ура!", "Ты выбрал черную кошку!", "success", {
                                        button: "Удивительно!",
                                    });
                                    document.querySelectorAll(".img").forEach(el => el.style.display = 'none');
                                    document.querySelector('.img-cat-b').style.display = 'block';
                                    break;
                            }
                        });
                    break;

                default:
                    break;
            }
        });
    document.querySelector('#butt-del').style.display = 'block';
}

function deleteAll() {
    swal({
        title: "Ты уверен?",
        text: "Фотка исчезнет!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                swal("Пуф!", "Фотки животного больше нет.", {
                    icon: "success",
                });
                document.querySelectorAll(".img").forEach(el => el.style.display = 'none');
                document.querySelector('.img-del').style.display = 'block';
                document.querySelector('#butt-del').style.display = 'none';
            } else {
                swal("Ура!", "Фотка остается! :)", {
                    icon: "info",
                });
            }
        });
}

function onStart() {
    document.querySelector('#butt-del').style.display = 'none';
    document.querySelector('.img-del').style.display = 'block';
}