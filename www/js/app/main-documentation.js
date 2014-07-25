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
            var DOMDoc = $(document);
            DOMDoc.find('title').text(model.getTitle() + ' - ' + DOMDoc.find('title').text());
            DOMDoc.find('meta[name="keywords"]').attr('content', model.getMetadata().keywords);
            DOMDoc.find('meta[name="description"]').attr('content', model.getMetadata().description);
            DOMDoc.find('meta[name="author"]').attr('content', model.getAuthor().name);

            $('h1.header-title').html(model.getTitle());
            $('a.author-email').attr('href', 'mailto:' + model.getAuthor().email);
            $('a.author-page').attr('href', model.getAuthor().www);
            $('a.project-repo').attr('href', model.getProjectPage());
        });
    });