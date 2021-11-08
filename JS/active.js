window.addEventListener("DOMContentLoaded", function(event) {
    var links = document.getElementsByClassName("header__menu-link");
    var url = document.location.pathname.split("/");
    var curr = url[url.length - 1];
    var firstPage = links.item(0).href.split("/")
    var secondPage = links.item(5).href.split("/")
    if(firstPage[firstPage.length - 1] === curr) {
        links.item(0).classList.add('header__menu-item_active')
    }
    if(secondPage[secondPage.length - 1] === curr) {
        links.item(5).classList.add('header__menu-item_active')
    }
});