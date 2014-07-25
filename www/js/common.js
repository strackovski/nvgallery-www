/* ===================================================
 * nv/Gallery-www Common
 * http://github.com/strackovski/nvgallery-www
 *
 * This file configures the options for requireJS.
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
        'main':         'gallery-www'
    },
    shim: {
        'bootstrap':    ['jquery'],
        'nvgallery':    ['jquery'],
        'main':         ['nvgallery']
    }
});
