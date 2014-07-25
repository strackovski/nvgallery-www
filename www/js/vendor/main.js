/* ===================================================
 * nv/Gallery-www javascript
 * http://github.com/strackovski/nvgallery-www
 * Copyright 2014 Vladimir Stračkovski <vlado@nv3.org>
 *
 * Main Javascript UI, fires on document ready
 * =================================================== */

/*jslint browser:true*/
/*global $, jQuery*/
/*global console*/
$(window).load(function () {
    //$('body,html').animate({scrollTop: 0}, {duration: 700});
    'use strict';

    var win_height = 0,
        galleryControl = 0;

    // Make the background change when navigating through the gallery
    $('body').on('click', '.main-first .nv-gallerious-nav-right', function () {
        galleryControl += 1;
        $('.back').fadeOut(250, function () {
            if (galleryControl === 1) {
                $('.back').css({backgroundImage: 'url(images/bee_b.jpg)'});
            } else if (galleryControl === 2) {
                $('.back').css({backgroundImage: 'url(images/hill_b.jpg)'});
            } else if (galleryControl === 3) {
                galleryControl = 0;
                $('.back').css({backgroundImage: 'url(images/islands_b.jpg)'});
            }
            $('.back').fadeIn(800);
        });
    });

    $('body').on('click', '.main-first .nv-gallerious-nav-left', function () {
        galleryControl -= 1;
        $('.back').fadeOut(250, function () {
            if (galleryControl === -1) {
                $('.back').css({backgroundImage: 'url(images/hill_b.jpg)'});
                galleryControl = 2;
            } else if (galleryControl === 1) {
                $('.back').css({backgroundImage: 'url(images/bee_b.jpg)'});
            } else if (galleryControl === 0) {
                $('.back').css({backgroundImage: 'url(images/islands_b.jpg)'});
            }
            $('.back').fadeIn(300);
        });
    });


    // Create an array of images for the gallery
    var myPics = [
        {path: 'images/islands.jpg', description: 'Nice island.'},
        {path: 'images/bee.jpg', description: 'Bee on a flower.'},
        {path: 'images/hill.jpg', description: 'Golden hill.'}
    ];

    // Home page
    if ($('div.start').length > 0) {
        $('.myDiv a').on('click', function (e) {
            e.preventDefault();
        });

        $('.main-first').nvgallery(myPics, {height: 0.45, containerCss: {border: '10px solid rgba(0,0,0,.2)', backgroundClip: 'padding-box'}, hideMenuBar: true,
            disableMenuBar: true, fadeDuration: 200,
            leftArrowCss: { borderRadius: '50%', left: '10px', background: '#eee', color: '#111', height: '30px', width: '30px', lineHeight: '30px', marginTop: '10px'},
            rightArrowCss: { borderRadius: '50%', right: '10px', background: '#fff', color: '#111', height: '30px', width: '30px', lineHeight: '30px', marginTop: '10px'}});

        // Set active link
        $('.nav ul li a.btn-home').parent('li').addClass('active-link');

        // Call nvGallery
        $('.ga-1').nvgallery(myPics, {height: 0.35});

        // Click handler for 'show me' button
        $('.start').on('click', function (e) {
            e.preventDefault();
            win_height = $(window).height();
            var min_height = 770;
            if (min_height > win_height) {
                $('body,html').animate({scrollTop: min_height}, {duration: 700});
            } else {
                $('body,html').animate({scrollTop: win_height}, {duration: 700});
            }
        });
    }

    // Download page
    if ($('.dl-title').length > 0) {
        //set active link
        $('.nav ul li a.btn-dl').parent('li').addClass('active-link');
    }

    // Documentation page
    if ($('h2.docs-title').length > 0) {

        $('.ga-2').nvgallery(myPics, {height: 0.35});
        // Set active link
        $('.nav ul li a.btn-docs').parent('li').addClass('active-link');

        var galleryLoad2 = 0,
            activeGuide = 'quick guide';

        $('ul.documentation li a').on('click', function (e) {
            $(this).parent('li').siblings().removeClass('active-link');
            $(this).parent('li').addClass('active-link');
            e.preventDefault();
            var target = $(this).attr('class');
            if (!(activeGuide === 'quick guide' && target === 'btn-quick-guide') &&
                !(activeGuide === 'long guide' && target === 'btn-long-guide')) {
                if (target === 'btn-quick-guide') {
                    $('.docs-page> div[class*="guide"]:visible').fadeOut(100, function () {
                        $('.quick-guide').fadeIn(200);
                        activeGuide = 'quick guide';
                    });
                }
                if (target === 'btn-long-guide') {
                    $('.docs-page> div[class*="guide"]:visible').fadeOut(100, function () {
                        $('.detailed-guide').fadeIn(200);

                        if (galleryLoad2 === 0) {
                            $('.ga-3').html('').nvgallery(myPics, {height: 0.35});
                            $('.ga-4').nvgallery(myPics, {
                                height: 1.2,
                                barCss: {background: '#fff', color: '#111'},
                                containerCss: {background: '#000', border: '2px solid #999'},
                                leftArrowCss: {borderRadius: '50%', background: '#111', color: '#fff', left: '10px'},
                                rightArrowCss: {borderRadius: '50%', background: '#111', color: '#fff', right: '10px'}
                            });
                            galleryLoad2 = 1;
                        }
                        activeGuide = 'long-guide';
                    });
                }
            }
        });

        var index = 0,
            indexPlus = 0,
            string = 0;

        $('.detailed-guide-nav ul li a').on('click', function (e) {
            e.preventDefault();
            if ($(this).attr('class') === 'back-to-top') {
                $('html, body').animate({scrollTop: 0}, 'slow');
            } else {
                index = $(this).parent('li').index();
                indexPlus = index + 1;
                string = '.target-' + indexPlus;
                $('html, body').animate({scrollTop: $(string).offset().top - 80}, 'slow');
            }
        });

        $('.style-part').on('click', function (e) {
            e.preventDefault();
            $('html, body').animate({scrollTop: $('.target-6').offset().top - 80}, 'slow');
        });

        var ex,
            type = $('.popup .type-declaration'),
            pre  = $('.popup .usage-declaration pre'),
            details = $('.popup .details-declaration p');

        $('.explanation').hover(function () {
            $(this).stop(true, false);
            ex = $(this).parents('li').index();
            switch (ex) {
            case 0:
                type.html("type: number<br>default: 0.5625<br>possible options:any number (recomended range: 0.3 - 2.0)");
                pre.html("$('div').nvgallery({height:0.4});");
                details.html("Sets the gallery's height in relation to its width.");
                break;
            case 1:
                type.html("type: number<br>default: 6000<br>possible options: any number");
                pre.html("$('div').nvgallery({interval:8000});");
                details.html("Sets the number of milliseconds a picture is shown when slideshow is active.");
                break;
            case 2:
                type.html("type: boolean<br>default: false<br>possible options: true,false");
                pre.html("$('div').nvgallery({disableMenuBar:false});");
                details.html("Permanently hides the menu bar at the bottom of the gallery.<br>Comes in handy when creating banners/panels " +
                    "in combination with {hideNav:true} or {disableNav: true}");
                break;
            case 3:
                type.html("type: boolean<br>default: false<br>possible options: true, false");
                pre.html("$('div').nvgallery({hideMenuBar: false});");
                details.html("Hides the menu bar at the bottom. The bar appears when hovering over the gallery.");
                break;
            case 4:
                type.html("type: boolean<br>default: false<br>possible options: true, false");
                pre.html("$('div').nvgallery({autoplay:false});");
                details.html("Initiates the gallery with slideshow activated.");
                break;
            case 5:
                type.html("type: boolean<br>default: false<br>possible options: true, false");
                pre.html("$('div').nvgallery({hideNav:false});");
                details.html("When true, navigation is initially hideen. Navigation appears when the user hovers over the gallery.");
                break;
            case 6:
                type.html("type: boolean<br>default: false<br>possible options: true, false");
                pre.html("$('div').nvgallery({disableNav:false});");
                details.html("When true, navigation is permanently hidden.");
                break;
            case 7:
                type.html("type: object<br>default: {borderRadius: '0 10% 10% 0', left:'0px'}<br>possible options: any css style declaration");
                pre.html("$('div').nvgallery(leftArrowCss:{borderRadius:'0 10% 10% 0', left:'0px', height:'40px', width:'40px', lineHeight: '40px'});");
                details.html("Sets the style of the left navigation arrow.");
                break;
            case 8:
                type.html("type: object<br>default: {borderRadius: '0 10% 10% 0', left:'0px'}<br>possible options: any css style declaration");
                pre.html("$('div').nvgallery(rightArrowCss:{borderRadius:'0 10% 10% 0', left:'0px', height:'40px', width:'40px', lineHeight: '40px'});");
                details.html("Sets the style of the right navigation arrow.");
                break;
            case 9:
                type.html("type: object<br>default: {background: '#111', color:'#fff', fontWeight:100', " +
                    "borderBottom:'none'}<br>possible options: any css style declaration");
                pre.html("$('div').nvgallery(containerCss:{background:'#006699', color:'#fff'});");
                details.html("Sets the style of the gallery container<br>'background' defines which color will the image fade to when 'fade' effect is chosen.<br>Styles also apply to the bottom bar, if no 'barCss' options is passed.");
                break;
            case 10:
                type.html("type: object<br>default: {}<br>possible options: any css style declaration");
                pre.html("$('div').nvgallery(barCss:{background:'#fff', color:'#000'});");
                details.html("Sets the style of the bottom bar.");
                break;
            case 11:
                type.html("type: number<br>default: 30<br>possible options: any number");
                pre.html("$('div').nvgallery({fadeDuration: 30});");
                details.html("Sets the number of milliseconds it takes for a picture to fade out when slideshow is active or when a user is navigating.");
                break;
            }
            $('.popup').fadeIn(100);
        }, function () {
            $(this).stop(true, false);
            $('.popup').fadeOut(100);
        });
    }

});