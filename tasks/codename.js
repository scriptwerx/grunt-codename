/*
 * grunt-codename
 * https://github.com/scriptwerx/grunt-codename
 *
 * Copyright (c) 2014 scriptwerx
 * Licensed under the MIT license.
 * @version 0.1.3 "Bronze Marklar" (Pangolin)
 */

/* jslint todo: true, white: true */
/* global module, require, __dirname */

module.exports = function (grunt) {

	"use strict";

	var codeNames,
		patchNames;

	/**
	 * Breaks up the version string parameter in order to separate major, minor, patch and build.
	 * @param p_version
	 * @returns {Array}
	 */

	function getVersionData (p_version) {
		var versionData = p_version.split (".");
		return versionData.concat (versionData.pop ().split ("-"));
	}

	/**
	 * Returns the relevant codename based on the version string parameter.
	 * @param p_version
	 * @returns {string}
	 */

	function getCodeName (p_version) {
		var versionData = getVersionData (p_version),
			major = codeNames.hasOwnProperty (versionData[0]) ? codeNames[versionData[0]] : undefined;
		return major !== undefined && major.hasOwnProperty (versionData[1]) ? major[versionData[1]] : "";
	}

	/**
	 * Returns the relevant patch name based on the version string parameter.
	 * @param p_version
	 * @returns {string}
	 */

	function getPatchName (p_version) {
		var versionData = getVersionData (p_version);
		return patchNames.hasOwnProperty (versionData[2]) ? patchNames[versionData[2]] : "";
	}

	/**
	 * Register the grunt task "codename"
	 */

	grunt.registerMultiTask ("codename", 'Deliver application codename based on version.', function () {

		var path = require ("path"),
			data = grunt.file.readJSON (path.join (__dirname, "/codeNameData.json")),
			log,
			options = this.options ({
				tabSize: 4,
				hardTab: false,
				patch: false,
				data: undefined,
				patchNames: undefined,
				codenames: undefined
			});

		if (options.data !== undefined) {
			if (options.data.hasOwnProperty ("codeNames")) codeNames = options.data.codeNames;
			if (options.data.hasOwnProperty ("patchNames")) patchNames = options.data.patchNames;
		}
		else {
			codeNames = (options.codenames !== undefined) ? options.codenames : data.codeNames;
			patchNames = (options.patchNames !== undefined) ? options.patchNames : data.patchNames;
		}

		this.filesSrc.forEach (function (filepath) {

			grunt.verbose.writeln ("Injecting codename into: " + filepath + ".");

			try {
				var f = grunt.file.readJSON (filepath),
					writeFile = false,
					oldName = f.codename,
					newName = getCodeName (f.version),
					oldPatchName = f.patchName ? f.patchName : "",
					patchName = options.patch ? getPatchName (f.version) : "",
					patchUpdated = false,
					nameUpdated = false,
					filler = options.hardTab === true ? '\t' : parseInt(0 + options.tabSize);

				if (newName === "") {
					grunt.verbose.error ();
					grunt.verbose.error ("Codename not found.");
					grunt.fail.warn ("Codename not found for version: " + f.version);
					return;
				}

				if (oldName !== newName) {
					f.codename = newName;
					writeFile = nameUpdated = true;
				}

				if (oldPatchName !== patchName) {
					f.patchName = patchName;
					writeFile = patchUpdated = true;
				}

				if (!options.patch && f.hasOwnProperty ("patchName")) {
					writeFile = true;
					delete f.patchName;
				}

				if (writeFile) grunt.file.write (filepath, JSON.stringify (f, null, filler));

				if (nameUpdated) log = "Codename in \"" + filepath + "\" changed from \"" + oldName +"\" to \"" + newName.cyan + "\"";
				else log = "Codename in \"" + filepath + "\" correct as \"" + f.codename.green + "\"";

				if (patchUpdated) {
					if (options.patch) log = log + ", patchName changed from \"" + oldPatchName + "\" to \"" + patchName.cyan + "\".";
					else log = log + ", patchName removed.";
				}
				else if (options.patch) log = log + ", patchName correct as \"" + f.patchName.green + "\".";

				grunt.log.writeln (log);
			}
			catch (e) {
				grunt.verbose.error ();
				grunt.verbose.error (e);
				grunt.fail.warn ("Codename operation failed.");
			}
		});
	});
};
