'use strict';

const { src, dest, series, parallel, watch } = require('gulp');

const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const groupMediaQueries = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-cleancss');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const replace = require('gulp-replace');
const del = require('del');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();

const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const imagemin = require('gulp-imagemin');

const paths =  {
    src: './src/',              // paths.src
    build: './build/',          // paths.build
    modules: './node_modules'
};

function styles() {
    return src(paths.src + 'scss/style.scss')
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(sassGlob())
      .pipe(sass()) // { outputStyle: 'compressed' }
      .pipe(groupMediaQueries())
      .pipe(postcss([
        autoprefixer({browsers: ['last 2 version']}),
      ]))
      .pipe(cleanCSS())
      .pipe(rename({ suffix: ".min" }))
      .pipe(sourcemaps.write('/'))
      .pipe(dest(paths.build + 'css/'));
  }

function normalize() {
  return src(paths.src + 'css/*.css')
      .pipe(plumber())
      .pipe(dest(paths.build + 'css/'));
}

function svgSprite() {
    return src(paths.src + 'svg/*.svg')
      .pipe(svgmin(function (file) {
        return {
          plugins: [{
            cleanupIDs: {
              minify: true
            }
          }]
        }
      }))
      .pipe(svgstore({ inlineSvg: true }))
      .pipe(rename('sprite-svg.svg'))
      .pipe(dest(paths.build + 'img/'));
}
  
function scripts() {
    return src(paths.src + 'js/*.js')
      .pipe(plumber())
      .pipe(babel({
        presets: ['@babel/env']
      }))
      .pipe(uglify())
      .pipe(concat('script.min.js'))
      .pipe(dest(paths.build + 'js/'))
  }
function scriptsVendors() {
    return src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/slick-carousel/slick/slick.min.js',
        'node_modules/svg4everybody/dist/svg4everybody.min.js'
      ])
      .pipe(concat('vendors.min.js'))
      .pipe(dest(paths.build + 'js/'))
}
function htmls() {
    return src(paths.src + '*.html')
      .pipe(plumber())
      .pipe(replace(/\n\s*<!--DEV[\s\S]+?-->/gm, ''))
      .pipe(dest(paths.build));
  }

function fonts() {
    return src(paths.src + 'fonts/**/*')
        .pipe(plumber())
        .pipe(dest(paths.build + 'fonts/'));
}
function icons() {
    return src(paths.src + 'icons/**/*')
        .pipe(plumber())
        .pipe(dest(paths.build + 'icons/'));
}
function images_content() {
    return src(paths.src + 'img/content/*.{jpg,jpeg,png,gif,svg}')
      .pipe(imagemin())
      .pipe(dest(paths.build + 'img/content'));
  }

  function images_bg() {
    return src(paths.src + 'img/bg/*.{jpg,jpeg,png,gif,svg}')
      .pipe(imagemin())
      .pipe(dest(paths.build + 'img/bg'));
  }

  function images_bg_best() {
    return src(paths.src + 'img/bg/bg-best/*.{jpg,jpeg,png,gif,svg}')
      .pipe(imagemin())
      .pipe(dest(paths.build + 'img/bg/bg-best'));
  }

  function images_bg_menu() {
    return src(paths.src + 'img/bg/bg-menu/*.{jpg,jpeg,png,gif,svg}')
      .pipe(imagemin())
      .pipe(dest(paths.build + 'img/bg/bg-menu'));
  }

  function images_texture() {
    return src(paths.src + 'img/bg/texture/*.{jpg,jpeg,png,gif,svg}')
      .pipe(imagemin())
      .pipe(dest(paths.build + 'img/bg/texture'));
  }

  function images_photos() {
    return src(paths.src + 'img/photos/*.{jpg,jpeg,png,gif,svg}')
      .pipe(imagemin())
      .pipe(dest(paths.build + 'img/photos'));
  }

  function images_slider() {
    return src(paths.src + 'img/content/burgers-slider/*.{jpg,jpeg,png,gif,svg}')
      .pipe(imagemin())
      .pipe(dest(paths.build + 'img/content/burgers-slider'));
  }

function php() {
    return src(paths.src + '*.php')
        .pipe(plumber())
        .pipe(dest(paths.build));
}

function clean() {
    return del('build/')
}

function watcher() {
    watch(paths.src + 'scss/*.scss', styles);
    watch(paths.src + 'js/*.js', scripts);
    watch(paths.src + '*.html', htmls);
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
exports.scriptsVendors = scriptsVendors;
exports.htmls = htmls;
exports.images_content = images_content;
exports.images_bg = images_bg;
exports.images_bg_menu = images_bg_menu;
exports.images_bg_best = images_bg_best;
exports.images_texture = images_texture;
exports.images_photos = images_photos;
exports.images_slider = images_slider;
exports.fonts = fonts;
exports.svgSprite = svgSprite;
exports.clean = clean;
exports.watcher = watcher;

exports.build = series(
  clean,
  parallel(styles, svgSprite, scripts, scriptsVendors, htmls, images_content, images_bg, images_bg_menu, images_bg_best, images_texture, images_photos, images_slider, fonts)
);

exports.default = series(
  clean,
  parallel(styles, normalize, svgSprite, scripts, scriptsVendors, htmls, images_content, images_bg, images_bg_menu,images_bg_best,images_texture, images_photos, images_slider, fonts, icons, php),
  parallel(watcher, serve),
);