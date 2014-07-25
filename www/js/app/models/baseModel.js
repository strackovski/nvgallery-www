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

    return BaseModel;
});
