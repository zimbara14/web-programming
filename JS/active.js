window.addEventListener("DOMContentLoaded", function(event) {
    var links = document.getElementsByClassName("header__menu-link");
    var url = document.location.pathname.split("/");
    var curr = url[url.length - 1];
    for(let i = 0; i < links.length; i++){
        let temp = links.item(i).href.split("/")
        if(curr == temp[temp.length - 1]) {
            links.item(i).classList.add('header__menu-item_active')
        }
    }
});