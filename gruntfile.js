// Gruntfile.js
// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {

    // =========================================================================
    // LOAD GRUNT PLUGINS ======================================================
    // =========================================================================
    // we can only load these if they are in our package.json
    // make sure you have run npm install so our app can find these
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // =========================================================================
    // RUNNING GRUNT COMMAND THESE TASKS TO BE PERFORMED =======================
    // =========================================================================

    grunt.registerTask('build', ['copy', 'useminPrepare', 'concat', 'uglify', 'cssmin', 'usemin']);
    // Watch task should be last in the array list
    grunt.registerTask('server', ['jshint', 'connect', 'watch']);

    // =========================================================================
    // CONFIGURE GRUNT =========================================================
    // =========================================================================
    grunt.initConfig({
        // get the configuration info from package.json ------------------------
        // this way we can use things like name and version (pkg.name)
        pkg: grunt.file.readJSON('package.json'),
        source: 'app',
        dist : 'client-build',

        // all of our configuration will go here

        // configure jshint to validate js files -------------------------------
        jshint: {
            options: {
                reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
            },

            // when this task is run, lint the Gruntfile and all js files in src
            files: [
                'gruntfile.js',
                '<%= source %>/scripts/**/*.js'
                // '!<%= source %>/lib/**/*.js' // ignores these folders and files
            ]
        },

        // configure uglify to minify js files ---------------------------------
        uglify: {
            options: {
                banner: '/* <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                    '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
                    '* <%= pkg.author %>\n' +
                    '*/\n'
            }
        },

        // configure cssmin to minify css files --------------------------------
        cssmin: {
            options: {
                banner: '/* <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                    '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
                    '* <%= pkg.author %>\n' +
                    '*/\n'
            }
        },

        // to copy and paste the folders and files into build without any changes
        copy: {
            //TODO : copy vendor files
            copy_vendor_js: {
                files: [{
                  expand: true,
                  cwd: '<%= source %>/lib/',
                  src: ['angular*.js.map', 'jquery*.js', 'ui*.js', 'kendo*.js'],
                  dest: '<%= dist %>/lib/'
                }]
            },
            copy_index_template: {
                src: '<%= source %>/index.html',
                dest: '<%= dist %>/index.html'
            },
            copy_all_templates: {
                files: [{
                  expand: true,
                  cwd: '<%= source %>/views/',
                  src: '**/*.html',
                  dest: '<%= dist %>/views/'
                }]
            },
            copy_assest: {
                files: [{
                  expand: true,
                  cwd: '<%= source %>/assest/',
                  src: '**/*',
                  dest: '<%= dist %>/assest/'
                }]
            },
            copy_vendor_css: {
                files: [{
                  expand: true,
                  cwd: '<%= source %>/styles/vendors/',
                  src: '**/*',
                  dest: '<%= dist %>/styles/vendors/'
                }]
            },
            copy_mockData: {
                files: [{
                  expand: true,
                  cwd: '<%= source %>/data/',
                  src: '**/*',
                  dest: '<%= dist %>/data/'
                }]
            }
        },

        // used to locate
        useminPrepare: {
            html: '<%= source%>/index.html',
            options: {
                dest: '<%= dist%>'
            }
        },

        // replace index.html file
        // used to create new index.html(remove build comments from original index.html)
        usemin: {
            html: ['<%= dist%>/index.html']
        },

        // configure watch to auto update --------------------------------------
        watch: {

            // if wanted to watch the changes in gruntfile
            // grunt: {
            //     files: ['gruntfile.js']
            // },

            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= source %>/styles/stylesheet.css',
                    '<%= source %>/index.html',
                    '<%= source %>/views/**/*.html',
                    '<%= source %>/scripts/**/*.js'
                ]
            }
        },

        // to open the app in web server
        connect: {
            options: {
                port: 9003,
                hostname: 'localhost',
                open: 'http://localhost:9003',
                base: '<%= source%>',
                livereload: 35730
            },
            livereload: {
                options: {
                    open: 'http://localhost:9003', // target url to open
                    base: '<%= source %>'
                }
            }
        }
    });
};
