/**
 * Created by Dub4ek on 3/21/15.
 */
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/js/*.js',
                dest: 'src/build/<%= pkg.name %>.min.js'
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'src/css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'src/build/',
                    ext: '.min.css'
                }]
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        watch: {
            src: {
                files: ['src/js/*.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false
                }
            },
            css: {
                files: ['src/css/*.css'],
                tasks: ['cssmin'],
                options: {
                    spawn: false
                }
            }/*,
             markdown: {
             files: ['docs*//*.md'],
             tasks: ['readme','jsdoc'],
             options: {
             spawn: false,
             },
             }*/
        }, /*,
         concat: {
         options: {
         separator: ';',
         },
         dist: {
         src: ['src/intro.js', 'src/project.js', 'src/outro.js'],
         dest: 'dist/built.js',
         },
         }*/
    });


    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    // Default task(s).
    grunt.registerTask('default', ['watch']);

};