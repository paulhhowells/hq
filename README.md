# hq
Head Quarters.

## Installation

### gulp-ngdocs
gulp-ngdocs 0.2.13 has some issues. I have found that if its installed on its own it works fine, but when installed from this project’s package.json it may not install properly.  The workaround is to cd into hq/node_modules/gulp-ngdocs and run npm install, or perhaps to install it before running the package.json install.  This issue has been raised at: https://github.com/nikhilmodak/gulp-ngdocs/issues/98

## Mock API
Stubby is used to mock API end points.
```
If stubby is not installed:
  npm install -g stubby

Start the stubby server with:
  stubby -d /path/to/nameofstub.yaml

i.e.:
  cd hq/stub
  stubby -d api.yaml -s 8882 -w
```

## License

Released under the [MIT License](http://www.opensource.org/licenses/MIT)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
