var DEV_PROPERTIES = '.dev_properties.json';

module.exports = function(grunt) {
   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      compress: {
         main: {
            options: {
               archive: 'dist/<%= pkg.name %>.zip'
            },
            expand: true,
            cwd: 'src/',
            src: ['**/*']
         }
      },

      http_upload: {
         upload: {
            options: {
               url: 'http://<%= username %>:<%= password %>@<%= domain %>/rest-api/1/0/<%= siteName %>/Addon%20Repository/<%= addonName %>/webAppImport<% if (force) { %>?force=true<% } %>',
               onComplete: function(data) {
                  console.log('Response: ' + data);
               }
            },
            src: 'dist/<%= pkg.name %>.zip',
            dest: 'fileupload'
         }
      },

      prompt: {
         setupdev: {
            options: {
               questions: [
                  {
                     name: 'domain',
                     type: 'input',
                     message: 'Website domain (www.example.com)'
                  },
                  {
                     name: 'siteName',
                     type: 'input',
                     message: 'Site name'
                  },
                  {
                     name: 'addonName',
                     type: 'input',
                     message: 'Addon name'
                  },
                  {
                     name: 'username',
                     type: 'input',
                     message: 'Username'
                  },
                  {
                     name: 'password',
                     type: 'password',
                     message: 'Password'
                  }
               ],
               then: function(results, done) {
                  grunt.file.write('.dev_properties.json', JSON.stringify({
                     domain: results.domain,
                     siteName: results.siteName,
                     addonName: results.addonName,
                     username: results.username,
                     password: results.password
                  }));
               }
            }
         }
      }
   });

   grunt.loadNpmTasks('grunt-contrib-compress');
   grunt.loadNpmTasks('grunt-http-upload');
   grunt.loadNpmTasks('grunt-prompt');

   grunt.registerTask('setup', 'prompt:setupdev');
   grunt.registerTask('zip', 'compress');
   grunt.registerTask('deploy', function() {
      if (grunt.file.exists(DEV_PROPERTIES)) {
         grunt.config.merge(JSON.parse(grunt.file.read(DEV_PROPERTIES)));
         grunt.config.set('force', grunt.option('force-deploy'));
         grunt.task.run(['compress', 'http_upload:upload']);
      } else {
         grunt.log.write('Must run setup first');
      }
   });
};