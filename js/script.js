jQuery( function($) {

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

    //play toggle
    $('.station-play').on('click', function(event) {
        event.preventDefault();
        var thisElement = $(this),
            playerPause = $('.player-control-pause');
        if ( thisElement.hasClass('active') ) {
            thisElement.removeClass('active');
            playerPause.removeClass('active');
        } else {
            $('.station-play').removeClass('active');
            thisElement.addClass('active');
            $('body').addClass('player-active');
            playerPause.addClass('active');
        }
    });
    var thisHeroRadio;
    $('.player-control-pause').on('click', function(event) {
        event.preventDefault();
        var thisElement = $(this);
        if ( $('.station-play.active').length ) {
            thisHeroRadio = $('.station-play.active');
        }
        if ( thisElement.hasClass('active') ) {
            thisElement.removeClass('active');
            thisHeroRadio.removeClass('active');
        } else {
            thisElement.addClass('active');
            thisHeroRadio.addClass('active');
        }
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

    var player = false;

    //player call
    $('.player-info-call').on('click', function(event) {
        event.preventDefault();
        player = true;
        $(this).addClass('active');
        $('.player-popup-call').addClass('active');
        setTimeout(function(){
            $('.player-popup-call').addClass('popin');
        }, 10);
    });

    function closePlayer() {
        $('.player-info-call').removeClass('active active-50 active-75 active-100 active-online');
        $('.player-popup-call').addClass('popout');
        $('.player-popup-step-1').removeClass('hidden');
        $('.player-popup-step-2, .player-popup-step-3, .player-popup-step-4').addClass('hidden');
        player = false;
    }

    $('.button-player-popup-cancel, .button-player-popup-cancel-call').on('click', function(event) {
        event.preventDefault();
        closePlayer();
    });

    $('.volume-range').rangeslider({
        polyfill: false
    });

    $('.player-popup').on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
            var thisEl = $(this);
            if ( thisEl.hasClass('popout') ) {
                thisEl.removeClass('active popout popin popfinish');
                $('.player-popup-step-1').removeClass('hidden');
                $('.player-popup-step-2, .player-popup-step-3').addClass('hidden');
            } else if ( thisEl.hasClass('popin') && !thisEl.hasClass('popout')) {
                thisEl.addClass('popfinish');
                $('.volume-range').rangeslider('update', true);
            }
        }
    );

    //player call form
    $('.player-input-text, .player-input-textarea').on('keydown', function(event) {
        if ( $('.player-input-text').val() != '' && $('.player-input-textarea').val() != '' ) {
            $('.player-popup-navigation-cell-send').addClass('active-send');
        } else {
            $('.player-popup-navigation-cell-send').removeClass('active-send');
        }
    });

    //player call steps
    $('.button-player-popup-send').on('click', function(event) {
        event.preventDefault();
        $('.player-popup-step-1').addClass('hidden');
        $('.player-popup-step-2').removeClass('hidden');
        $('.player-info-call').addClass('active-50');
        setTimeout(function(){
            if ( !($('.player-popup-step-2').hasClass('hidden')) ) {
                $('.player-popup-step-2').addClass('hidden');
                $('.player-popup-step-3').removeClass('hidden');
                $('.player-info-call').addClass('active-75');
            }
        }, 2000);
        setTimeout(function(){
            if ( !($('.player-popup-step-3').hasClass('hidden')) ) {
                $('.player-popup-step-3').addClass('hidden');
                $('.player-popup-step-4').removeClass('hidden');
                $('.player-info-call').addClass('active-75');
            }
        }, 4000);
        setTimeout(function(){
            if ( player && !($('.player-popup-step-4').hasClass('hidden')) ) {
                closePlayer();
                $('.player-info-call').addClass('active active-100 active-online');
                $('.player-on-air').addClass('active');
            }
        }, 6000);
    });

    //player disconect
    $('.player-on-air-disconnect').on('click', function(event) {
        event.preventDefault();
        $('.player-info-call').removeClass('active active-100 active-online');
        $('.player-on-air').removeClass('active');
    });

    //------------------------------------------------------------------------//

    //phone
    var playerPhone = false;
    $('.player-info-phone a').hover(function() {
        if (!playerPhone) {
            playerPhone = true;
            $('.player-popup-phone').addClass('popin');
        }
    }, function() {
        if (playerPhone) {
            $('.player-popup-phone').addClass('popout');
        }
    });

    $('.player-popup-phone').on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
        if ( $(this).hasClass('popout') && playerPhone ) {
            $('.player-popup-phone').removeClass('popin popout');
            playerPhone = false;
        }
    });

    //------------------------------------------------------------------------//

    //share
    var playerShare = false;
    $('.player-tool-share').on('click', function(event) {
        event.preventDefault();
        var thisElement = $(this);
        if ( !playerShare ) {
            playerShare = true;
            thisElement.toggleClass('active');
            if (  thisElement.hasClass('active') && playerShare ) {
                $('.player-popup-share').addClass('active');
                setTimeout(function(){
                    $('.player-popup-share').addClass('popin');
                }, 10);
                setTimeout(function() {
                    playerShare = false;
                }, 1000);
            } else {
                $('.player-popup-share').addClass('popout');
                setTimeout(function() {
                    playerShare = false;
                }, 1000);
            }
            if ( $('.player-tool-volume').hasClass('active') ) {
                $('.player-tool-volume').removeClass('active');
                $('.player-popup-volume').addClass('popout');
                setTimeout(function() {
                    playerVolume = false;
                }, 1000);
            }
        }
    });

    //------------------------------------------------------------------------//

    //volume
    var playerVolume = false;
    $('.player-tool-volume').on('click', function(event) {
        event.preventDefault();
        var thisElement = $(this);
        if ( !playerVolume ) {
            playerVolume = true;
            thisElement.toggleClass('active');
            if (  thisElement.hasClass('active') && playerVolume ) {
                $('.player-popup-volume').addClass('active');
                setTimeout(function(){
                    $('.player-popup-volume').addClass('popin');
                }, 10);
                setTimeout(function() {
                    playerVolume = false;
                }, 1000);
            } else {
                $('.player-popup-volume').addClass('popout');
                setTimeout(function() {
                    playerVolume = false;
                }, 1000);
            }
            if ( $('.player-tool-share').hasClass('active') ) {
                $('.player-tool-share').removeClass('active');
                $('.player-popup-share').addClass('popout');
                setTimeout(function() {
                    playerShare = false;
                }, 1000);
            }
        }
    });

    //------------------------------------------------------------------------//

    //show password
    $('.login-form-row-show-toggle').on('click', function(event) {
        event.preventDefault();
        if ( $(this).hasClass('active') ) {
            $('#login-password-create').attr('type', 'password');
            $(this).removeClass('active');
        } else {
            $('#login-password-create').attr('type', 'text');
            $(this).addClass('active');
        }
    });

    //------------------------------------------------------------------------//

    //modal
    MicroModal.init({
        disableScroll: true,
        awaitCloseAnimation: true
    });

    //------------------------------------------------------------------------//

    $('[data-login-toggle="true"]').on('click', function(event) {
        event.preventDefault();
        var thisHref = $(this).attr('href');
        if (!thisHref) { thisHref = $(this).data('href'); }
        $(thisHref).removeClass('hidden').siblings('.login-block').addClass('hidden');
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
