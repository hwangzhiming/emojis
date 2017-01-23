const gulp = require("gulp");
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify');
const gusefiles = require('./gulp-usefiles');
const path = require('path');
const emojiFiles = "./emoji-cheat-sheet.com/public/graphics/emojis/*.png";
gulp.task('clean', ['cleanSrc'], function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('cleanSrc', function () {
    return gulp.src('./src/smart.emojis.list.js', {read: false})
        .pipe(clean());
});

gulp.task('pngs', function () {
    return gulp.src(emojiFiles)
        .pipe(gulp.dest('./dist/emojis'));
});

gulp.task('build:js', [],  () =>{
    return gulp.src('./src/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('smart.emojis.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

gulp.task('emoji:list', ['clean'] ,() => {
    gulp.src(emojiFiles)
        .pipe(gusefiles('smart.emojis.list.js', {
            itemTemplate: (name) => {
                return `"${name.replace('+', '\\\\+')}"`;
            },
            separator: ',',
            flatten: true,
            removeExtensions: true,
            template:'angular.module("smart.emojis").constant("smart.emojis.list", [@content@]);'
        })).pipe(gulp.dest('./src'));
});

gulp.task('default', ['publish']);
gulp.task('publish', ['build:js', 'pngs']);