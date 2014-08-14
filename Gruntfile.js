module.exports = function(grunt) {
	var port = grunt.option('port') || 8000;
    if (process.env.DEV) {
        var base = "build/local/";
    }
    else {
        var base = "build/remote/";
    }

    console.log("Base build folder: " + base);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),        
        connect: {
			server: {
				options: {
					port: port,
					base: base
                }
			}
		},
	    watch: {
			main: {
				files: ['elements/**/*.html',
                        'elements/**/*.css',
                        'elements/**/*.js',
                        'components/**/*.html',
                        'components/**/*.css',
                        'components/**/*.js',
                        '*.html',
                        '*.css',
                        'Gruntfile.*'],
                tasks: ['vulcanize', 'copy'],                                                                                                                                                      
                options: {
                    atBegin: true
                },
			},
            build: {
                files: ['build/**/*'],
                options: {
                    livereload: true
                }
            }
		},
        vulcanize: {
            remote: {
                options: {
                    inline: true,
                    csp: true
                },
                files: {
                    'build/remote/index.html': 'remote.html'
                }
            },
            base: {
                options: {
                    csp: true,
                    inline: true
                },
                files: {
                    'build/base/stations.html': 'base.html'
                }
            }
        },
        copy: {
            local: {
                files: [
                    {expand: true, src: ['elements/**/*'], dest: 'build/local/'},
                    {expand: true, src: ['data/*'], dest: 'build/local/elements/'},
                    {expand: true, src: ['components/**/*'], dest: 'build/local/'},
                    {src: ['local.html'], dest: 'build/local/index.html'}
                ]
            }
        }
    });
	
	grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-vulcanize');

	grunt.registerTask('default', ['connect', 'watch']);
};
