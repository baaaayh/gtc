$(function () {
    let totalSlides = $('.main-kv__slide').length,
        fTotalSlides = $('.main-kv__slide').length;
    let currentSlide;
    let fCurrentSlide;

    let slider = $('.main-kv__slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 1500,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 7000,
        pauseOnHover: true,
        nextArrow: '.kv-nav__button--next',
        prevArrow: '.kv-nav__button--prev',
    });

    currentSlide = $('.main-kv__slider').slick('slickCurrentSlide');
    updateProgress(currentSlide);

    $('.main-kv__slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        updateProgress(nextSlide);
    });

    function updateProgress(nextSlide = 0) {
        currentSlide = nextSlide + 1;
        $('.progress__bar').css('width', (currentSlide / totalSlides) * 100 + '%');
        fCurrentSlide = formattedIndex(currentSlide);
        fTotalSlides = formattedIndex(totalSlides);
        $('.progress__first').text(fCurrentSlide);
        $('.progress__last').text(fTotalSlides);
    }

    function formattedIndex(index) {
        return index <= 9 ? '0' + index : index;
    }

    $('.kv-nav__button--pause').on('click', function () {
        $(this).toggleClass('play');
        if ($(this).hasClass('play')) {
            $('.main-kv__slider').slick('slickPause');
        } else {
            $('.main-kv__slider').slick('slickPlay');
        }
    });

    $('.family-site button').on('click', function () {
        $(this).parents('.family-site').toggleClass('active');
        $(this).siblings('ul').slideToggle();
    });

    $(document).on('click', function (e) {
        if (!$(e.target).parents().hasClass('family-site')) {
            $('.family-site').removeClass('active');
            $('.family-site ul').stop().slideUp();
        }
    });

    $('.gnb__list > li').on('mouseenter', function () {
        $(this).addClass('active');
    });
    $('.gnb__list > li').on('mouseleave', function () {
        $(this).removeClass('active');
    });

    // 1depth 메뉴 아이템에 대한 핸들러
    $('.gnb__list > li > a')
        .on('focus', function () {
            $(this).parent().addClass('active');
        })
        .on('blur', function () {
            // 포커스가 2depth 메뉴 아이템으로 이동하지 않은 경우에만 active 클래스 제거
            if (!$(this).parent().find('.depth2 a').is(':focus')) {
                $(this).parent().removeClass('active');
            }
        });

    // 2depth 메뉴 아이템에 대한 핸들러
    $('.gnb__list .depth2 a')
        .on('focus', function () {
            $(this).parents('li').addClass('active');
        })
        .on('blur', function () {
            // 포커스가 1depth 메뉴 아이템으로 이동하지 않은 경우에만 active 클래스 제거
            if (!$(this).parents('.gnb__list > li').children('a').is(':focus')) {
                $(this).parents('li').removeClass('active');
            }
        });

    function count_override() {
        var a = 0;

        $('.counter-value').each(function () {
            var $this = $(this),
                countTarget = $this.attr('data-count');
            $({
                countNum: $this.text(),
            }).animate(
                {
                    countNum: countTarget,
                },
                {
                    duration: 1500,
                    easing: 'easeInOutQuad',
                    step: function () {
                        $this.text(won_Comma(Math.floor(this.countNum)));
                    },
                    complete: function () {
                        $this.text(won_Comma(this.countNum));
                    },
                }
            );
        });
        a = 1;
    }
    count_override();
});
