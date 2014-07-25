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
    'nvgallery',
    'main'
],

    function ($, model) {
        'use strict';

        $(function () {
            $('h1.header-title').html(model.getTitle());

            $('a.author-email').attr('href', 'mailto:' + model.getAuthor().email);
            $('a.author-page').attr('href', model.getAuthor().www);
            $('a.project-repo').attr('href', model.getProjectPage());
        });
    });