/* ===================================================
 * nv/Gallery JavaScript Library
 * http://github.com/strackovski/nvgallery
 * http://www.nv3.org/gallery
 * ===================================================
 * Copyright 2014 Vladimir Stračkovski <vlado@nv3.org>
 *
 * Licensed under the MIT License;
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://choosealicense.com/licenses/mit/
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

/*global $:false, jQuery:false */
/*global console:false */
/*jshint unused:false*/

;(function ($, window, document, undefined) {
    'use strict';

    $.nvgallery = function (el, pics, options) {
        var base = this;
        base.el = el;
        base.$el = $(el);
        base.pics = pics;

        // Init - gets called first
        base.init = function () {
            // Create control values
            base.ctrl = 0;
            base.secondCtrl = 0;
            base.autoPlay = 0;
            base.intervalId = 0;
            base.$picLength = base.pics.length;
            base.$isOpen = 0;
            base.scrollInterval = 0;

            // Extend default options with what user provided
            base.options = $.extend({}, $.fn.nvgallery.defaults, options);

            /*
                Make basic DOM elements and cache them for later
             */

            // Lightbox, Lightbox shadow
            base.$el.append('<div class="nv-gallerious-lightbox-shadow">');
            base.$el.append('<div class="nv-gallerious-lightbox"></div>');
            base.$lightbox = base.$el.find('.nv-gallerious-lightbox');
            base.$lightboxshadow = base.$el.find('.nv-gallerious-lightbox-shadow');

            // Container
            base.$el.append('<div class="nv-gallerious-container"></div>');
            base.$container = base.$el.find('.nv-gallerious-container');

            // Main
            base.$container.append('<div class="nv-gallerious-main"></div>');
            base.$main = base.$container.find('.nv-gallerious-main');

            // Nav
            base.$main.append('<div class="nv-gallerious-nav"></div>');
            base.$nav = base.$main.find('.nv-gallerious-nav');

            // Bar (for title, controls)
            base.$container.append('<div class="nv-gallerious-bar"></div>');
            base.$bar = base.$container.find('.nv-gallerious-bar');

            // Thumbnails view
            base.$container.append('<div class="nv-gallerious-layer"></div>');
            base.$layer = base.$container.find('.nv-gallerious-layer');

            // Image - show first image in the array
            base.$main.append('<div class="nv-gallerious-image">' +
                '<img class="nv-gallerious-img" src="' + base.pics[base.ctrl].path + '" alt="' + base.pics[base.ctrl].description + '"></div>');
            base.$imageContainer = base.$main.find('.nv-gallerious-image');
            base.$image = base.$imageContainer.find('.nv-gallerious-img');

            base.components();
        };

        // Add components to gallery and fill them with provided values (from array of images)
        base.components = function () {
            // Set up Bar (counter, controls, description field)
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

            // Build Navigation
            base.$nav.append('<div class="nv-gallerious-nav-left"><</div>');
            base.$nav.append('<div class="nv-gallerious-nav-right">></div>');
            base.$navLeft = base.$nav.find('.nv-gallerious-nav-left');
            base.$navRight = base.$nav.find('.nv-gallerious-nav-right');
            base.$navLeft.css(base.options.leftArrowCss);
            base.$navRight.css(base.options.rightArrowCss);

            base.setup();
        };

        // Set up
        base.setup = function () {
            var margin, oldWidth;

            // On image load (every time an image gets loaded)
            base.$image.load(function () {
                base.$image.css({width: '100%'});
                var imageHeight = base.$image.height(),
                    containerHeight = base.$container.height();

                // Adjust image based on its dimensions
                // to take the full width/height of the container
                // Height is bigger
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

                // Width is bigger
                if (imageHeight < containerHeight) {
                    oldWidth = base.$image.width();
                    base.$image.css({height: containerHeight});
                    base.$image.css({width: base.$image.height() * (oldWidth / imageHeight)});
                    margin = -(base.$image.width() - base.$container.width()) / 2;
                    base.$image.css({marginLeft: margin});
                }
                // Animate fadeIn
                base.$image.animate({opacity: 1});
            });

            /*
                Lightbox handler
            */
            base.$lightboxLink.on('click', function () {

                // Call lightbox() - set shadow, bind controls...
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

                //Take the whole size of the window
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

            // Show/hide bar
            if (base.options.hideMenuBar === true || base.options.disableMenuBar === true) {
                base.$bar.css('display', 'none');
            }

            // Prevent bar from hiding if thumbnails view is active
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

            // Build thumbnails view
            var i;
            for (i = 0; i < base.$picLength; i += 1) {
                base.$layer.append('<div class="nv-gallerious-thumb"><img src="' + base.pics[i].path + '"></div>');
                base.$thumbPicture = base.$layer.find('.nv-gallerious-thumb img');
            }

            // Show the correct icon for the slideshow button (play/pause)
            if (base.options.autoplay === true) {
                base.playCtrl = 'fa-pause';
            } else {
                base.playCtrl = 'fa-play';
            }
            base.$barSlideshow.append('<i class="fa ' + base.playCtrl + '"></i>');

            // Slideshow handler
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

            // Animate image description on hover if text is longer than container
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

            // Call resize() on window resize
            $(window).resize(function () {
                base.resize();
            });

            base.css();
        };

        base.css = function () {
            // Container style
            base.$container.css({height: base.$container.width() * base.options.height, overflow: 'hidden'});
            base.$container.css(base.options.containerCss);

            // Bar style
            base.$bar.css({background: base.options.containerCss.background});
            base.$main.css({background: base.options.mainCss.background});
            base.$bar.css(base.options.barCss);
            base.$barRight.css({background: base.options.containerCss.background});
            base.$barRight.css({background: base.options.barCss.background});

            base.clicks();
        };

        base.clicks = function () {
            // Right nav handler
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

            // Left nav handler
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

            // Thumbnails handler
            base.$thumbnailsLink.on('click', function () {
                if (base.$isOpen === 0) {
                    base.$isOpen = 1;
                    base.$layer.slideDown();
                } else {
                    base.$layer.slideUp();
                    base.$isOpen = 0;
                }
            });

            // Thumbnails view handler (selection of image to show)
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

        // Resize - fluid effect
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

        // Lightbox
        base.lightbox = function () {
            // ESC closes the lightbox
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

            // Click on shadow closes the lightbox
            base.$lightboxshadow.on('click', function () {
                base.$lightbox.fadeOut(120, function () {
                    base.$lightbox.html('');
                    base.$lightbox.removeAttr('style');
                });
                base.$lightboxshadow.fadeOut(140);
            });

            // Close button
            base.$lightbox.on('click', '.nv-gallerious-lightbox-close', function () {
                base.$lightbox.fadeOut(120, function () {
                    // Clear contents
                    base.$lightbox.html('');
                    base.$lightbox.removeAttr('style');
                });
                base.$lightboxshadow.fadeOut(140);
            });

            // Show next picture
            base.$lightbox.on('click', '.nv-gallerious-next', function () {
                // If the last image in array is shown, set pointer to the first image
                if (base.secondCtrl ===  base.$picLength - 1) {
                    base.secondCtrl = 0;
                } else { // Else, increment pointer
                    base.secondCtrl = base.secondCtrl + 1;
                }
                base.$lightbox.find('img').hide(0, function () {
                    base.$lightbox.removeAttr('style');
                    $(this).removeAttr('style');
                    $(this).attr('src', base.pics[base.secondCtrl].path);
                    base.$lightbox.find('.nv-gallerious-lightbox-description').html(base.pics[base.secondCtrl].description);
                }).show();
            });

            // Show previous picture
            base.$lightbox.on('click', '.nv-gallerious-prev', function () {
                // If the first image in array is shown, set pointer to the last image
                if (base.secondCtrl === 0) {
                    base.secondCtrl = base.pics.length - 1;
                } else { // Else, decrement pointer
                    base.secondCtrl = base.secondCtrl - 1;
                }
                base.$lightbox.find('img').hide(0, function () {
                    //lightbox.removeAttr('style');
                    //$(this).removeAttr('style');

                    $(this).attr('src', base.pics[base.secondCtrl].path);
                    base.$lightbox.find('.nv-gallerious-lightbox-description').html(base.pics[base.secondCtrl].description);
                }).show();
            });

            // Simulate Lightbox button click on image click
            base.$image.on('click', function () {
                base.$lightboxLink.trigger('click');

            });
        };

        // Call init, get everything rolling
        base.init();
    };

    $.fn.nvgallery = function (pics, options) {
        var $this = $(this);

        return $this.each(function () {
            var obj = new $.nvgallery($this, pics, options);
            return obj;
        });
    };

    // Defaults
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