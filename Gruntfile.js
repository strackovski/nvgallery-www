/*global module:false*/
/*jslint node: true */
'use strict';

var opt = require('./options');

module.exports = function (grunt) {
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
            combine: {
                files: {
                    'www-release/css/styles.min.css':
                        [
                            'www-release/css/bootstrap.css',
                            'www-release/css/font-awesome.css',
                            'www-release/css/jquery.nvgallery.css',
                            'www-release/css/gallery-www.css'
                        ]
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default', ['clean', 'requirejs', 'cssmin']);
};
