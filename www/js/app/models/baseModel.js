/* ===================================================
 * nv/Gallery-www Documentation Page
 * http://github.com/strackovski/nvgallery-www
 *
 * Base page model
 *
 * Defines common page properties:
 * - Author information
 * - Global metadata keywords and description
 * - Project version
 * - Project repository URL
 * - Page title and subtitle
 * =================================================== */
 define(function () {
    'use strict';

     /**
      * Base Page Model
      *
      * @param {String} title    Page title
      * @param {String} subtitle Page subtitle
      */
    function BaseModel(title, subtitle) {
        this.title = title;
        this.subtitle = subtitle;
        this.version = '1.0.0';
        this.projectPage = 'https://github.com/strackovski/nvgallery';

        this.author = {
            'name' : 'Vladimir Stračkovski',
            'email' : 'vlado@nv3.org',
            'www' : 'http://www.nv3.org'
        };

        this.metadata = {
            'keywords' : 'image gallery plugin, jquery gallery, plugin, jquery, slideshow',
            'description' : 'A simple to use, modern image gallery plugin for jQuery.'
        };
    }

    BaseModel.prototype.getTitle = function () {
        return this.title;
    };

    BaseModel.prototype.getSubtitle = function () {
        return this.subtitle;
    };

    BaseModel.prototype.getVersion = function () {
        return this.version;
    };

    BaseModel.prototype.getAuthor = function () {
        return this.author;
    };

    BaseModel.prototype.getProjectPage = function () {
        return this.projectPage;
    };

    BaseModel.prototype.getMetadata = function () {
        return this.metadata;
    };

    return BaseModel;
});
