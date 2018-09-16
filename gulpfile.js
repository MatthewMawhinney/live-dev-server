const gulp = require('gulp');
const imagemin = require("gulp-imagemin");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const rimraf = require("gulp-rimraf");
const sequence = require("gulp-sequence");
const browserSync = require('browser-sync').create();

gulp.task('copyHTML', () => {
  gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('imageMin', () => {
  gulp.src('src/assets/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
    .pipe(browserSync.stream());
});

gulp.task('sass', () => {
  gulp.src('src/scss/*.scss')
    .pipe(sass().on('Error', sass.logError))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
});

gulp.task('css', () => {
  gulp.src('src/css/*.css')
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('js', () => {
  gulp.src('src/js/*.js')
    .pipe(babel())
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['copyHTML', 'imageMin', 'sass', 'css', 'js'], () => {
    browserSync.init({
        server: './dist',
        https: true,
        ghostMode: {
            clicks: true,
            forms: true,
            scroll: true
        },
        open: 'external'
    });
    gulp.watch('src/js/*.js', ['js']);
    gulp.watch('src/assets/img/*', ['imageMin']);
    gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch('src/css/*.css', ['css']);
    gulp.watch('src/*.html', ['copyHTML']).on('change', browserSync.reload);
});

gulp.task('clean', () => {
    rimraf('dist', (error) => {
        error ? console.log('Cleaning Error: ' + error) : '';
    });
});

gulp.task('default', sequence(['clean'], 'serve'));