//The build will inline common dependencies into this file.

requirejs.config({
  baseUrl: './js',
  paths: {
    'jquery':                   'vendor/jquery',
    'bootstrap':                'vendor/bootstrap',
    'nvgallery':                'vendor/nvgallery',
    'main':                     'vendor/main'
  },
  shim: {
    'bootstrap':                ['jquery'],
    'nvgallery':                ['jquery'],
    'main':                     ['nvgallery']
  }
});
