/* ===================================================
 * nv/Gallery-www Home Page
 * http://github.com/strackovski/nvgallery-www
 *
 * Index page
 * =================================================== */
define([
    'jquery',
    'app/models/indexModel',
    'bootstrap',
    'nvslider',
    'main'
],

    function ($, model) {
        'use strict';

        $(function () {
            $('h1.header-title').html(model.getTitle());
            $('p.header-feature').html(model.getSubtitle());
            $('div.introduction').html(model.getContentData());
        });
    });