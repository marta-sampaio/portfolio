const { src, watch, dest, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const minify = require('gulp-clean-css');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');


//compile scss
function compileScss() {
  return src('./app/scss/**/input.scss') // scss file directory
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sass()) // pass that file throught sass compiler
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./app/css'))// and save it in the following directory
};


//min scss
async function minScss() {
  return src(['./app/css/**/*.css', '!./app/css/**/*.min.css'])
    .pipe(minify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest('./app/css'))
};


//watchtask
function watchTask() {
  watch('./app/scss/**/*.scss', compileScss);
  watch('./app/scss/**/*.scss', minScss);
}


// Default Gulp task 
exports.default = series(
  compileScss,
  minScss,
  watchTask
);