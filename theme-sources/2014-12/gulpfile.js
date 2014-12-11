var gulp = require('gulp');
var stylus = require('gulp-stylus');
var browserSync = require('browser-sync');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var nib = require('nib');

// Start the server
gulp.task('browser-sync', function() {
  browserSync({
    server: {
        baseDir: "../../public/2014-12"
    }
  });
});

// Use nib
gulp.task('css', function () {
  gulp.src('./src/css/style.styl')
    .pipe(stylus({use: [nib()]}))
    .pipe(gulp.dest('../../public/2014-12/css/'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('js', function () {
    browserify({
      entries: ['./src/js/app.js'],
      extensions: ['.js']
    })
    .bundle()
    .on('error', console.log.bind(console, 'error'))
    .pipe(source('app.js'))
    .pipe(gulp.dest('../../public/2014-12/js/'))
});

// Reload all Browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('html', function () {
  gulp.src('src/index.html')
    .pipe(gulp.dest('../../public/2014-12'))
});

gulp.task('copy_font', function(){
  gulp.src('src/font/*')
    .pipe(gulp.dest('../../public/2014-12/font'));
});

gulp.task('copy_img', function(){
  gulp.src('src/images/*')
    .pipe(gulp.dest('../../public/2014-12/images'));
});

// Watch scss AND html files, doing different things with each.
gulp.task('default', ['browser-sync','html','css','js','copy_font','copy_img'], function () {
    gulp.watch("src/css/**/*.styl", ['css']);
    gulp.watch("src/js/**/*.js", ['js']);
    gulp.watch("src/**/*.html", ['html']);
    gulp.watch("../../public/2014-12/*.html", ['bs-reload']);
    gulp.watch("../../public/2014-12/*.js", ['bs-reload']);
    gulp.watch("src/images/*", ['copy_img','bs-reload']);
});
