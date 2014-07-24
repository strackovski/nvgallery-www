/* ===================================================
 * nv/Gallery-www project options
 * http://github.com/strackovski/nvgallery-www
 * =================================================== */
module.exports = {
  appDir: 'www',
  baseUrl: 'js/',
  mainConfigFile: 'www/js/common.js',
  dir: 'www-release',
  modules: [
    // First set up the common build layer.
    {
      // Module names are relative to baseUrl
      name: 'common',
      // Common dependencies here (only top level)
      include: [
        'app/models/baseModel',
        'jquery',
        'bootstrap',
        'nvgallery'
      ]
    },

    // Build layers
    {
      name: 'app/main-home',
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