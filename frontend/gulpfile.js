var gulp = require('gulp'),
  concat = require('gulp-concat'),
  sass = require('gulp-sass'),
  rename = require('gulp-rename'),
  shell = require('gulp-shell'),
  traceur = require('gulp-traceur'),
  webserver = require('gulp-webserver');

// run init tasks
gulp.task('default', ['dependencies', 'js', 'html', 'sass', 'tab', 'fonts', 'css']);

// run development task
gulp.task('dev', ['testhtml', 'watch', 'serve']);

// serve the build dir
gulp.task('serve-prod', function () {
  gulp.src('build')
    .pipe(webserver({
      open: true,
      livereload: true,
      host: 'localhost',
      proxies: [{
        source: '/api',
        target: 'https://ukebook.immerdieses.de/api'
      }]
    }));
});

gulp.task('webserver', function() {
    return gulp.src('src')
        .pipe(webserver({
            livereload: true,
            port: 8500,
            host: 'localhost',        //rich from network
            //fallback: 'index.html', //for spa
            open:  "http://localhost:8500/wigeoweb",
            proxies: [
                {
                    source: '/wigeoweb-dev',
                    target: 'http://wigeowebhotd:11711/wigeoweb'
                },{
                    source: '/cache',
                    target: 'http://wigeowebhotd:11711/cache'
                },{
                    source: '/icons',
                    target: 'http://wigeowebhotd:11711/icons'
                },
                {
                    source: '/wigeoweb-claas',
                    target: 'http://192.168.123.77:10080/wigeoweb-claas'
                }
            ]
        }));
});

// watch for changes and run the relevant task
gulp.task('watch', function () {
  gulp.watch('src/**/*.js', ['js']);
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('styles/**/*.css', ['css']);
  gulp.watch('styles/**/*.scss', ['sass']);
  gulp.watch('src/**/*.tab', ['tab']);
});

// move dependencies into build dir
gulp.task('dependencies', function () {
  return gulp.src([
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/angular/angular.min.js',
      'node_modules/angular-animate/angular-animate.js',
      'node_modules/angular-bootstrap/ui-bootstrap-tpls.min.js',
      'node_modules/angular-local-storage/dist/angular-local-storage.min.js',
      'node_modules/angular-messages/angular-messages.min.js',
      'node_modules/angular-resource/angular-resource.min.js',
      'node_modules/angular-route/angular-route.min.js',
      'node_modules/angular-sanitize/angular-sanitize.min.js',
      'node_modules/angular-touch/angular-touch.min.js',
      'node_modules/angular-cookies/angular-cookies.min.js',
      'node_modules/bootstrap/dist/js/bootstrap.min.js',
      'node_modules/q/q.js',
      'node_modules/angular-route-segment/build/angular-route-segment.js',
      'node_modules/gulp-traceur/node_modules/traceur/bin/traceur-runtime.js',
      'scriptasaurus/ukeGeeks.scriptasaurus.merged.js',
      'columnizer/src/jquery.columnizer.min.js'
    ])
    .pipe(gulp.dest('build/lib'));
});

// transpile & move js
gulp.task('js', function () {
  return gulp.src('src/**/*.js')
    .pipe(rename({
      extname: '.js'
    }))
    .pipe(traceur({
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
  return gulp.src(['src/**/*.css','scriptasaurus/*.css'])
    .pipe(gulp.dest('build/css'))
});

// move fonts
gulp.task('fonts', function () {
  return gulp.src(['node_modules/bootstrap/fonts/*.*'])
    .pipe(gulp.dest('build/fonts/bootstrap'))
});

// move tabulatures
gulp.task('tab', function () {
  return gulp.src('src/**/*.tab')
    .pipe(gulp.dest('build/tabs'))
});

// sass
gulp.task('sass', function () {
  gulp.src('styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build/css'));
});
