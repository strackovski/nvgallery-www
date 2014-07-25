/* ===================================================
 * nv/Gallery-www Documentation Page
 * http://github.com/strackovski/nvgallery-www
 *
 * Base page model
 * =================================================== */
define(function () {
    'use strict';

    function BaseModel(title, subtitle) {
        this.title = title;
        this.subtitle = subtitle;
        this.version = '0.0.3';
        this.projectPage = 'https://github.com/strackovski/nvgallery';
        this.author = {'email' : 'vlado@nv3.org', 'www' : 'http://www.nv3.org'};
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

    return BaseModel;
});
