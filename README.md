Project:	grunt-codename

Author:		[scriptwerx](mailto:enquiries@scriptwerx.co.uk)

Version:	0.0.4

&nbsp;
___


# [grunt-codename](id:mainTitle)

Utility to include a codename for your application based on version.

This works great alongside version bump utility: [grunt-bumpx][] for keeping your version numbers and names up-to-date with each build.

## Getting started

This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt][grunt] before, be sure to check out the [Getting Started][getting-started] guide, as it explains how to create a [Gruntfile][] as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-codename --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```javascript
grunt.loadNpmTasks('grunt-codename');
```

**N.B.**

The project follows the [SemVer][] guidelines for version numbers but only supports single-digit for major, minor and patch.

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

**codename** allows to set the codename and patchName based on the version number of the configuration files (package.json, manifest.json, etc.) in your project. Only JSON files are supported, and each file **must** have a `version` field compliant to [SemVer][] guidelines but currently only single-digit for major, minor and patch.

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
    bump: {
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

The project follows the [SemVer][] guidelines for version numbers but currently only supports single-digit for major, minor and patch.

To contribute:

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Add unit tests for any new or changed functionality. Lint and test your code using [Grunt][grunt].

## Changelog

Changes, bug fixes and enhancements made to grunt-codename.

### grunt-codename v0.0.4

* [ENHANCEMENT] Included this *README.md*.
* [ENHANCEMENT] Updated documentation.

### grunt-codename v0.0.3

* [ENHANCEMENT] Moved codenames and patchNames to external JSON file.
* [FEATURE] Added options to allow for better configuration.

### grunt-codename v0.0.2

**Do not use**

* [BUGFIX] Fixed issue with codename.

### grunt-codename v0.0.1

**Do not use**

* Initial commit.

## License
See the [LICENSE][] distributed with the project.


&nbsp;
___

[grunt]: http://gruntjs.com/
[Getting Started]: http://gruntjs.com/getting-started
[grunt-bumpx]: https://github.com/Ragnarokkr/grunt-bumpx/
[SemVer]: http://semver.org/
[LICENSE]: LICENSE-MIT



