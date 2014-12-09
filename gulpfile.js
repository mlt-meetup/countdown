var gulp = require('gulp');
var stylus = require('gulp-stylus');
var assemble = require('gulp-assemble');
var browserSync = require('browser-sync');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var nib = require('nib');

console.log(assemble);
console.log(assemble.helpers)

// Start the server
gulp.task('browser-sync', function() {
  browserSync({
    server: {
        baseDir: "./publish"
    }
  });
});

// Use nib
gulp.task('css', function () {
  gulp.src('./src/css/style.styl')
    .pipe(stylus({use: [nib()]}))
    .pipe(gulp.dest('./publish/css/'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('js', function () {
    browserify({
      entries: ['./src/js/app.js'],
      extensions: ['.js']
    })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./publish/js/'))
});

// Reload all Browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('assemble', function () {
  gulp.src('src/*.hbs')
    .pipe(assemble({
      partials: ['src/_partials/**/*.hbs']
      
    }))
    .pipe(gulp.dest('./publish'))
});

gulp.task('copy_font', function(){
  gulp.src('src/font/*')
    .pipe(gulp.dest('./publish/font'));
});

gulp.task('copy_img', function(){
  gulp.src('src/images/*')
    .pipe(gulp.dest('./publish/images'));
});

// Watch scss AND html files, doing different things with each.
gulp.task('default', ['browser-sync','assemble','css','js','copy_font','copy_img'], function () {
    gulp.watch("src/css/**/*.styl", ['css']);
    gulp.watch("src/js/**/*.js", ['js']);
    gulp.watch("src/**/*.hbs", ['assemble']);
    gulp.watch("publish/*.html", ['bs-reload']);
    gulp.watch("publish/*.js", ['bs-reload']);
    gulp.watch("src/images/*", ['copy_img','bs-reload']);
});

