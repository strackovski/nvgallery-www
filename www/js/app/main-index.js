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
    'nvgallery',
    'main'
],

    function ($, model) {
        'use strict';

        $(function () {
            $('h1.header-title').html(model.getTitle());
            $('p.header-feature').html(model.getSubtitle());

            $('a.author-email').attr('href', 'mailto:' + model.getAuthor().email);
            $('a.author-page').attr('href', model.getAuthor().www);
            $('a.project-repo').attr('href', model.getProjectPage());
        });
    });