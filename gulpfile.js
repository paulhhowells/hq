/*
A typical project directory structure would be similar to:
project/
- src/                        # all the source files
--- app/                      # Angular
--- sass/                     # Sass
- dist/                       # compiled files for distribution
--- app.js
--- app.min.js
--- css/                      # CSS
- doc/                        # generated documentation saved here
- node_modules/               # generated by npm install
- test/
--- karma.phantomjs.conf.js   # Karma configuration
--- report/
- .eslintrc.js                # ESLint configuration
- .gitignore
- gulpfile.js                 # Gulp tasks
- index.html
- package.json                # NPM definitions and dependencies
- README.md
*/

const
  gulp = require('gulp'),
  plug = require('gulp-load-plugins')(),
  del = require('del'),
  KarmaServer = require('karma').Server;

const PATH = {
  app : 'src/app',
  appJS : 'src/app/**/!(*spec|*test).js',
  appDoc : 'src/app/index.ngdoc',
  coverage : 'test/report/coverage',
  css : 'dist/css',
  distribution : 'dist',
  doc : 'doc',
  lib : 'lib/**/!(*spec|*test).js',
  sass : 'src/sass/app.scss',
  tmp : 'tmp'
};

/*
 * Run unit tests once and exit
 */
gulp.task('test', ['clean-coverage'], function (done) {
  //del([PATH.coverage]);

  var karma = new KarmaServer({
    configFile : __dirname + '/test/karma.phantomjs.conf.js',
    singleRun : true,
    reporters : ['progress', 'coverage'],
    // preprocessors: {
    //   '../app/**/!(*spec|*test).js' : ['coverage']
    // },
    coverageReporter : {
      // Specify a common output directory
      dir : 'report/coverage',
      reporters : [
        // Reporters not supporting the `file` property
        { type : 'html', subdir : 'report-html' },
        { type : 'lcov', subdir : 'report-lcov' },
        { type : 'json', subdir : 'report-json' }
      ],
      // Do not minify instrumenter output.
      instrumenterOptions: {
        istanbul : { noCompact : true }
      }
    }
  }, done)
  .on('error', function (err) {
    throw err;
  })
  .start();

  return karma;

  // Creating the reports after tests ran
  // .pipe(plug.istanbul.writeReports());
  // Enforce a coverage of at least 90%
  //  .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));

  /**
  coverage: {
    default: {
      options: {
        thresholds: {
          'statements': 80,
          'branches': 80,
          'lines': 80,
          'functions': 80
        },
        dir: 'coverage',
        root: '<%= project.report %>',
        report: true
      }
    }
  } */
});

gulp.task('clean-dist', function () {
  // New version of del returns a promise, return it instead
  // of processing a callback.
  return del([PATH.distribution]);
});

gulp.task('clean-coverage', function () {
  return del([PATH.coverage]);
});

gulp.task('clean-tmp', ['angular'], function () {
  return del([PATH.tmp]);
});

gulp.task('doc', ['readme'], function () {
  // Read about how to write ngdocs at:
  // https://github.com/angular/angular.js/wiki/Writing-AngularJS-Documentation
  // https://github.com/idanush/ngdocs
  // https://github.com/idanush/ngdocs/wiki/API-Docs-Syntax

  var options = {
    // scripts : [
    //   '../../node_modules/angular/angular.min.js',
    //   '../../node_modules/angular/angular.min.js.map',
    //   '../../node_modules/angular-route/angular-route.min.js',
    //   '../../node_modules/angular-route/angular-route.min.js.map',
    //   '../../node_modules/angular-animate/angular-animate.min.js',
    //   '../../node_modules/angular-animate/angular-animate.min.js.map'
    // ],
    html5Mode : false,
    title : 'D3 Angular',
    // titleLink : '/api',
    // startPage : '/api/app'
  };

  // return gulp.src([PATH.appJS])
    // .sections({
    //   api : {
    //     glob : ['app/**/*.js', '!app/**/*.spec.js'],
    //     api : true,
    //     title : 'API Documentation X'
    //   }
    // })
    // .pipe(plug.ngdocs.process(options))
    // .pipe(gulp.dest(PATH.doc));

  var sections = {
    api: {
      // appJS :  'src/app/**/!(*spec|*test).js'
      // appDoc : 'src/app/index.ngdoc'
      glob : [PATH.appJS, PATH.appDoc],
      // Set the name for the section in the documentation app.
      api : true,
      title : 'API Documentation X'
    },
    tutorial : {
      glob : [PATH.app + '/docs/**/*.ngdoc'],
      api : true,
      title : 'Tutorial X'
    },
    readme : {
      glob: ['README.md'],
      title : 'Read Me'
    }
  };

  return plug.ngdocs.sections(sections)
    .pipe(plug.ngdocs.process(options))
    .pipe(gulp.dest(PATH.doc))
    .on('end', function () {
      del([PATH.appDoc]);
    });
});

gulp.task('readme', function () {
  var header = '';
  header += '@ngdoc overview\n';
  header += '@name D3 Angular Name\n'; // @name index ?
  header += '@description\n';
  header += '\n';

  return gulp.src('README.md')
    .pipe(plug.insert.prepend(header))
    .pipe(plug.rename({
      basename : 'index',
      extname : '.ngdoc'
    }))
    .pipe(gulp.dest(PATH.app + '/'));
});

// Linting
gulp.task('lint', function () {
  var options = {
    configFile : '.eslintrc.js'
  };

  return gulp.src([PATH.appJS])
    .pipe(plug.eslint(options))
    .pipe(plug.eslint.format());
});

/*
 * Generate app.js and app.min.js
 * Combine Angular JavaScript and HTML partials.
 */
gulp.task('angular', ['html'], function () {
  var
    appModule = PATH.app + '/app.module.js',
    appFiles = PATH.app + '/**/!(*spec|*test|app.module).js',
    templates = PATH.tmp + '/templates.js';

  return gulp.src([appModule, appFiles, templates])

    // Remove IIFEs that wrap files, and any use of 'use strict' within them.
    // Should not remove IIFEs that do not wrap files.
    /* Breakdown of regex:
      \                           start regex
      ^                           start of file
      \(function\s*\(\)\s*\{      start of IIFE: (function () {
      \s*                         0 or more spaces

      (                           0 or more instances of 'use strict';
      ?:                          noncapture
      'use strict';
      )*

      ([\s\S]+)                   capture anything in the middle
      \}(?:\)\(|\(\))\);          tail of IIFE as })(); or }());
      \s*                         0 or more spaces
      $                           end of file
      /g                          end regex, with global modifier
    */
    .pipe(
      plug.replace(/^\(function\s*\(\)\s*\{\s*(?:'use strict';)*([\s\S]+)\}(?:\)\(|\(\))\);\s*$/g, '$1')
    )

    // Add /lib to stream after IIFEs have been removed
    // .pipe(gulp.src(PATH.lib))
    // should work when https://github.com/gulpjs/vinyl-fs/issues/25 is fixed.
    // Use gulp-add-src instead until vinyl-fs is fixed
    .pipe(plug.addSrc(PATH.lib))

    // Concatenate all the angular files into a single JavaScript file.
    .pipe(plug.concat('app.js'))

    // Wrap in a single IIFE.
    .pipe(plug.iife({
      useStrict : true,
      prependSemicolon : false,
      trimCode : false
    }))

    // Save an unminified version.
    .pipe(gulp.dest(PATH.distribution))

    // Turn off debugging in production minified version.  Note that gulp
    // should only do this after any Protractor tests have run.
    // Pass false into $compileProvider.debugInfoEnabled().
    // Todo: Look into using gulp-ng-constant to set the value.
    .pipe(
      plug.replace(
        /compileProvider.debugInfoEnabled\(true\)/i,
        'compileProvider.debugInfoEnabled(false)'
      )
    )

    // Minify and save as app.min.js
    .pipe(plug.uglify())
    //.pipe(plug.rename({ extname: '.min.js' }))
    .pipe(plug.rename({suffix: '.min'}))
    .pipe(gulp.dest(PATH.distribution));

    // .pipe(
    //   plug.notify({ message: 'Scripts task complete' })
    // );
});

/*
 * Convert HTML partials to JavaScript.
 */
gulp.task('html', ['lint'], function () {

  // see: https://github.com/kangax/html-minifier
  var htmlminOptions = {
    // Remove insignificant white space
    collapseWhitespace: true,

    // Do not collapse <tag disabled="disabled"> to <tag disabled>
    collapseBooleanAttributes: false,

    // Keep attributes without values, and thus protect SVG.
    empty: true,

    removeComments: true,
    removeCommentsFromCDATA: false,
    removeOptionalTags: false,
    removeAttributeQuotes: false
  };

  var templateCacheConfig = {
    file : 'templates.js',
    options : {
      module : 'app'
    }
  };

  return gulp.src(PATH.app + '/**/*.html')
    // With Angular mark-up htmlmin may be improved upon, so do some
    // extra processing first.

    // Replace 3 or more whitespaces.
    .pipe(plug.replace(/(\s){3,}/ig, " "))

    // Process each opening tag and singleton tag.
    .pipe(plug.replace(/<[^\/>]+\/??>/ig, processTags))

    // Convert single quote attributes to double quotes.
    .pipe(plug.htmlmin(htmlminOptions))

    // Store template files in the temporary directory.
    .pipe(gulp.dest(PATH.tmp + '/html'))

    // Convert HTML templates to JavaScript.
    .pipe(plug.angularTemplatecache(templateCacheConfig.file, templateCacheConfig.options))

    // Save templates.js in the temporary directory.
    .pipe(gulp.dest(PATH.tmp));

  function processTags (tag) {

    // Process tag attributes.
    tag = tag.replace(/(=")([^"]+?)(")/ig, processAttributes);

    return tag;
  }

  function processAttributes (match, p1, p2, p3) {

    // Remove space from around single pipes in attributes.
    p2 = p2.replace(/\s\|\s/ig, "|");

    // Remove space from around OR double pipes in attributes.
    p2 = p2.replace(/\s\|\|\s/ig, "||");

    // Remove space from around AND ampersands in attributes.
    p2 = p2.replace(/\s&&\s/ig, "&&");

    // Remove space from around !==, === and ==
    p2 = p2.replace(/\s!==\s/ig, "!==");
    p2 = p2.replace(/\s===\s/ig, "===");
    p2 = p2.replace(/\s==\s/ig, "==");

    p2 = p2.replace(/\s\?\s/ig, "?");
    p2 = p2.replace(/\s:\s/ig, ":");

    // Remove space from after a single quote and colon within attributes.
    p2 = p2.replace(/':\s+/ig, "':");

    return p1 + p2 + p3;
  }
});

gulp.task('open', function () {
  return gulp
    .src(__filename)
    .pipe(plug.open({
      uri: 'http://127.0.0.1:9999/'
      //app: 'google chrome'
    }))
    .pipe(plug.open({
      uri: 'http://127.0.0.1:9999/test/report/coverage/report-html/'
    }))
    .pipe(plug.open({
      uri: 'http://127.0.0.1:9999/doc/' //'#/api',
    }));
});

/*
 * Compile Sass into CSS, save expanded and minified versions.
 */
gulp.task('sass', sass);
gulp.task('scss', ['clean-dist'], sass);
function sass () {
  var
    sassOptions = {
      errLogToConsole: true,
      outputStyle: 'expanded'
    },
    cleanOptions = {
      // IE9+, specify 'ie8' for IE 8 compatibility mode.
      compatibility : ''
    };

  return gulp
    .src(PATH.sass)
    .pipe(
      plug.sass(sassOptions).on('error', plug.sass.logError)
    )
    .pipe(
      gulp.dest(PATH.css)
    )
    .pipe(
      plug.rename({suffix: '.min'})
    )
		.pipe(
      plug.cleanCss(cleanOptions)
    )
    .pipe(
      gulp.dest(PATH.css)
    );
}

/*
 * Create Style Guide Documentation from Sass.
 */
gulp.task('hologram', function() {
  var config = { logging : true };

  gulp
    .src('styleguide/hologram_config.yml')
    .pipe(plug.hologram(config));
});

gulp.task('build', ['clean-dist', 'html', 'angular', 'scss', 'clean-tmp']);

gulp.task('default', function () {
  gulp.start('clean-coverage', 'lint', 'test', 'doc', 'build', 'hologram');
});
