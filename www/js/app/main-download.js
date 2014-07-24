define([
  'jquery',
  'app/models/downloadModel',
  'bootstrap',
  'nvgallery',
  'main'
],

function ($, model) {
    'use strict';

    $(function() {
        $('h1.header-title').html(model.getTitle());
        $('p.header-feature').html(model.getSubtitle());
        $('div.introduction').html(model.getContentData());
    });
});