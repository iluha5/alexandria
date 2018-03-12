function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

$(document).ready(function () {
    $('.catalog-nav-mini__slider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: parseInt(getURLParameter('page')),
        responsive: [
            {
                breakpoint: 5000,
                settings: {
                    slidesToShow: 7,
                    slidesToScroll: 3,
                    arrows : false
                }
            },
            {
                breakpoint: 1170,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
});

