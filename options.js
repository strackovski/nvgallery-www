/* ===================================================
 * nv/Gallery-www project options
 * http://github.com/strackovski/nvgallery-www
 *
 * This file defines project options and dependent modules.
 * =================================================== */
module.exports = {
    appDir: 'www',
    baseUrl: 'js/',
    mainConfigFile: 'www/js/common.js',
    dir: 'www-release',
    modules: [
        {
            name: 'common',
            // Common dependencies (only top level)
            include: [
                'app/models/baseModel',
                'jquery',
                'bootstrap',
                'nvgallery'
            ]
        },
        {
            name: 'app/main-index',
            exclude: ['common']
        },

        {
            name: 'app/main-download',
            exclude: ['common']
        },

        {
            name: 'app/main-documentation',
            exclude: ['common']
        }
    ]
};