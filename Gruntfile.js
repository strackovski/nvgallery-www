/*global module:false*/
'use strict';

var opt = require('./options');

module.exports = function(grunt)
{
  grunt.initConfig({
    clean: {
      release: 'www-release'
    },
    requirejs: {
      compile: {
        options: opt
      }
    },
    cssmin: {
      compile: {
        files: {
          'www-release/css/style.css': 'www-release/css/style.css',
          'www-release/css/font-awesome.css': 'www-release/css/font-awesome.css',
          'www-release/css/bootstrap.css': 'www-release/css/bootstrap.css',
          'www-release/css/nvgallery.css': 'www-release/css/nvgallery.css'
        }
      }
    }
  });

  // Load tasks from NPM
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task.
  grunt.registerTask('default', ['clean', 'requirejs', 'cssmin']);
};
