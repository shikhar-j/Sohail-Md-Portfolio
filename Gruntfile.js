module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-ssh-deploy');
  grunt.loadNpmTasks('grunt-exec');

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

    exec: {
      prep_dist: {
        cmd: 'cp -f index.html dist/ && cp -rf assets dist/ && cp -rf bower_components dist/'
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
    },

    environments: {
      options: {
        local_path: 'dist',
        zip_deploy: false
      },
      staging: {
        options: {
          host: 'shikharjaiswal.com',
          username: 'root',
          privateKey: require('fs').readFileSync('/Users/shikharjaiswal/.ssh/id_rsa'),
          deploy_path: '/',
          current_symlink: '/var/www/html/sohail',
          after_deploy: 'chmod 755 /var/www/html/sohail/assets/* && chmod 755 /var/www/html/sohail/assets/img/*'
        }
      },
      production: {
        options: {
          host: 'sohailvfx.com',
          username: 'root',
          privateKey: require('fs').readFileSync('/Users/shikharjaiswal/.ssh/id_rsa'),
          deploy_path: '/',
          current_symlink: '/var/www/html',
          after_deploy: 'chmod 755 /var/www/html/assets/* && chmod 755 /var/www/html/assets/img/*'
        }
      }
    }
  });

  grunt.registerTask('default', ['sass', 'uglify']);
  grunt.registerTask('deploy_staging', ['exec:prep_dist', 'ssh_deploy:staging']);
  grunt.registerTask('deploy_production', ['exec:prep_dist', 'ssh_deploy:production']);
}
