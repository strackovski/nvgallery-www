/* ===================================================
 * nv/Gallery-www Documentation Page
 * http://github.com/strackovski/nvgallery-www
 *
 * Documentation page
 * =================================================== */
define([
    'jquery',
    'app/models/documentationModel',
    'bootstrap',
    'nvslider',
    'main'
],

    function ($, model) {
        'use strict';

        $(function () {
            $('h1.header-title').html(model.getTitle());
        });
    });