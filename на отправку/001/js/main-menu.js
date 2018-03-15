// cake and close buttons
$(document).ready(function () {
    var cake = document.querySelector(".main-menu__cake");
    var menu = document.querySelector(".main-menu__list");
    var nav = document.querySelector(".main-nav");
    var navClose = document.querySelector(".main-nav__close");


    cake.addEventListener("click", function(event){
        event.preventDefault();
        if (cake.classList.contains('main-menu--cake')){
            cake.classList.add("main-menu--close");
            cake.classList.remove("main-menu--cake");
            menu.classList.remove("hidden");
        } else {
            if (cake.classList.contains('main-menu--close')) {
                cake.classList.add("main-menu--cake");
                cake.classList.remove("main-menu--close");
                menu.classList.add("hidden");
            }
        }
    });

    // navClose.addEventListener("click", function(event){
    //     event.preventDefault();
    //     nav.classList.add('main-nav--hide');
    //     line.classList.remove("main-header--hide");
    // })
});


