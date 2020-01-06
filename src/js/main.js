$(document).ready(function () {

    $('.mob-menu-trigger').each(function () {

        var headerPhone = $('header .phone.btn');

        function cloneMenu() {
            if (!$('header nav').children().hasClass('mob-menu')) {
                $('header nav').append('<div class="mob-menu"></div>');
                $('footer .menu').clone().appendTo('.mob-menu').removeClass().addClass('cloned-menu');
                headerPhone.appendTo('.mob-menu');
            }
        };

        if ($(window).outerWidth() <= 992) {
            cloneMenu();
        };

        $(window).resize(function () {
            if ($(window).outerWidth() <= 992) {
                cloneMenu();
            } else {
                headerPhone.appendTo('header nav');
                $('.mob-menu').remove();
            }
        });


        var headerMobMenuTl = new TimelineMax({
                paused: true
            }),
            mobMenuSpan1 = $(this).find('span:eq(0)'),
            mobMenuSpan2 = $(this).find('span:eq(2)'),
            menuA = $(this).find('li a');

        var mobMenu = $('.mob-menu');
        var mobMenuLi = mobMenu.find('li');

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

        $(this).click(function (e) {
            e.preventDefault();

            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                headerMobMenuTl.reverse()
                    .eventCallback("onReverseComplete", function () {
                        // TweenMax.to(menu, 0, {
                        //     clearProps: 'all'
                        // });
                        // TweenMax.to(mobMenuLi, 0, {
                        //     clearProps: 'all'
                        // });
                        TweenMax.to(headerPhone, 0, {
                            clearProps: 'all'
                        });
                    });
            } else {
                $(this).addClass('active');
                headerMobMenuTl.play();
            }
        });

        menuA.click(function (event) {
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
    });


    $('.quotes-slider').on('initialized.owl.carousel changed.owl.carousel', function (e) {
            if (!e.namespace) {
                return;
            }
            var carousel = e.relatedTarget;
            $(this).parent().find('.counter').html('<span>0' + (carousel.relative(carousel.current()) + 1) + '</span>' + '<span>0' + carousel.items().length + '</span>');

            $('.quotes__photo:first').show();
            $('.quotes__photo').hide();
            $('.quotes__photo').eq(e.page.index).fadeIn(600);

            $('.quotes__link:first').show();
            $('.quotes__link').hide();
            $('.quotes__link').eq(e.page.index).fadeIn(600);
        })

        .owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            items: 1,
            navText: ['<div class="btn btn_white-blue btn_btn-small"><i class="btn__prev"></i></div>', '<div class="btn btn_white-blue btn_btn-small"><i class="btn__next"></i></div>']
        });

    $('.counter').clone().appendTo('.owl-dots');
    $('.owl-dot').width(100 / $('.owl-dot').length + '%');

    $('.quotes-slider').on('changed.owl.carousel resized.owl.carousel', function (e) {
        $('.counter').clone().appendTo('.owl-dots');
    });


    $('.show-hide-block').each(function () {
        var hiddenBlock = $(this).find('.show-hide-block__hiden'),
            blockContent = $(this).find('.show-hide-block__content'),
            btn = $(this).find('.show-hide-block__btn');

        btn.on('click', 'a', function (e) {
            e.preventDefault();

            // var showHideTl = new TimelineMax(),
            //     $window = $(window);
            var showHideTl = new TimelineMax();

            hiddenBlock.toggleClass('visible');
            blockContent.toggleClass('hide-before');

            if (hiddenBlock.hasClass('visible')) {
                $(this).find('i').attr('class', 'btn__to-top');

                showHideTl
                    .to('.show-hide-block__hiden', 2, {
                        maxHeight: 10000,
                        ease: Linear.easeNone
                    }, 0)
                    .to('.show-hide-block__hiden', 1, {
                        autoAlpha: 1,
                        ease: Linear.easeNone
                    }, 0)
                // .to($window, 1, {
                //     scrollTo: {
                //         y: blockContent.offset().top,
                //         autoKill: true
                //     },
                //     ease: Circ.easeOut
                // }, 0);

            } else {
                $(this).find('i').attr('class', 'btn__to-bottom');

                showHideTl
                    .to('.show-hide-block__hiden', 0.8, {
                        maxHeight: 0,
                        ease: Power1.easeOut
                    })
                    .to('.show-hide-block__hiden', 0.6, {
                        autoAlpha: 0,
                        ease: Linear.easeNone
                    }, 0)
                // .to($window, 2, {
                //     scrollTo: {
                //         y: blockContent.offset().top,
                //         autoKill: true
                //     },
                //     ease: Circ.easeOut
                // }, '-=0.3');
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
        var titleBlockTl = new TimelineMax(),
            titles = $(this).children(),
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

            // .setClassToggle(this, 'active')
            .on('enter leave', () => {
                $(this).toggleClass('fadeIn');
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
            buttons = $(this).find('.no-risks__buttons'),
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
                triggerElement: this.children[1],
                triggerHook: 0.9,
                reverse: false
            })

            // .setClassToggle(this, 'active')
            .on('enter leave', () => {
                $(this).toggleClass('fadeIn');
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

    $('.tabs-list').each(function () {
        var tabsListTl = new TimelineMax(),
            tabsLi = $(this).find('li');

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


    $('.tabs-block').each(function () {
        var tabsList = $(this).find('.tabs-list'),
            tabsLink = $(this).find('.tabs-list__link'),
            tabsLinkA = tabsLink.find('a'),
            tabsContent = $(this).find('.tabs-content');


        tabsLinkA.click(function (e) {
            e.preventDefault();

            if ($(this).parent().hasClass('active')) {
                return false;
            } else {
                tabsLink.removeClass('active');
                $(this).parent().addClass('active');
                tabsContent.removeClass('active');
                $($(this).attr('href')).addClass('active');

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


    if (windowWidth >= 992) {
        if (scrollTop) {
            headerNavWhiteBg();
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