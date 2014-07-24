/*
 * nv/Gallery javascript
 *
 * Licensed under the MIT license
 * <http://choosealicense.com/licenses/mit/>
 *
 * Copyright 2014 Vladimir Stračkovski <vlado@nv3.org>
 */
;(function ($, window, document, undefined) {
    'use strict';

    $.nvgallery = function (el, pics, options) {
        var base = this;
        base.el = el;
        base.$el = $(el);
        base.pics = pics;


        base.init = function () {
            base.ctrl = 0;
            base.secondCtrl = 0;
            base.autoPlay = 0;
            base.intervalId = 0;
            base.$picLength = base.pics.length;
            base.$isOpen = 0;
            base.scrollInterval = 0;

            //extend options
            base.options = $.extend({}, $.fn.nvgallery.defaults, options);

            //make basic DOM elements and cache them for later

            //lightbox, lightbox shadow
            base.$el.append('<div class="nv-gallerious-lightbox-shadow">');
            base.$el.append('<div class="nv-gallerious-lightbox"></div>');
            base.$lightbox = base.$el.find('.nv-gallerious-lightbox');
            base.$lightboxshadow = base.$el.find('.nv-gallerious-lightbox-shadow');

            //container
            base.$el.append('<div class="nv-gallerious-container"></div>');
            base.$container = base.$el.find('.nv-gallerious-container');

            //main
            base.$container.append('<div class="nv-gallerious-main"></div>');
            base.$main = base.$container.find('.nv-gallerious-main');

            //nav
            base.$main.append('<div class="nv-gallerious-nav"></div>');
            base.$nav = base.$main.find('.nv-gallerious-nav');

            //bar
            base.$container.append('<div class="nv-gallerious-bar"></div>');
            base.$bar = base.$container.find('.nv-gallerious-bar');

            //thumbnails view
            base.$container.append('<div class="nv-gallerious-layer"></div>');
            base.$layer = base.$container.find('.nv-gallerious-layer');

            //image
            base.$main.append('<div class="nv-gallerious-image">' +
                '<img class="nv-gallerious-img" src="' + base.pics[base.ctrl].path + '" alt="' + base.pics[base.ctrl].description + '"></div>');
            base.$imageContainer = base.$main.find('.nv-gallerious-image');
            base.$image = base.$imageContainer.find('.nv-gallerious-img');


            base.components();
        };

        base.components = function () {

            //bar components
            base.$bar.append('<div class="nv-gallerious-bar-counter"></div>');
            base.$bar.append('<div class="nv-gallerious-bar-slideshow"></div>');
            base.$bar.append('<div class="nv-gallerious-bar-text">' +
                '<div class="nv-gallerious-text-description">' + base.pics[base.ctrl].description + '</div></div>');
            base.$bar.append('<div class="nv-gallerious-bar-right">' +
                '<div class="nv-gallerious-bar-lightbox"><i class="fa fa-external-link"></i></div>' +
                '<div class="nv-gallerious-bar-thumbnails"><i class="fa fa-th"></i></div></div>');

            base.$counter = base.$bar.find('.nv-gallerious-bar-counter');
            base.$barSlideshow = base.$bar.find('.nv-gallerious-bar-slideshow');
            base.$barText = base.$bar.find('.nv-gallerious-text');
            base.$barTextDescription = base.$bar.find('.nv-gallerious-text-description');

            base.$counter.append('<span class="nv-gallerious-current">' + (base.ctrl + 1) + '</span>');
            base.$counter.append(' / ');
            base.$counter.append('<span class="nv-gallerious-total">' + base.$picLength + '</span>');

            base.$current = base.$counter.find('.nv-gallerious-current');
            base.$barRight = base.$bar.find('.nv-gallerious-bar-right');
            base.$lightboxLink = base.$bar.find('.nv-gallerious-bar-lightbox');
            base.$thumbnailsLink = base.$bar.find('.nv-gallerious-bar-thumbnails');

            //navigation
            base.$nav.append('<div class="nv-gallerious-nav-left"><</div>');
            base.$nav.append('<div class="nv-gallerious-nav-right">></div>');
            base.$navLeft = base.$nav.find('.nv-gallerious-nav-left');
            base.$navRight = base.$nav.find('.nv-gallerious-nav-right');
            base.$navLeft.css(base.options.leftArrowCss);
            base.$navRight.css(base.options.rightArrowCss);

            base.setup();
        };

        base.setup = function () {
            var margin, oldWidth;

            base.$image.load(function () {
                base.$image.css({width: '100%'});
                var imageHeight = base.$image.height(),
                    containerHeight = base.$container.height();
                if (imageHeight > containerHeight) {
                    margin = -(imageHeight - containerHeight) / 2;
                    base.$image.css({marginTop: margin});

                    if (base.$image.height() < containerHeight) {
                        oldWidth = base.$image.width();
                        base.$image.css({height: containerHeight});
                        base.$image.css({width: base.$image.height() * (oldWidth / imageHeight)});
                        margin = -(base.$image.width() - base.$container.width()) / 2;
                        base.$image.css({marginLeft: margin});
                    }
                }

                if (imageHeight < containerHeight) {
                    oldWidth = base.$image.width();
                    base.$image.css({height: containerHeight});
                    base.$image.css({width: base.$image.height() * (oldWidth / imageHeight)});
                    margin = -(base.$image.width() - base.$container.width()) / 2;
                    base.$image.css({marginLeft: margin});
                }
                base.$image.animate({opacity: 1});
            });

            //show image in lightbox
            base.$lightboxLink.on('click', function () {
                base.lightbox();
                base.secondCtrl = base.ctrl;
                var currImage = 0;
                var currDescription = 0;
                if (base.options.effect === 'fade') {
                    currImage = base.$image.attr('src');
                    currDescription = base.$barTextDescription.html();
                }

                base.$lightbox.append('<img src="' + currImage + '">' +
                    '<div class="nv-gallerious-lightbox-close">x</div>' +
                    '<div class="nv-gallerious-prev"><</div>' +
                    '<div class="nv-gallerious-next">></div>' +
                    '<div class="nv-gallerious-lightbox-description">' + currDescription + '</div>');
                var max_size = $(window).height() - 20;
                var max_size_width = $(window).width() - 20;
                base.$lightbox.find('img').load(function () {
                    var thisImage = $(this);
                    base.$lightbox.fadeIn(100);
                    base.$lightboxshadow.fadeIn(90);
                    if (thisImage.height() > max_size) {
                        thisImage.height(max_size);
                        if (thisImage.width() > max_size_width) {
                            thisImage.width(max_size_width);
                            thisImage.height('auto');
                        }
                    } else if (thisImage.width() > max_size_width) {
                        thisImage.width(max_size_width);
                        if (thisImage.height() > max_size) {
                            thisImage.height(max_size);
                        }
                    }
                    var fifty = '50%';
                    var mtop = -(base.$lightbox.height() + 20) / 2;
                    var mleft = -(base.$lightbox.width() + 20) / 2;
                    base.$lightbox.css({top: fifty, left: fifty, marginTop: mtop, marginLeft: mleft});
                });
            });

            //show/hide bar
            if (base.options.hideMenuBar === true || base.options.disableMenuBar === true) {
                base.$bar.css('display', 'none');
            }

            //prevent bar from hiding if thumbnails view is active

            if (base.options.disableMenuBar === false) {
                if (base.options.hideMenuBar === true) {
                    base.$el.mouseenter(function () {
                        base.$bar.slideDown(200);
                    }).mouseleave(function () {
                        if (base.$isOpen === 0) {
                            base.$bar.slideUp();
                        }
                    });
                }
            }

            //build thumbnails view
            var i;
            for (i = 0; i < base.$picLength; i += 1) {
                base.$layer.append('<div class="nv-gallerious-thumb"><img src="' + base.pics[i].path + '"></div>');
                base.$thumbPicture = base.$layer.find('.nv-gallerious-thumb img');
            }

            //append the correct icon to the slide show button
            if (base.options.autoplay === true) {
                base.playCtrl = 'fa-pause';
            } else {
                base.playCtrl = 'fa-play';
            }
            base.$barSlideshow.append('<i class="fa ' + base.playCtrl + '"></i>');

            //slideshow handler
            base.$barSlideshow.on('click', function () {
                if (base.autoPlay === 0) {
                    base.autoPlay = 1;
                    $(this).children('i').toggleClass('fa-play fa-pause');
                    base.intervalId = setInterval(function () {
                        base.$navRight.trigger('click');
                    }, base.options.interval);
                } else {
                    base.autoPlay = 0;
                    $(this).children('i').toggleClass('fa-play fa-pause');
                    clearInterval(base.intervalId);
                }
            });

            //animate image description on hover if text is longer than container

            base.$barText.mouseenter(function () {
                clearInterval(base.scrollInterval);
                var margin = 1;
                var scrollText = function () {
                    margin -= 1;
                    base.$barTextDescription.css('margin-left', margin);
                    var diff = base.$barTextDescription.width() - base.$barText.width();
                    if (margin > -diff) {
                        base.scrollInterval = setTimeout(scrollText, 10);
                    }
                };
                scrollText();
            }).mouseleave(function () {
                clearInterval(base.scrollInterval);
                base.$barTextDescription.css('margin-left', 0);
            });

            $(window).resize(function () {
                base.resize();
            });

            base.css();
        };

        base.css = function () {

            //container style
            base.$container.css({height: base.$container.width() * base.options.height, overflow: 'hidden'});
            base.$container.css(base.options.containerCss);

            //bar style
            base.$bar.css({background: base.options.containerCss.background});
            base.$main.css({background: base.options.mainCss.background});
            base.$bar.css(base.options.barCss);
            base.$barRight.css({background: base.options.containerCss.background});
            base.$barRight.css({background: base.options.barCss.background});

            base.clicks();
        };

        base.clicks = function () {

            //right nav handler
            base.$navRight.on('click', function () {
                if (base.ctrl === base.$picLength - 1) {
                    base.ctrl = 0;
                } else {
                    base.ctrl = base.ctrl + 1;
                }
                if (base.options.effect === 'fade') {
                    base.$image.fadeOut(base.options.fadeDuration, function () {
                        base.$image.css({height: '', width: '', marginTop: '', marginLeft: ''});
                        base.$image.css({opacity: 0});
                        base.$image.attr('src', base.pics[base.ctrl].path);
                        base.$image.attr('alt', base.pics[base.ctrl].description);
                        base.$image.show();
                        if (base.pics[base.ctrl].description !== '' || base.pics[base.ctrl].description !== undefined) {
                            base.$barTextDescription.html(base.pics[base.ctrl].description);
                        } else {
                            base.$barTextDescription.html('');
                        }
                        base.$current.html(base.ctrl + 1);
                    });
                }
            });

            //left nav handler
            base.$navLeft.on('click', function () {
                if (base.ctrl === 0) {
                    base.ctrl = base.$picLength - 1;
                } else {
                    base.ctrl = base.ctrl - 1;
                }
                if (base.options.effect === 'fade') {
                    base.$image.fadeOut(base.options.fadeDuration, function () {
                        base.$image.css({height: '', width: '', marginTop: '', marginLeft: ''});
                        base.$image.css({opacity: 0});
                        base.$image.attr('src', base.pics[base.ctrl].path);
                        base.$image.attr('alt', base.pics[base.ctrl].description);
                        base.$image.show();
                        if (base.pics[base.ctrl].description !== '' || base.pics[base.ctrl].description !== undefined) {
                            base.$barTextDescription.html(base.pics[base.ctrl].description);
                        } else {
                            base.$barTextDescription.html('');
                        }
                        base.$current.html(base.ctrl + 1);
                    });
                }
            });

            //thumbnails link click
            base.$thumbnailsLink.on('click', function () {
                if (base.$isOpen === 0) {
                    base.$isOpen = 1;
                    base.$layer.slideDown();
                } else {
                    base.$layer.slideUp();
                    base.$isOpen = 0;
                }
            });

            //thumbnails view handler
            var i;
            base.$thumbPicture.on('click', function () {
                base.$isOpen = 0;
                var thisPic = $(this),
                    x = 0;

                for (i = 0; i < base.$picLength; i += 1) {
                    if (thisPic.attr('src') === base.pics[i].path) { x = i; }
                    base.ctrl = x;
                }

                if (base.$image.attr('src') !== base.pics[base.ctrl].path) {
                    if (base.options.effect === 'fade') {
                        base.$image.fadeOut(base.options.fadeDuration, function () {
                            base.$image.css({height: '', width: '', marginTop: '', marginLeft: ''});
                            base.$layer.slideToggle(200);
                            base.$image.css({opacity: 0});
                            base.$image.attr('src', base.pics[base.ctrl].path);
                            base.$image.show();
                            if (base.pics[base.ctrl].description !== '' || base.pics[base.ctrl].description !== undefined) {
                                base.$barTextDescription.html(base.pics[base.ctrl].description);
                            } else {
                                base.$barTextDescription.html('');
                            }

                            base.$current.html(base.ctrl + 1);
                        });
                    }
                } else {
                    base.$layer.slideToggle(200);
                }
            });
        };

        base.resize = function () {
            var margin,
                fluidWidth = base.$container.width(),
                containerHeight = base.$container.height();

            base.$image.width(fluidWidth).height('auto');
            var imageHeight = base.$image.height();
            if (imageHeight > containerHeight) {
                margin = (containerHeight - imageHeight) / 2;
                base.$image.css({marginTop: margin});
            }

            if (base.$image.height() < containerHeight) {
                var oldWidth = base.$image.width();
                base.$image.css({height: containerHeight});
                base.$image.css({width: base.$image.height() * (oldWidth / imageHeight)});
                margin = -(base.$image.width() - base.$container.width()) / 2;
                base.$image.css({marginLeft: margin});
            }
            base.$container.height(fluidWidth * base.options.height);

        };

        base.lightbox = function () {
            //lightbox: ESC closes the lightbox
            $(document).keyup(function (e) {
                if (base.$lightbox.css('display') === 'block') {
                    if (e.keyCode === 27) {
                        base.$lightbox.fadeOut(120, function () {
                            base.$lightbox.html('');
                            base.$lightbox.removeAttr('style');
                        });
                        base.$lightboxshadow.fadeOut(140);
                    }
                }
            });

            //lightbox: click on shadow closes the lightbox
            base.$lightboxshadow.on('click', function () {
                base.$lightbox.fadeOut(120, function () {
                    base.$lightbox.html('');
                    base.$lightbox.removeAttr('style');
                });
                base.$lightboxshadow.fadeOut(140);
            });

            //lightbox: close button
            base.$lightbox.on('click', '.nv-gallerious-lightbox-close', function () {
                base.$lightbox.fadeOut(120, function () {
                    base.$lightbox.html('');
                    base.$lightbox.removeAttr('style');
                });
                base.$lightboxshadow.fadeOut(140);
            });

            //lightbox: show next picture
            base.$lightbox.on('click', '.nv-gallerious-next', function () {
                if (base.secondCtrl ===  base.$picLength - 1) {
                    base.secondCtrl = 0;
                } else {
                    base.secondCtrl = base.secondCtrl + 1;
                }
                base.$lightbox.find('img').hide(0, function () {
                    base.$lightbox.removeAttr('style');
                    $(this).removeAttr('style');
                    $(this).attr('src', base.pics[base.secondCtrl].path);
                    base.$lightbox.find('.nv-gallerious-lightbox-description').html(base.pics[base.secondCtrl].description);
                }).show();
            });

            //lightbox: show previous picture
            base.$lightbox.on('click', '.nv-gallerious-prev', function () {
                if (base.secondCtrl === 0) {
                    base.secondCtrl = base.pics.length - 1;
                } else {
                    base.secondCtrl = base.secondCtrl - 1;
                }
                base.$lightbox.find('img').hide(0, function () {
                    //lightbox.removeAttr('style');
                    //$(this).removeAttr('style');

                    $(this).attr('src', base.pics[base.secondCtrl].path);
                    base.$lightbox.find('.nv-gallerious-lightbox-description').html(base.pics[base.secondCtrl].description);
                }).show();
            });

            base.$image.on('click', function () {
                base.$lightboxLink.trigger('click');

            });
        };


        //call init, get everything rolling
        base.init();
    };

    $.fn.nvgallery = function (pics, options) {
        var $this = $(this);

        return $this.each(function () {
            var obj = new $.nvgallery($this, pics, options);
            return obj;
        });
    };

    $.fn.nvgallery.defaults = {
        height: 0.5625,
        leftArrowCss: {
            borderRadius: '0 10% 10% 0',
            left: '0px',
            height: '40px',
            width: '40px',
            lineHeight: '40px'
        },
        rightArrowCss: {
            borderRadius: '10% 0% 0% 10%',
            right: '0px',
            height: '40px',
            width: '40px',
            lineHeight: '40px'
        },
        containerCss: {
            background: '#111',
            color: '#fff',
            fontWeight: 100
        },
        mainCss: {
            background:'#111'
        },
        effect: 'fade',
        barCss: {},
        disableMenuBar: false,
        hideMenuBar: false,
        autoplay: false,
        interval: 8000,
        disableNav: false,
        hideNav: false,
        fadeDuration:30
    };


}(jQuery, window, document));