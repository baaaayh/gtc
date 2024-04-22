$(function () {
    let totalSlides = $('.swiper-slide').length,
        fTotalSlides = $('.swiper-slide').length;
    let currentSlide;
    let fCurrentSlide;
    const mainKv = new Swiper('.main-kv__slider', {
        slidesPerView: 'auto',
        speed: 1500,
        loop: true,
        observer: true,
        autoplay: {
            delay: 7000,
            disableOnInteraction: true,
        },
        navigation: {
            nextEl: '.kv-nav__button--next',
            prevEl: '.kv-nav__button--prev',
        },
    });

    currentSlide = mainKv.realIndex + 1;

    function formattedIndex(index) {
        return index <= 9 ? '0' + index : index;
    }

    $('.progress__bar').css('width', (currentSlide / totalSlides) * 100 + '%');

    fCurrentSlide = formattedIndex(currentSlide);
    fTotalSlides = formattedIndex(totalSlides);

    $('.progress__first').text(fCurrentSlide);
    $('.progress__last').text(fTotalSlides);

    mainKv.on(' slideChange', function () {
        currentSlide = mainKv.realIndex + 1;
        $('.progress__bar').css('width', (currentSlide / totalSlides) * 100 + '%');
        fCurrentSlide = formattedIndex(currentSlide);
        $('.progress__first').text(fCurrentSlide);
    });

    $('.kv-nav__button--pause').on('click', function () {
        $(this).toggleClass('play');
        if ($(this).hasClass('play')) {
            mainKv.autoplay.stop();
        } else {
            mainKv.autoplay.start();
        }
    });

    $('.cm_assignBtn').on('click', function () {
        $('.assign_wrap.cm').fadeIn();
    });
    $('.assign_wrap.cm .clsbtn_r').on('click', function () {
        $('.assign_wrap.cm').fadeOut();
    });
    $('.my_assignBtn').on('click', function () {
        $('.assign_wrap.my').fadeIn();
    });
    $('.assign_wrap.my .clsbtn_r').on('click', function () {
        $('.assign_wrap.my').fadeOut();
    });
    $('.join_assignBtn').on('click', function () {
        $('.assign_wrap.join').fadeIn();
    });
    $('.assign_wrap.join .clsbtn_r').on('click', function () {
        $('.assign_wrap.join').fadeOut();
    });

    $('.family-site button').on('click', function () {
        $(this).parents('.family-site').toggleClass('active');
        $(this).siblings('ul').stop().slideToggle();
    });

    $(document).on('click', function (e) {
        if (!$(e.target).parents().hasClass('family-site')) {
            $('.family-site').removeClass('active');
            $('.family-site ul').stop().slideUp();
        }
    });
});
