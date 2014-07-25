/* ===================================================
 * nv/Gallery-www Common
 * http://github.com/strackovski/nvgallery-www
 *
 * This file maps project dependencies in 'name':'path'
 * format from baseUrl.
 *
 * The build will inline common dependencies
 * into this file.
 * =================================================== */
requirejs.config({
    baseUrl: './js',
    paths: {
        'jquery':       'vendor/jquery',
        'bootstrap':    'vendor/bootstrap',
        'nvgallery':    'vendor/jquery.nvgallery',
        'main':         'vendor/main'
    },
    shim: {
        'bootstrap':    ['jquery'],
        'nvgallery':    ['jquery'],
        'main':         ['nvgallery']
    }
});
