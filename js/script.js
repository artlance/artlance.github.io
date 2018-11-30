document.addEventListener('touchstart', onTouchStart, {passive: true});
$(document).ready(function() {

    //ready

    //nojs
    $('body').removeClass('no-js');

    //------------------------------------------------------------------------//

    //fakelink
    $('a[href="#"]').on('click', function(event) {
        event.preventDefault();
    });

    //------------------------------------------------------------------------//

    //placeholder
    $('input[placeholder], textarea[placeholder]').placeholder();

    //------------------------------------------------------------------------//

    //navigation
    $('.navigation-toggle').on('click', function(event) {
        event.preventDefault();
        $('body').toggleClass('navigation-open');
    });

    //------------------------------------------------------------------------//

    //slider
    $('.collection-slider').slick({
        dots: false,
        arrows: false,
        draggable: true,
        infinite: true,
        centerMode: false,
        centerPadding: '0px',
        autoplay: false,
        autoplaySpeed: 5000,
        speed: 500,
        pauseOnHover: false,
        pauseOnDotsHover: false,
        slide: '.collection-slide',
        slidesToShow: 3,
        slidesToScroll: 1,
        //asNavFor: '',
        //fade: true,
        responsive: [
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 1,
                dots: true
              }
            }
          ]
    });

    //slider
    $('.hero-background-slider').slick({
        dots: false,
        arrows: false,
        draggable: true,
        infinite: true,
        centerMode: false,
        centerPadding: '0px',
        autoplay: false,
        autoplaySpeed: 5000,
        speed: 800,
        pauseOnHover: false,
        pauseOnDotsHover: false,
        slide: '.hero-background-slide',
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.hero-stations-slider',
        fade: true
    });

    //slider
    $('.hero-stations-slider').slick({
        dots: true,
        arrows: false,
        draggable: true,
        infinite: true,
        centerMode: false,
        centerPadding: '0px',
        autoplay: false,
        autoplaySpeed: 5000,
        speed: 600,
        pauseOnHover: false,
        pauseOnDotsHover: false,
        slide: '.hero-stations-slide',
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.hero-background-slider',
        //fade: true
    });

    //------------------------------------------------------------------------//

    $('.hero-stations-list .station-play').on('click', function(event) {
        event.preventDefault();
        var thisParents = $(this).parents('.hero-station');
        thisParents.siblings('.hero-station').removeClass('hero-station-active');
        thisParents.addClass('hero-station-active');
        var thisIndex = thisParents.index();
        $('.hero-background-slider').slick('slickGoTo', thisIndex);
    });

}); //document ready

//*********************************************************************//

$(window).load(function() {

    //load

});//window load

//*********************************************************************//

$(window).resize(function() {

    //resize

});//window resize