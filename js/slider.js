function getURLParameter(name) {
    if ($(window).width() > 1170) {
        return 0
    } else {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || 0;
    }
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
                    slidesToShow: 8,
                    slidesToScroll: 8,
                    arrows: false
                }
            },
            {
                breakpoint: 1170,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            },
            {
                breakpoint: 768,
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

$(document).ready(function () {
    $('.card__slider-list').slick({
        dots: false,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear'
    });
    // var height = $(".card__slider-img").height();
    // alert(height);
    // var width = $(".card__slider-img").width();
    // $('.card__slider-list .slick-arrow').css('height', height);

});

/////////////// ПРАВИЛЬНЫЙ РЕСАЙЗ ИЗОБРАЖЕНИЯ В СЛАЙДЕРЕ /////////////////
jQuery(function ($) {
    function fix_size() {
        var images = $('.card__slider-img');
        images.each(setsize);

        function setsize() {
            var img = $(this),
                img_dom = img.get(0),
                container = img.parents('.card__slider-item');
            if (img_dom.complete) {
                resize();
            } else img.one('load', resize);

            function resize() {
                if ((container.width() / container.height()) < (img_dom.width / img_dom.height)) {
                    img.width('100%');
                    img.height('auto');
                    return;
                }
                img.height('100%');
                img.width('auto');
            }
        }
    }
    $(window).on('resize', fix_size);
    fix_size();
});

// $(document).ready(function() {
//     $(".card__slider-img").load(function() {
//         var height = $(this).height();
//         var width = $(this).width();
//     });
//
// });
