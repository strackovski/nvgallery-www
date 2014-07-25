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
    'nvgallery',
    'main'
],
    function ($, model) {
        'use strict';

        $(function () {
            $('h1.header-title').html(model.getTitle());
            $('p.header-feature').html(model.getSubtitle());
            $('p.version').html(model.getVersionString());
        });
    });