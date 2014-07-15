module.exports = function(grunt) {
	var port = grunt.option('port') || 8000;

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),        
        connect: {
			server: {
				options: {
					port: port,
					base: '.'
				}
			}
		},
	    watch: {
			main: {
				files: [ 'components/**/*.html', 'components/**/*.css', 'components/**/*.js', '*.html', '*.css' ],
                options: {
                    livereload: true,
                },
			}
		}
    });
	
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-contrib-connect' );

	grunt.registerTask( 'serve', [ 'connect', 'watch' ] );
};
