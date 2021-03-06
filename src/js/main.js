$(document).ready(function () {

    function cloneMenu() {
        if (!$('header nav').children().hasClass('mob-menu')) {
            $('header nav').append('<div class="mob-menu"></div>');
            $('footer .menu').clone().appendTo('.mob-menu').removeClass().addClass('cloned-menu');
            $('.cloned-menu li a').append('<span></span>');
            $('header .phone.btn').appendTo('.mob-menu');
        }
    };

    if ($(window).outerWidth() <= 992) {
        cloneMenu();
    };

    function mainAnimation() {

        $('.mob-menu-trigger').each(function (index, element) {

            var headerMobMenuTl = new TimelineMax({
                    paused: true
                }),
                mobMenuSpan1 = $(this).find('span:eq(0)'),
                mobMenuSpan2 = $(this).find('span:eq(2)'),
                mobMenu = $('.mob-menu'),
                mobMenuLi = mobMenu.find('li'),
                headerPhone = $('header .phone.btn');

            headerMobMenuTl
                .to(mobMenu, 0, {
                    display: 'flex'
                })
                .to(mobMenuLi, 0, {
                    y: 15,
                    autoAlpha: 0,
                })
                .to(headerPhone, 0, {
                    display: 'flex',
                    y: 15,
                    autoAlpha: 0
                })
                .to(mobMenuSpan1, 0.4, {
                    y: 5,
                    autoAlpha: 0,
                    ease: Power1.easeOut
                })
                .to(mobMenuSpan2, 0.4, {
                    y: -5,
                    autoAlpha: 0,
                    ease: Power1.easeOut
                }, '-=0.4')
                .to(mobMenuSpan1, 0.4, {
                    y: 0,
                    autoAlpha: 1,
                    ease: Power1.easeOut
                })
                .to(mobMenuSpan2, 0.4, {
                    y: 0,
                    autoAlpha: 1,
                    ease: Power1.easeOut
                }, '-=0.4')
                .to(mobMenu, 0.6, {
                    autoAlpha: 1,
                    ease: Power1.easeOut
                }, 0)
                .staggerTo(mobMenuLi, 0.4, {
                    y: 0,
                    autoAlpha: 1,
                    ease: Power1.easeOut
                }, 0.08, '-=0.6')
                .to(headerPhone, 0.08, {
                    y: 0,
                    autoAlpha: 1,
                    ease: Power1.easeOut
                }, '-=0.2')

            element.animation = headerMobMenuTl;

        });
    };

    mainAnimation();

    $(window).resize(function () {
        if ($(window).outerWidth() <= 992) {
            cloneMenu();
            mainAnimation();
        } else {
            $('header .phone.btn').appendTo('header nav');
            $('.mob-menu').remove();
            $('.mob-menu-trigger').removeClass('active');
        }
    });

    $('.mob-menu-trigger').click(function (e) {
        e.preventDefault();

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            this.animation.reverse()
                .eventCallback("onReverseComplete", function () {
                    TweenMax.to('.mob-menu', 0, {
                        clearProps: 'all'
                    });
                    TweenMax.to('header .phone.btn', 0, {
                        clearProps: 'all'
                    });
                    TweenMax.to('.mob-menu li', 0, {
                        clearProps: 'all'
                    });
                });
        } else {
            $(this).addClass('active');
            this.animation.play();
        }
    });

    if ($('#advantages').length) {
        $('header .menu li a').click(function (event) {
            event.preventDefault();

            var $window = $(window),
                href = $(this).attr("href"),
                topY = $(href).offset().top;

            // if ($('.mob-menu').hasClass('active')) {
            //     headerMobMenuTl.reverse()
            //         .eventCallback("onReverseComplete", function () {
            //             TweenMax.to(menu, 0, {
            //                 clearProps: 'all'
            //             });
            //             TweenMax.to(menuLi, 0, {
            //                 clearProps: 'all'
            //             });
            //             TweenMax.to(headerPhone, 0, {
            //                 clearProps: 'all'
            //             });
            //         });
            //     $('.mob-menu').removeClass('active');
            // }

            TweenMax.to($window, 1, {
                scrollTo: {
                    y: topY,
                    autoKill: true
                },
                ease: Circ.easeOut
            });
            return false;
        });
    } else {
        $('header .menu li a').each(function () {
            var href = $(this).attr('href');
            $(this).attr('href', '/' + href + '');
        });
    };

    $('.quotes-slider').on('initialized.owl.carousel changed.owl.carousel', function (e) {
            if (!e.namespace) {
                return;
            }
            var carousel = e.relatedTarget;
            $(this).parent().find('.counter').html('<span>0' + (carousel.relative(carousel.current()) + 1) + '</span>' + '<span>0' + carousel.items().length + '</span>');
        })

        .owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            items: 1,
            navText: ['<div class="btn btn_white-blue btn_btn-small"><i class="btn__prev"></i></div>', '<div class="btn btn_white-blue btn_btn-small"><i class="btn__next"></i></div>']
        });

    $('.quotes__photo:first').show();
    $('.quotes__link:first').show();

    $('.quotes').each(function () {
        var counter = $(this).find('.counter'),
            dots = $(this).find('.owl-dots'),
            dot = $(this).find('.owl-dot');
        counter.clone().appendTo(dots);
        dot.width(100 / dot.length + '%');
    });

    $('.quotes-slider').on('changed.owl.carousel resized.owl.carousel', function (e) {
        $('.quotes__photo').hide();
        $('.quotes__photo').eq(e.page.index).fadeIn(600);
        $('.quotes__link').hide();
        $('.quotes__link').eq(e.page.index).fadeIn(600);
        $(this).parent().find('.counter').clone().appendTo($(this).find('.owl-dots'));
    });


    // $('.video-slider .owl-carousel').on('initialized.owl.carousel', function (e) {
    //     // $('.video-slider__title').eq(e.page.index).prepend(e.page.index);
    // })

    $('.video-slider .owl-carousel').on('initialized.owl.carousel changed.owl.carousel', function (e) {
            if (!e.namespace) {
                return;
            }
            var carousel = e.relatedTarget;
            $(this).parent().find('.counter').html('<span>0' + (carousel.relative(carousel.current()) + 1) + '</span>' + '<span>0' + carousel.items().length + '</span>');
        })

        .owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            items: 1,
            navText: ['<div class="btn btn_white-tr btn_btn-small"><i class="btn__prev"></i></div>', '<div class="btn btn_white-tr btn_btn-small"><i class="btn__next"></i></div>']
        });

    $('.video-slider__video:first').show();
    $('.video-slider__title:first').show();

    $('.video-slider').each(function () {
        var carosel = $(this),
            counter = $(this).find('.counter'),
            videoPlayer = carosel.find('.video-slider__video:first').find('video')[0],
            timeCounter = $(this).find('.time-counter'),
            dots = $(this).find('.owl-dots'),
            dot = $(this).find('.owl-dot'),
            nav = $(this).find('.owl-nav'),
            title = $(this).find('.video-slider__titles');
        counter.clone().appendTo(dots);
        dot.width(100 / dot.length + '%');
        title.prependTo(nav);
        timeCounter.prependTo(nav);

        function test() {
            timeCounter.html(videoTime(videoPlayer.duration));
        };

        setTimeout(function () {
            test();
        }, 3000);
    });

    $('.video-slider .owl-carousel').on('changed.owl.carousel resized.owl.carousel', function (e) {
        $('.video-slider__video').hide();
        $('.video-slider__video').eq(e.page.index).fadeIn(600);
        $('.video-slider__title').hide();
        $('.video-slider__title').eq(e.page.index).fadeIn(600);
        $(this).parent().find('.counter').clone().appendTo($(this).find('.owl-dots'));

        var timeCounter = $(this).parent().find('.time-counter'),
            videoPlayer = $(this).parent().find('.video-slider__video').eq(e.page.index).find('video')[0];

        timeCounter.html(videoTime(videoPlayer.duration));


        $(this).parent().find('.play-slider-btn').removeClass('playing');
        for (var i = 0; i < $(this).parent().find('.video-slider__video video').length; i++) {
            $(this).parent().find('.video-slider__video video')[i].pause();
        }

    });

    function videoTime(time) {
        time = Math.floor(time);
        var minutes = Math.floor(time / 60);
        var seconds = Math.floor(time - minutes * 60);
        var minutesVal = minutes;
        var secondsVal = seconds;
        if (minutes < 10) {
            minutesVal = '0' + minutes;
        }
        if (seconds < 10) {
            secondsVal = '0' + seconds;
        }
        return minutesVal + ':' + secondsVal;
    }

    $('.video-slider__video').each(function () {
        var video = $(this).find('video'),
            sliderBtn = $(this).find('.play-slider-btn');

        sliderBtn.click(function (e) {
            e.preventDefault();
            if (!$(this).hasClass('playing')) {
                video[0].play();
                $(this).addClass('playing');
            } else {
                video[0].pause();
                $(this).removeClass('playing');
            }
        });

    });

    $('.show-hide-block').each(function () {
        var hiddenBlock = $(this).find('.show-hide-block__hiden'),
            hiddenBlockItem = $(this).find('.show-hide-block__hiden .show-hide-block__item'),
            blockContent = $(this).find('.show-hide-block__content'),
            btn = $(this).find('.show-hide-block__btn');

        var showHideTl = new TimelineMax({
                paused: true
            }),
            $window = $(window);

        showHideTl
            .staggerTo(hiddenBlockItem, 0.1, {
                display: 'block'
            }, 0.05)
            .staggerTo(hiddenBlockItem, 0.2, {
                autoAlpha: 1,
                ease: Linear.easeNone
            }, 0.05, 0);

        btn.on('click', 'a', function (e) {
            e.preventDefault();

            hiddenBlock.toggleClass('visible');
            blockContent.toggleClass('hide-before');

            if (hiddenBlock.hasClass('visible')) {
                $(this).find('i').attr('class', 'btn__to-top');

                showHideTl.play()

                    .to($window, 0.5, {
                        scrollTo: {
                            y: $(window).scrollTop(),
                            autoKill: true
                        },
                        ease: Circ.easeOut
                    });

            } else {
                $(this).find('i').attr('class', 'btn__to-bottom');
                showHideTl.reverse();
            }
        });
    });

    $('.form-block__radio-item').on('click', '.btn', function () {
        $(this).parent().parent().parent().find('.title-block:first').hide();
        $(this).parent().parent().parent().find('.title-block:last').show();
        $(this).parent().hide();
        $(this).parent().siblings('.form-block__inputs-item').show();
    });


    var controller = new ScrollMagic.Controller;

    $('.title-block').each(function () {
        var titleBlockTl = new TimelineMax();
        var titles = $(this).children(),
            buttons = $(this).siblings('.buttons-block');

        if ($(this).parent().hasClass('main-top-block__content')) {
            titleBlockTl
                .staggerFrom(titles, 0.6, {
                    x: 15,
                    autoAlpha: 0,
                    ease: Power1.easeIn
                }, 0.4)

                .from(buttons, 0.6, {
                    x: 15,
                    autoAlpha: 0,
                    ease: Power1.easeIn
                }, '-=0.2')

        } else {
            titleBlockTl
                .staggerFrom(titles, 0.7, {
                    y: 15,
                    autoAlpha: 0,
                    ease: Power1.easeIn
                }, 0.2)
        };

        var titleBlockScene = new ScrollMagic.Scene({
                triggerElement: this,
                triggerHook: 0.9,
                reverse: false
            })

            // .addIndicators({
            //     name: 'fade-scene',
            //     colorTrigger: 'black',
            //     indent: 50,
            //     colorStart: '#75c695',
            //     colorEnd: 'pink',
            // })

            .setTween(titleBlockTl).addTo(controller);
    });

    $('.content-block').each(function () {
        var contentBlockTl = new TimelineMax(),
            text = $(this).find('.content-block__text p'),
            img = $(this).find('.content-block__img'),
            buttons = $(this).find('.buttons-block'),
            signature = $(this).find('.content-block__signature');

        contentBlockTl
            .staggerFrom(text, 0.8, {
                x: 15,
                autoAlpha: 0,
                ease: Power1.easeIn
            }, 0.4, 0.4)
            .from(img, 0.6, {
                y: 15,
                autoAlpha: 0,
                ease: Power1.easeIn
            }, 0.2)
            .from(buttons, 0.6, {
                y: 15,
                autoAlpha: 0,
                ease: Power1.easeIn
            }, '-=0.2')
            .from(signature, 0.6, {
                autoAlpha: 0,
                ease: Power1.easeIn
            }, '-=0.5')
        var contentBlockScene = new ScrollMagic.Scene({
                triggerElement: this,
                triggerHook: 0.9,
                reverse: false
            })


            // .addIndicators({
            //     name: 'fade-scene',
            //     colorTrigger: 'black',
            //     indent: 50,
            //     colorStart: '#75c695',
            //     colorEnd: 'pink',
            // })

            .setTween(contentBlockTl).addTo(controller);
    });

    $('.tabs-block').each(function () {
        var tabsListTl = new TimelineMax(),
            tabsLi = $(this).find('.tabs-list__link');

        tabsListTl
            .staggerFrom(tabsLi, 1, {
                autoAlpha: 0,
                ease: Power1.easeIn
            }, 0.3, 0.8)

        var tabsListScene = new ScrollMagic.Scene({
                triggerElement: this,
                triggerHook: 0.85,
                reverse: false
            })

            // .addIndicators({
            //     name: 'tabs list',
            //     colorTrigger: 'black',
            //     indent: 50,
            //     colorStart: 'rad',
            //     colorEnd: 'pink',
            // })

            .setTween(tabsListTl).addTo(controller);
    });

    $('.tabs-content__item').each(function () {
        var tabsContentTl = new TimelineMax(),
            tabsHead = $(this).find('.tabs-content__head');
        tabsText = $(this).find('p');

        tabsContentTl
            .from(tabsHead, 0.8, {
                autoAlpha: 0,
                ease: Power1.easeIn
            }, 0.3)
            .staggerFrom(tabsText, 0.8, {
                y: 15,
                autoAlpha: 0,
                ease: Power1.easeIn
            }, 0.2, '-=0.7')

        var tabsContentScene = new ScrollMagic.Scene({
                triggerElement: this,
                triggerHook: 0.9,
                reverse: false
            })

            // .addIndicators({
            //     name: 'tabs content',
            //     colorTrigger: 'black',
            //     indent: 50,
            //     colorStart: '#75c695',
            //     colorEnd: 'pink',
            // })

            .setTween(tabsContentTl).addTo(controller);
    });

    $('.show-hide-block__item').each(function () {
        var showHideBlockTl = new TimelineMax(),
            itemsContent = $(this).children();

        showHideBlockTl
            .staggerFrom(itemsContent, 0.4, {
                y: 15,
                autoAlpha: 0,
                ease: Power1.easeIn
            }, 0.2, 0.4)

        var showHideBlockScene = new ScrollMagic.Scene({
                triggerElement: this,
                triggerHook: 0.9,
                reverse: false
            })

            // .addIndicators({
            //     name: 'fade-scene',
            //     colorTrigger: 'black',
            //     indent: 50,
            //     colorStart: '#75c695',
            //     colorEnd: 'pink',
            // })

            .setTween(showHideBlockTl).addTo(controller);
    });

    $('.partners').each(function () {
        var partnersTl = new TimelineMax(),
            logos = $(this).find('.partners__logos img'),
            text = $(this).find('.partners__text'),
            buttons = $(this).find('.partners__buttons');

        partnersTl
            .staggerFrom(logos, 0.4, {
                scale: 0,
                ease: Power1.easeIn
            }, 0.1, 0.3)
            .from(text, 1, {
                y: 15,
                autoAlpha: 0,
                ease: Power1.easeIn
            }, 0.4)
            .from(buttons, 1, {
                y: 15,
                autoAlpha: 0,
                ease: Power1.easeIn
            }, 0.8)

        var partnersScene = new ScrollMagic.Scene({
                triggerElement: this.children[1],
                triggerHook: 0.9,
                reverse: false
            })

            // .addIndicators({
            //     name: 'fade-scene',
            //     colorTrigger: 'black',
            //     indent: 50,
            //     colorStart: '#75c695',
            //     colorEnd: 'pink',
            // })

            .setTween(partnersTl).addTo(controller);
    });

    $('.contacts').each(function () {
        var contactsTl = new TimelineMax(),
            items = $(this).find('.contacts__content').children(),
            text = $(this).find('.contacts__text');

        contactsTl
            .staggerFrom(items, 0.6, {
                scale: 0,
                autoAlpha: 0,
                ease: Power1.easeIn
            }, 0.2, 0.3)
            .from(text, 0.6, {
                y: 15,
                autoAlpha: 0,
                ease: Power1.easeIn
            }, 0.6)

        var contactsScene = new ScrollMagic.Scene({
                triggerElement: this.children[0].children[1],
                triggerHook: 0.9,
                reverse: false
            })

            // .addIndicators({
            //     name: 'contacts-scene',
            //     colorTrigger: 'black',
            //     indent: 50,
            //     colorStart: '#75c695',
            //     colorEnd: 'pink',
            // })

            .setTween(contactsTl).addTo(controller);
    });

    $('header .menu li a').each(function (index, element) {
        $(this).append('<span></span>');

        headerNavHoverTl = new TimelineMax({
                paused: true
            }),
            navSpan = $(this).find('span');

        headerNavHoverTl
            .fromTo(navSpan, 0.5, {
                x: '-100%',
                autoAlpha: 0,
                ease: Power1.easeOut
            }, {
                x: '0%',
                autoAlpha: 1,
                ease: Power1.easeOut
            })

        element.animation = headerNavHoverTl;

        $(this)
            .hover(function () {
                this.animation.play();
            }, function () {
                this.animation.reverse();
            });
    });

});

$(window).bind('resize load ready', function () {

    if ($('.calendar').length) {
        if ($(window).outerWidth() <= 480) {
            if (!$('.cloned-title').length) {
                $('.calendar').before('<div class="title-block cloned-title"><div class="title-block__title"></div>');
                $('.cloned-title .title-block__title').html($('.main-top-block .title-block__title').html());
                $('.main-top-block .title-block__subtitle').appendTo($('.cloned-title'));
            }
        } else {
            $('.cloned-title .title-block__subtitle').appendTo($('.main-top-block .title-block'));
            $('.cloned-title').remove();
        }
    };

    if ($('.thanks-contacts').length) {

        $('footer nav').hide();
        $('footer').css({
            'height': 'initial',
            'padding': '0'
        });

        if ($(window).outerWidth() <= 480) {
            if (!$('.cloned-title').length) {
                $('footer').before('<div class="title-block cloned-title"><div class="title-block__title"></div>');
                $('.cloned-title .title-block__title').html($('.main-top-block .title-block__title').html());
                $('.main-top-block .title-block__subtitle').appendTo($('.cloned-title'));
                $('.cloned-title').css({
                    'padding-bottom': '60px',
                    'margin': '0'
                });
                $('.main-top-block__svg-bg path').css({
                    'fill': $('.cloned-title').css('background-color')
                });
            }
        } else {
            $('.cloned-title .title-block__subtitle').appendTo($('.main-top-block .title-block'));
            $('.cloned-title').remove();
            $('.main-top-block__svg-bg path').css({
                'fill': $('footer').css('background-color')
            });
        }
    };

    if ($('.privacy-information').length) {
        if ($(window).outerWidth() <= 480) {
            if (!$('.privacy-information .title-block__subtitle').length) {
                $('.main-top-block .title-block__subtitle').appendTo($('.privacy-information .title-block'));
            }
        } else {
            $('.privacy-information .title-block__subtitle').appendTo($('.main-top-block .title-block'));
        }
    };

    $('.content-block').each(function () {
        var titleBlock = $(this).find('.title-block'),
            contentText = $(this).find('.content-block__text'),
            contentImg = $(this).find('.content-block__img');

        if ($(window).outerWidth() <= 992) {

            if (contentText.children().hasClass('title-block')) {
                titleBlock.prependTo(contentImg);
            } else {
                return false;
            }

        } else {

            if (contentImg.children().hasClass('title-block')) {
                titleBlock.prependTo(contentText);
            } else {
                return false;
            }

        }
    });

    $('.quotes').each(function () {
        if ($('.video-slider').length) {
            if ($(window).outerWidth() >= 1200) {
                $(this).find('.quotes__photos').addClass('hide-before');
            } else {
                $(this).find('.quotes__photos').removeClass('hide-before');
            }
        } else {
            return false;
        }
    });

    $('.tabs-block').each(function () {
        var tabsList = $(this).find('.tabs-list'),
            tabsLink = $(this).find('.tabs-list__link'),
            tabsLinkA = tabsLink.find('a'),
            tabsContent = $(this).find('.tabs-content'),
            navHeight = $('header nav').outerHeight();

        tabsLinkA.click(function (e) {
            e.preventDefault();

            if ($(this).parent().hasClass('active')) {
                return false;
            } else {
                var tabsTl = new TimelineMax(),
                    tabsContentDiv = $($(this).attr('href')).find('.tabs-content__item>div');

                tabsLink.removeClass('active');
                $(this).parent().addClass('active');
                tabsContent.removeClass('active');
                $($(this).attr('href')).addClass('active');


                tabsTl
                    .to(tabsContentDiv, 0, {
                        autoAlpha: 0,
                        y: 12
                    })
                    .to($(window), 0.5, {
                        scrollTo: {
                            y: $($(this).attr('href')).offset().top - navHeight,
                            autoKill: true
                        },
                        ease: Circ.easeOut
                    }, 0)
                    .staggerTo(tabsContentDiv, 0.5, {
                        autoAlpha: 1,
                        y: 0
                    }, 0.2)

                return false;
            }
        });


        if ($(window).outerWidth() <= 992) {

            if (tabsList.children().hasClass('tabs-list__link')) {
                for (var i = 0; i <= tabsLink.length; i++) {
                    $(tabsLink[i]).prependTo($(tabsContent[i]));
                }
            }

        } else {

            if (tabsContent.children().hasClass('tabs-list__link')) {
                $(tabsLink).prependTo(tabsList);
            }

        }
    });

    $('.tabs-content__item').each(function () {
        var tabsContentHead = $(this).find('.tabs-content__head'),
            tabsContentHeadImg = $(this).find('.tabs-content__head-img');

        if ($(window).outerWidth() <= 992) {

            if (tabsContentHead.children().hasClass('tabs-content__head-img')) {
                tabsContentHeadImg.prependTo($(this));
            }

        } else {

            if ($(this).children().hasClass('tabs-content__head-img')) {
                tabsContentHeadImg.prependTo(tabsContentHead);
            }

        }
    });

    $('.survey__svg').each(function () {
        var width = $(window).width(),
            widthOuter = $(window).outerWidth(),
            rect = $(this).find('rect'),
            height = 44;

        if (widthOuter <= 640) {
            height = 32;
        }
        if (widthOuter <= 576) {
            height = 28;
        }
        if (widthOuter <= 480) {
            height = 22;
        }
        if (widthOuter <= 360) {
            height = 15;
        }

        function percentCalcMinus(firstValue, percent) {
            return firstValue * (1 - percent / 100);
        };

        function percentCalcPlus(firstValue, percent) {
            return firstValue * (1 + percent / 100);
        };

        rect.attr('y', height).attr('width', width);
        $('.main-top-block__svg-bg').hide();
        $(this).find('path').attr('d', 'M' + width + ' ' + height + 'H1.' + percentCalcPlus(width, 6675.91) + 'e-05L0 ' + percentCalcMinus(height, 1.06) + 'C' + percentCalcMinus(width, 57.4653) + ' -' + percentCalcMinus(height, 18.79) + ' ' + percentCalcMinus(width, 18.5763) + ' ' + percentCalcMinus(height, 74.32) + ' ' + width + '  ' + percentCalcMinus(height, 1.06) + 'L' + width + ' ' + height + 'Z');

        function isiPhone() {
            return (
                (navigator.platform.indexOf("iPhone") != -1) ||
                (navigator.platform.indexOf("iPod") != -1)
            );
        }
        if (isiPhone()) {
            $(this).hide();
        }
    });
});


$(window).bind("load resize ready scroll", function () {
    headerNavTl = new TimelineMax(),
        nav = $('header nav'),
        navLink = nav.find('li a'),
        navSpan = navLink.find('span'),
        navLogo = nav.find('.logo svg path:gt(0)'),
        navLogoText = nav.find('.logo svg path:eq(0)'),
        navBtn = nav.find('.btn'),
        scrollTop = $(document).scrollTop(),
        windowWidth = $(window).outerWidth();


    function headerNavWhiteBg() {
        headerNavTl
            .to(nav, 0.6, {
                background: 'rgba(255,255,255,1)',
                boxShadow: '0px 3px 10px rgba(2, 134, 255, 0.05)',
                ease: Power1.easeInOut
            })
            .to(navLogo, 0.6, {
                fill: '#0286FF',
                ease: Power1.easeInOut
            }, '-=0.6')
            .to(navLogoText, 0.6, {
                fill: '#181818',
                ease: Power1.easeInOut
            }, '-=0.6')
            .to(navLink, 0.6, {
                color: '#181818',
                ease: Power1.easeInOut
            }, '-=0.5')
            .to(navSpan, 0.6, {
                background: 'rgb(2, 134, 255)',
                ease: Power1.easeInOut
            }, '-=0.6')

        navBtn.removeClass('btn_white-tr').addClass('btn_white-blue');
    };

    function headerNavOnWhiteBg() {
        headerNavTl
            .to(nav, 0.6, {
                background: 'rgba(255,255,255,0)',
                boxShadow: 'none',
                ease: Power1.easeInOut
            })
            .to(navLogo, 0.6, {
                fill: '#0286FF',
                ease: Power1.easeInOut
            }, '-=0.6')
            .to(navLogoText, 0.6, {
                fill: '#181818',
                ease: Power1.easeInOut
            }, '-=0.6')
            .to(navLink, 0.6, {
                color: '#181818',
                ease: Power1.easeInOut
            }, '-=0.5')
            .to(navSpan, 0.6, {
                background: 'rgb(2, 134, 255)',
                ease: Power1.easeInOut
            }, '-=0.6')

        navBtn.removeClass('btn_white-tr').addClass('btn_white-blue');
    };

    if (windowWidth >= 992) {
        if (scrollTop) {
            headerNavWhiteBg();
        } else {

            if ($('.thanks-contacts').length) {
                headerNavOnWhiteBg();
            } else if ($('.features-contact').length) {
                headerNavOnWhiteBg();
            } else if ($('.survey').length) {
                headerNavOnWhiteBg();
            } else {
                headerNavTl
                    .to(nav, 0.6, {
                        background: 'rgba(255,255,255,0)',
                        boxShadow: 'none',
                        ease: Power1.easeInOut
                    })
                    .to(navLogo, 0.6, {
                        fill: '#fff',
                        ease: Power1.easeInOut
                    }, '-=0.6')
                    .to(navLogoText, 0.6, {
                        fill: '#fff',
                        ease: Power1.easeInOut
                    }, '-=0.6')
                    .to(navLink, 0.6, {
                        color: '#fff',
                        ease: Power1.easeInOut
                    }, '-=0.5')
                    .to(navSpan, 0.6, {
                        background: 'rgb(255, 255, 255)',
                        ease: Power1.easeInOut
                    }, '-=0.6')

                navBtn.removeClass('btn_white-blue').addClass('btn_white-tr');
            }
        }
    } else {
        headerNavWhiteBg();
    }

    navLink.hover(function () {
            if (scrollTop) {
                TweenMax.to($(this), 0.6, {
                    color: '#0286FF',
                    ease: Power1.easeInOut
                })
            } else {
                return false;
            }
        },
        function () {
            if (scrollTop) {
                TweenMax.to($(this), 0.6, {
                    color: '#181818',
                    ease: Power1.easeInOut
                })
            } else {
                return false;
            }
        });
});