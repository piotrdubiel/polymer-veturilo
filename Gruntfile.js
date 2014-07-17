module.exports = function(grunt) {
	var port = grunt.option('port') || 8000;

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),        
        connect: {
			server: {
				options: {
					port: port,
					base: 'build/'
				}
			}
		},
	    watch: {
			main: {
				files: ['elements/**/*.html', 'elements/**/*.css', 'elements/**/*.js', 'components/**/*.html', 'components/**/*.css', 'components/**/*.js', '*.html', '*.css'],
                tasks: ['vulcanize'],                                                                                                                                                      
                options: {
                    atBegin: true
                },
			},
            build: {
                files: ['build/*'],
                options: {
                    livereload: true
                }
            }
		},
        vulcanize: {
            default: {
                options: {
                    inline: true
                },
                files: {
                    'build/index.html': 'index.html'
                }
            },
            base: {
                options: {
                    csp: true,
                    inline: true,
                    strip: true
                },
                files: {
                    'build/stations.html': 'base.html'
                }
            }
        }
    });
	
    grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-vulcanize');

	grunt.registerTask('default', ['connect', 'watch']);
};
