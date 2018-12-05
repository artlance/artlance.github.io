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

    //slider collection
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

    //slider background
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

    //slider hero
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

    //play button
    $('.hero-stations-list .station-play').on('click', function(event) {
        event.preventDefault();
        var thisParents = $(this).parents('.hero-station');
        thisParents.siblings('.hero-station').removeClass('hero-station-active');
        thisParents.addClass('hero-station-active');
        var thisIndex = thisParents.index();
        $('.hero-background-slider').slick('slickGoTo', thisIndex);
    });

    //------------------------------------------------------------------------//

    //drop box
    activePop = null;
    dropClass = $('.drop');
    function closeInactivePop() {
        dropClass.each(function (i) {
            if ($(this).hasClass('active') && i!=activePop) {
                $(this).removeClass('active');
            }
        });
        return false;
    }
    dropClass.on('mouseover', function(event) {
        activePop = dropClass.index(this);
    });
    dropClass.on('mouseout', function(event) {
        activePop = null;
    });
    $(document.body).on('click', function(event) {
        closeInactivePop();
    });
    $('.drop-toggle').on('click', function(event) {
        $(this).parent(dropClass).toggleClass('active');
    });

    //------------------------------------------------------------------------//

    //drop filter
    $('.hero-sort-list a').on('click', function(event) {
        var thisElement = $(this);
        thisElement
            .parents('.hero-header-filter')
            .find('.hero-header-toggle-value')
            .text(thisElement.text());
        thisElement
            .parent(dropClass)
            .removeClass('active');
        thisElement
            .parents('li')
            .addClass('active')
            .siblings('li')
            .removeClass('active');
        activePop = null;
    });

    //------------------------------------------------------------------------//

    //filter select active
    function checkState(inputChild) {
        var inputParents = inputChild.parents('.filter-item');
        if ( inputParents.find('input:checked').length ) {
            inputParents.addClass('active');
        } else {
            inputParents.removeClass('active');
        }
    }
    //filter change
    function changeFilter(input) {
        var thisInput = $('#'+input);
        if ( thisInput.is(':checked') ) {
            var thisInputText = thisInput.next('label').text();
            var filterTemplate = '<div class="filter-result-item"><div href="#" class="filter-result-link">'+thisInputText+'<a href="#" class="filter-result-delete" data-id="'+input+'"><span class="filter-result-delete-icon">delete</span></a></div></div>';
            $(filterTemplate).insertBefore('.filter-result-navigation');
        } else {
            $('[data-id="'+input+'"]').parents('.filter-result-item').remove();
        }
        checkState(thisInput);
    }
    //filter select check
    $('.filter-item').each(function(index) {
        if ( $(this).find('input:checked').length ) {
            $(this).addClass('active');
            var thisIntup = $(this).find('input:checked');
            thisIntup.each(function(index) {
                changeFilter($(this).attr('id'));
            });
        } else {
            $(this).removeClass('active');
        }
    });
    //filter trigger
    $('.select-box-list input[type=checkbox]').on('change', function(event) {
        changeFilter($(this).attr('id'));
        checkEmptyFilter();
    });
    //filter remove item
    $(document).on('click', '.filter-result-delete', function(event) {
        event.preventDefault();
        var thisItem = $(this);
        var thisDataId = thisItem.data('id');
        thisItem.parents('.filter-result-item').remove();
        $('input#'+thisDataId).prop("checked", false);
        checkState($('input#'+thisDataId));
        checkEmptyFilter();
    });
    //filter remove all
    $('.filter-result-clear').on('click', function(event) {
        event.preventDefault();
        $('.filter-result-item').each(function(index) {
            var thisDataId = $(this).find('.filter-result-delete').data('id');
            $('input#'+thisDataId).prop("checked", false);
            checkState($('input#'+thisDataId));
            $(this).remove();
        });
        checkEmptyFilter();
    });
    //filter empty
    function checkEmptyFilter() {
        if ( $('.filter-list input:checked').length ) {
            $('.filter-block').addClass('filter-block-not-empty');
        } else {
            $('.filter-block').removeClass('filter-block-not-empty');
        }
    }
    checkEmptyFilter();

    //filter toggle
    $('.button-toggle-filter').on('click', function(event) {
        $(this).toggleClass('open');
        $('.filter-block').toggleClass('open');
        if ( $(this).hasClass('open') ) {
            var scrollResult = $('#filter-block').offset().top;
            $('html, body').animate({
                scrollTop: scrollResult
            }, 300);
        }
    });
    //filter All
    $('.button-all-filter').on('click', function(event) {
        $('.button-toggle-filter').removeClass('open');
        $('.filter-block').removeClass('open');
        $('.filter-list input:checked').each(function(index) {
            $(this).prop("checked", false);
            checkState($(this));
        });
        $('.filter-result-item').remove();
        checkEmptyFilter();
    });
    //------------------------------------------------------------------------//

}); //document ready

//*********************************************************************//

$(window).load(function() {

    //load

});//window load

//*********************************************************************//

$(window).resize(function() {

    //resize

});//window resize
