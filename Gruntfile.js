module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'css/style.css': 'css/sass/style.scss'
        }
      }
    },

    watch: {
      sass: {
        files: 'css/sass/style.scss',
        tasks: 'sass'
      }
    }
  });

  grunt.registerTask('default', ['sass']);
}
