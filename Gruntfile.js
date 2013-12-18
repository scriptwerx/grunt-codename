/**
 * GruntFile.js
 * @author  Paul Massey
 */

module.exports = function (grunt)
{
	grunt.initConfig ({
		pkg: grunt.file.readJSON ("test.json"),
		bump: {
			build: {
				options: {
					part: "build"
				},
				src: ["test.json"]
			},
			patch: {
				options: {
					part: "patch"
				},
				src: ["test.json"]
			},
			minor: {
				options: {
					part: "minor"
				},
				src: ["test.json"]
			}
		},
		codename: {
			all: {
				options: {
					patch: true,
					data: grunt.file.readJSON ("codenames.json")
				},
				src: ["test.json"]
			}
		}
	});
	
	grunt.loadNpmTasks ("grunt-bumpx");
	grunt.loadNpmTasks ("grunt-codename");

	// Default - Check code, concat, uglify and bump the build version.
	grunt.registerTask ("default", ["bump:patch", "bump:build", "codename"]);
};
