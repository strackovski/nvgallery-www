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
            var DOMDoc = $(document);
            DOMDoc.find('title').text('Home - ' + model.getTitle());
            DOMDoc.find('meta[name="keywords"]').attr('content', model.getMetadata().keywords);
            DOMDoc.find('meta[name="description"]').attr('content', model.getMetadata().description);
            DOMDoc.find('meta[name="author"]').attr('content', model.getAuthor().name);

            $('h1.header-title').html(model.getTitle());
            $('p.header-feature').html(model.getSubtitle());
            $('a.author-email').attr('href', 'mailto:' + model.getAuthor().email);
            $('a.author-page').attr('href', model.getAuthor().www);
            $('a.project-repo').attr('href', model.getProjectPage());
        });
    });