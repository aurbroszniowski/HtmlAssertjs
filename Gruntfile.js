module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
        , jasmine: {
            src: "lib/**/*.js"
            , options: {
                specs: "src/**/*.js"
                , vendor: "test/**/*.js"
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jasmine')

    grunt.registerTask('test', ['jasmine'])
    grunt.registerTask('default', ['test'])
};