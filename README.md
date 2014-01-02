# [grunt-codename](id:mainTitle)

Utility to include a codename for your application based on version (up-to v10.X.X-X).

This works great alongside version bump utility: [grunt-bumpx][] for keeping your version numbers and names up-to-date with each build.

Included codenames and patchNames created with the help of the excellent [codenamegenerator.com][] website.

## Getting started

This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt][] before, be sure to check out the [Getting Started][] guide, as it explains how to create a [Gruntfile][] as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-codename --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```javascript
grunt.loadNpmTasks('grunt-codename');
```

The project follows the [SemVer][] guidelines for version numbers; specifically following: `1.2.3-1` being `MAJOR.MINOR.PATCH-BUILD`.

**N.B. The supplied codenames and patchNames only include suport for single-digit numbers used for minor and patch of the *version* field (and major up to 10) - you must supply your own custom codenames and patchNames if you can't handle this restriction (but that's a lot of names)!**

## The "codename" task

### Overview
In your project's Gruntfile, add a section named `codename` to the data object passed into `grunt.initConfig()`.

```javascript
grunt.initConfig({
    codename: {
        options: {
            // Task-specific options go here.
        },
        src: [
            // Target-specific files go here.
        ]
	}
})
```

**codename** allows to set the codename and patchName based on the version number of the configuration files (package.json, manifest.json, etc.) in your project. Only JSON files are supported, and each file **must** have a `version` field compliant to [SemVer][] guidelines; specifically following: `1.2.3-1` being `MAJOR.MINOR.PATCH-BUILD`.

**Remember: The supplied codenames and patchNames only include suport for single-digit numbers used for minor and patch of the *version* field (and major up to 10) - you must supply your own custom codenames and patchNames if you can't handle this restriction (but that's a lot of names)!**

### Example JSON

**codename** is designed to update your *package.json*, *manifest.json* or any other JSON file with a *"version"* field (configured as noted above).

An example of a *manifest.json* file is below:

```json
{
	"name": "My Test Application",
	"version": "1.3.2-16",
	"codename": "",
	"patchName": "",
	"description": "A test application for me."
}
```

Once **codename** has been used (with patchNames enabled); the *manifest.json* file would be updated automatically as follows:

```json
{
	"name": "My Test Application",
	"version": "1.3.2-16",
	"codename": "Honiara Nimitz",
	"patchName": "Ithomiid",
	"description": "A test application for me."
}
```

### Options

options.* | Type | Default | Description
---|:---:|:---:|---
patch|`Boolean`|`false`|Generate a name for the *patch* version as well as the main codename.
data|`JSON`|`undefined`|Use custom JSON for the codenames (and patchNames as required).
codenames|`Object`|`undefined`|Use a custom object for codenames.
patchNames|`Object`|`undefined`|Use a custom object for patchNames.

#### Default Options
Running the task in this way, the `codename` field of each source file will be automatically changed to the correct codename for the build release.

```javascript
grunt.initConfig({
    codename: {
        src: ["package.json", "manifest.json"]
    }
})
```

#### Custom Options
Running the task in this way, the `codename` and `patchName` fields of each traget file will be changed to the correct codename and patchName for the next minor release based on the names contained within the user-supplied *codenames.json* file.

```javascript
grunt.initConfig({
    codename: {
        options: {
            patch: true,
            data: grunt.file.readJSON ("codenames.json")
    	},
    	src: ["package.json", "manifest.json"]
    }
})
```

## Contributing

Any contribution to improve the project and/or expand it is welcome.

If you're interested in contributing to this project, take care to maintain the existing coding style.

To contribute:

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Add unit tests for any new or changed functionality. Lint and test your code using [Grunt][grunt].

## Changelog

Changes, bug fixes and enhancements made to grunt-codename.

### grunt-codename v0.1.1

**"Bronze Marklar" (Saiga)**

* [BUGFIX] Fixed issue where patchName would be written even if not required.
* [FEATURE] If patchName is not required it is removed (if present) from the JSON file.
	* [ENHANCEMENT] Grunt log will correctly reflect this.
* [ENHANCEMENT] Updated comments within **codename.js**.
* [ENHANCEMENT] Minor code cleanup and year references updated to 2014.

### grunt-codename v0.1.0

**"Bronze Marklar"**

* [ENHANCEMENT] Included codenames up to v10.X.X-X.

### grunt-codename v0.0.9

**"Perseus Amber" (Zokor)**

* [BUGFIX] Fixed issue with incorrect version data.

### grunt-codename v0.0.8

**"Perseus Amber" (Balbul)**

* [BUGFIX] Fixed issue that displayed incorrect messages within the GruntJS log output.
* [BUGFIX] Removed incorrect code from the included GruntFile.js for demonstration purposes.

### grunt-codename v0.0.7

**"Perseus Amber" (Malbrouck)**

* [BUGFIX] Fixed issue that caused *patchName* to stop functioning correctly.

### grunt-codename v0.0.6

**"Perseus Amber" (Anoa)**

* [ENHANCEMENT] Updated this documentation a little to make the current version restrictions clear.
* [ENHANCEMENT] Updated the demo *GruntFile.js* (included) to demonstrate our own *autoBump* method which ensures that single-digit bump occurs when using the utility.
	* When using the configuration as per our demo *GruntFile.js* bumping the *patch* part of the version will automatically switch to the *minor* part of the version and in-turn the *major* part of the version. For example (always bumping *patch*):
		* Version `0.8.8-12` becomes `0.8.9-0` which in turn becomes `0.9.0-0`.
		* Version `0.9.8-12` becomes `0.9.9-0` which in turn becomes `1.0.0-0`.
		
For more information, please see the included [GruntFile.js](https://github.com/scriptwerx/grunt-codename/blob/master/Gruntfile.js).

### grunt-codename v0.0.5

**"Perseus Amber" (Uromastix)**

* [ENHANCEMENT] Included this *README.md*.
* [ENHANCEMENT] Updated documentation.


### grunt-codename v0.0.4

**"Perseus Amber" (Tayra)**

* [ENHANCEMENT] Included this *README.md*.
* [ENHANCEMENT] Updated documentation.

### grunt-codename v0.0.3

**"Perseus Amber" (Pangolin)**

* [ENHANCEMENT] Moved codenames and patchNames to external JSON file.
* [FEATURE] Added options to allow for better configuration.

### grunt-codename v0.0.2

**"Perseus Amber" (Ithomiid)**

* [BUGFIX] Fixed issue with codename.

### grunt-codename v0.0.1

**"Perseus Amber" (Saiga)**

* Initial commit.

## License
See the [LICENSE][] distributed with the project.


&nbsp;
___

[grunt]: http://gruntjs.com/
[GruntFile]: http://gruntjs.com/sample-gruntfile
[Getting Started]: http://gruntjs.com/getting-started
[grunt-bumpx]: https://github.com/Ragnarokkr/grunt-bumpx/
[SemVer]: http://semver.org/
[LICENSE]: https://github.com/scriptwerx/grunt-codename/blob/master/LICENSE-MIT
[codenamegenerator.com]: http://www.codenamegenerator.com



