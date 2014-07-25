/* ===================================================
 * nv/Gallery-www Documentation Page
 * http://github.com/strackovski/nvgallery-www
 *
 * Download page model
 * =================================================== */
define(['./baseModel'], function (BaseModel) {
    'use strict';

    BaseModel.prototype.getVersionString = function () {
        return 'Version ' + this.version;
    };

    var model1 = new BaseModel('Download', 'version number');
    return model1;
});