module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'assets/css/style.css': 'src/sass/style.scss'
        }
      }
    },

    uglify: {
      my_target: {
        files: {
          'assets/js/main.js': [
            'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.min.js',
            'src/js/core.js'
          ]
        }
      }
    },

    watch: {
      sass: {
        files: 'src/sass/*.scss',
        tasks: 'sass'
      },
      uglify: {
        files: 'src/js/*.js',
        tasks: 'uglify'
      }
    }
  });

  grunt.registerTask('default', ['sass', 'uglify']);
}
