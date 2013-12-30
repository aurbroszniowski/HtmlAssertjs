module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        casperjs: {
            options: {
                async: {
                    parallel: false
                }
            },
            files: ['test/**/*.js']
        }
    });

    grunt.loadNpmTasks('grunt-casperjs');

    grunt.registerTask('test', ['casperjs'])
    grunt.registerTask('default', ['test'])
};