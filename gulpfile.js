/*
 * 
 *  1 gulp build 
 *      add bootastrap assets, font-awesome to source
 *      
 *  2 run gulp
 * 
 * */
 
 /* requires */
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer');

var config = {
    sourceDir: 'source',
    publicDir: 'public_html',
    bowerDir: 'public_html/bower_components',
    maps: 'maps'
};


/************** copy ***************/
/* copy 
        bootstrap assets 
        font-awesome
to source */
/***********************************/
gulp.task('copy:scss', function() {
    return gulp.src(config.bowerDir + '/bootstrap-sass/assets/stylesheets/**/*.scss')
        .pipe(gulp.dest(config.sourceDir + '/scss'));
});
gulp.task('copy:glyphs', function() {
    return gulp.src(config.bowerDir + '/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.*')
        .pipe(gulp.dest(config.publicDir + '/fonts/bootstrap'));
});
gulp.task('copy:font-awesome', function() {
    return gulp.src(config.bowerDir + '/font-awesome/fonts/fontawesome-webfont.*')
        .pipe(gulp.dest(config.publicDir + '/fonts'));
});
gulp.task('copy:scss-awesome', function() {
    return gulp.src(config.bowerDir + '/font-awesome/scss/**.*')
        .pipe(gulp.dest(config.sourceDir + '/scss/font-awesome'));
});

/*********** scripts *********/
/* copy, minify, map, min js */
/*****************************/
gulp.task('scripts', function () {
    return gulp.src(config.sourceDir + '/js/**/*.js')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(rename({suffix:'.min'}))
        .pipe(uglify())
        .pipe(sourcemaps.write(config.maps))
        .pipe(gulp.dest(config.publicDir + '/js'));
});
/********** styles ************/
/* scss to css, map, prefixer */
/******************************/
gulp.task('styles', function (){
    return sass(config.sourceDir + '/scss/style.scss', {style: 'compressed',sourcemap: true})  /* style: 'compressed' , 'expanded' */
        .pipe(plumber())
        .pipe(sourcemaps.init())
        //.on('error', sass.logError)
        .pipe(autoprefixer('last 2 versions'))              /*autoprefixer always before source maps*/
        .pipe(sourcemaps.write(config.maps))
        .pipe(gulp.dest(config.publicDir + '/css')); 
});
/****************/
/**** watch *****/
/****************/
gulp.task('watch', function (){
   gulp.watch(config.sourceDir + '/js/**/*.js', ['scripts']);
   gulp.watch(config.sourceDir + '/scss/**/*.scss', ['styles']);
});

/* copy files build*/
gulp.task('build', ['copy:scss','copy:glyphs','copy:font-awesome','copy:scss-awesome']);

/*****************/
/**** default ****/
/*****************/
gulp.task('default',['scripts','styles','watch']);