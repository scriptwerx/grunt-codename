/*
* GruntFile.js example.
*
* grunt-codename
* https://github.com/scriptwerx/grunt-codename
*
* Copyright (c) 2014 scriptwerx
* Licensed under the MIT license.
*/

/* jslint todo: true, white: true */
/* global module */

var testJSON = "test.json";

module.exports = function (grunt)
{
	"use strict";

	/**
	 * Ensures single-digit bump occurs
	 * @param part
	 * @returns {string}
	 */

	function autoBump (part) {

		if (part === "build") return ["bump:" + part];

		var pkg = grunt.file.readJSON (testJSON),
			versionData = pkg.version.split (".");

		if (part === "patch" && parseInt (versionData[2], 10) + 1 >= 10) part = "minor";
		if (part === "minor" && parseInt (versionData[1], 10) + 1 >= 10) part = "major";

		return part;
	}

	grunt.initConfig ({
		pkg: grunt.file.readJSON (testJSON),
		bump: {
			build: {
				options: {
					part: "build"
				},
				src: [testJSON]
			},
			patch: {
				options: {
					part: autoBump ("patch")
				},
				src: [testJSON]
			},
			minor: {
				options: {
					part: autoBump ("minor")
				},
				src: [testJSON]
			},
			major: {
				options: {
					part: "major"
				},
				src: [testJSON]
			}
		},
		codename: {
			all: {
				options: {
					patch: true,
					data: grunt.file.readJSON ("codenames.json")
				},
				src: [testJSON]
			}
		}
	});

	grunt.loadNpmTasks ("grunt-bumpx");
	grunt.loadNpmTasks ("grunt-codename");

	// Default - Check code, concat, uglify and bump the build version.
	grunt.registerTask ("default", ["bump:patch", "codename"]);
};
