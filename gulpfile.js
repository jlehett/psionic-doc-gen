const DOCS_COMMAND = process.env.DOCS_COMMAND || 'yarn docs'
const DOCS_OUTPUT = process.env.DOCS_OUTPUT || '../docs'

const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const concat = require('gulp-concat')
const path = require('path')
const browserSync = require('browser-sync').create()
const exec = require('child_process').exec;

gulp.task('sass', () =>
  gulp.src('styles/app.sass')
    .pipe(sass({
      outputStyle: 'compressed',
    }))
    .pipe(autoprefixer())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('static/styles'))
)

gulp.task('js', () =>
  gulp.src(path.join('scripts/', '*.js'), {base: 'app'})
    .pipe(concat('app.js'))
    .pipe(babel({
      presets: ['@babel/preset-env'],
    }))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('static/scripts'))
)

gulp.task('default', gulp.series(['sass', 'js']))

