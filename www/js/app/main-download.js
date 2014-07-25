/* ===================================================
 * nv/Gallery-www Download Page
 * http://github.com/strackovski/nvgallery-www
 *
 * Download page
 * =================================================== */
define([
    'jquery',
    'app/models/downloadModel',
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