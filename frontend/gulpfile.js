var gulp = require('gulp'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  shell = require('gulp-shell'),
  traceur = require('gulp-traceur'),
  webserver = require('gulp-webserver');

// run init tasks
gulp.task('default', ['dependencies', 'js', 'html', 'css']);

// run development task
gulp.task('dev', ['testhtml', 'watch', 'serve']);

// serve the build dir
gulp.task('serve', function () {
  gulp.src('build')
    .pipe(webserver({
      open: true
    }));
});

// watch for changes and run the relevant task
gulp.task('watch', function () {
  gulp.watch('src/**/*.js', ['js']);
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/**/*.css', ['css']);
});

// move dependencies into build dir
gulp.task('dependencies', function () {
  return gulp.src([
      'node_modules/jquery/dist/jquery.js',
      'node_modules/angular/angular.js',
      'node_modules/angular-animate/angular-animate.js',
      'node_modules/angular-bootstrap/ui-bootstrap-tpls.js',
      'node_modules/angular-local-storage/dist/angular-local-storage.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/angular-resource/angular-resource.js',
      'node_modules/angular-route/angular-route.js',
      'node_modules/angular-sanitize/angular-sanitize.js',
      'node_modules/angular-touch/angular-touch.js',
      'node_modules/bootstrap/dist/js/bootstrap.min.js',
      'node_modules/q/q.js',
      'node_modules/angular-route-segment/build/angular-route-segment.js',
      'node_modules/gulp-traceur/node_modules/traceur/bin/traceur-runtime.js',
      'node_modules/systemjs/dist/system-csp-production.src.js',
      'node_modules/systemjs/dist/system.js',
      'node_modules/reflect-metadata/Reflect.js',
      'node_modules/angular2/bundles/angular2.js',
      'scriptasaurus/ukeGeeks.scriptasaurus.min.js'
    ])
    .pipe(gulp.dest('build/lib'));
});

// transpile & move js
gulp.task('js', function () {
  return gulp.src('src/**/*.js')
    .pipe(rename({
      extname: ''
    }))
    .pipe(traceur({
      modules: 'instantiate',
      moduleName: true,
      annotations: true,
      types: true,
      memberVariables: true
    }))
    .pipe(rename({
      extname: '.js'
    }))
    .pipe(gulp.dest('build'));
});

// move html
gulp.task('html', function () {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('build'))
});

// move test html
gulp.task('testhtml', function () {
  return gulp.src('test/**/*.html')
    .pipe(gulp.dest('build'))
});

// move css
gulp.task('css', function () {
  return gulp.src('src/**/*.css')
    .pipe(gulp.dest('build'))
});
