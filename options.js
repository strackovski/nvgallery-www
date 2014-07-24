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

    // Now set up a build layer for each main layer, but exclude
    // the common one. If you're excluding a module, the excludee
    // must appear before the excluder in this file. Otherwise it will
    // get confused.
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