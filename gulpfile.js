'use strict';

const gulp = require('gulp');

const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const groupMediaQueries = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-cleancss');

const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const replace = require('gulp-replace');
const del = require('del');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();

const paths =  {
    src: './src/',              // paths.src
    build: './build/',          // paths.build
    modules: './node_modules/'
};

function styles() {
    return gulp.src([
        paths.modules + 'normalize.css/normalize.css',
        paths.src + 'scss/main.scss'
    ])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sassGlob())
        .pipe(sass()) // { outputStyle: 'compressed' }
        .pipe(groupMediaQueries())
        .pipe(cleanCSS())
        .pipe(rename({ suffix: ".min" }))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest(paths.build + 'css/'))
}

function scripts() {
    return gulp.src([
        paths.modules + 'jquery/dist/jquery.min.js',
        paths.modules + 'jquery-touchswipe/jquery.touchSwipe.min.js',
        paths.modules + 'mobile-detect/mobile-detect.min.js',
        paths.src + 'js/*.js'
    ])
        .pipe(plumber())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(concat('script.min.js'))
        .pipe(gulp.dest(paths.build + 'js/'))
}

function htmls() {
    return gulp.src(paths.src + '*.html')
        .pipe(plumber())
        .pipe(replace(/\n\s*<!--DEV[\s\S]+?-->/gm, ''))
        .pipe(gulp.dest(paths.build));
}

function fonts() {
    return gulp.src(paths.src + 'fonts/**/*')
        .pipe(plumber())
        .pipe(gulp.dest(paths.build + 'fonts/'));
}
function icons() {
    return gulp.src(paths.src + 'icons/**/*')
        .pipe(plumber())
        .pipe(gulp.dest(paths.build + 'icons/'));
}
function img() {
    return gulp.src(paths.src + 'img/**/*')
        .pipe(plumber())
        .pipe(gulp.dest(paths.build + 'img/'));
}

function php() {
    return gulp.src(paths.src + '*.php')
        .pipe(plumber())
        .pipe(gulp.dest(paths.build));
}

function clean() {
    return del('build/')
}

function watch() {
    gulp.watch(paths.src + 'scss/*.scss', styles);
    gulp.watch(paths.src + 'js/*.js', scripts);
    gulp.watch(paths.src + '*.html', htmls);
}

function serve() {
    browserSync.init({
        server: {
            baseDir: paths.build
        }
    });
    browserSync.watch(paths.build + '**/*.*', browserSync.reload);
}

exports.styles = styles;
exports.scripts = scripts;
exports.htmls = htmls;
exports.fonts = fonts;
exports.icons = icons;
exports.img = img;
exports.php = php;
exports.clean = clean;
exports.watch = watch;

gulp.task('build', gulp.series(
    clean,
    styles,
    scripts,
    htmls,
    fonts,
    icons,
    img,
    php
    // gulp.parallel(styles, scripts, htmls)
));

gulp.task('default', gulp.series(
    clean,
    gulp.parallel(styles, scripts, htmls, fonts, icons, img, php),
    gulp.parallel(watch, serve)
));
