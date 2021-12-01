window.addEventListener("DOMContentLoaded", function(event) {
    let link = document.getElementsByClassName("header__menu-link");
    for(let i = 0; i < link.length; i++) {
        if(link.item(i).href === document.location.href) {
            link.item(i).classList.add('header__menu-item_active')
        }
    }
});