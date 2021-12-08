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
                                    swal("Ты выбрал белую собаку!");
                                    document.querySelectorAll(".img").forEach(el => el.style.display = 'none');
                                    document.querySelector('.img-dog-w').style.display = 'block';
                                    break;

                                case "black":
                                    swal("Ты выбрал черную собаку!");
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
                                    swal("Ты выбрал белую кошку!");
                                    document.querySelectorAll(".img").forEach(el => el.style.display = 'none');
                                    document.querySelector('.img-cat-w').style.display = 'block';
                                    break;

                                case "black":
                                    swal("Ты выбрал черную кошку!");
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
    document.querySelectorAll(".img").forEach(el => el.style.display = 'none');
    document.querySelector('.img-del').style.display = 'block';
    document.querySelector('#butt-del').style.display = 'none';
}

function onStart() {
    document.querySelector('#butt-del').style.display = 'none';
    document.querySelector('.img-del').style.display = 'block';
}