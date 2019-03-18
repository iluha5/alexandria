////////////////////// Plugins ////////////////////////////

var gulp = require('gulp'); // Gulp
var less = require('gulp-less'); //less packages,
var browserSync = require('browser-sync'); // Browser Sync
var server = require("browser-sync").create(); // browser-sync
var path = require('path');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require("autoprefixer");
var mqpacker = require('css-mqpacker');
var minify = require('gulp-csso');
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var svgmin = require("gulp-svgmin");
var svgstore = require("gulp-svgstore");
var run = require('run-sequence');
var del = require('del');


///////// Working with CSS /////////////////////////////

gulp.task('less3', function () {
    return gulp.src('less/style.less')
        .pipe(plumber())
        .pipe(less([path.join(__dirname, 'less')])) // Convert less в CSS with gulp-less
        .pipe(postcss([
            autoprefixer({
                browsers: [
                    "last 1 version",
                    "last 2 Chrome versions",
                    "last 2 Firefox versions",
                    "last 2 Opera versions",
                    "last 2 Edge versions"
                ]
            }), // prefixes for browsers versions
            mqpacker({
                sort: true
            }) // unite media queryes
        ]))
        .pipe(gulp.dest('build/css')) // upload results to css folder
        .pipe(minify())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('build/css'));
        //.pipe(browserSync.reload({stream: true}));
});

//////////////////////////////////////////////////

///////// Optimizing JPG and PNG //////////////////

gulp.task("images", function () {
    return  gulp.src("build/img/**/*.{png,jpg,gif}")
        .pipe(imagemin([
            imagemin.optipng({optimizationLevel: 3}),
            imagemin.jpegtran({prograssive: true})
        ]))
        .pipe(gulp.dest('build/img'));

});
/////////////////////////////////////////////////////

/////////////// Building SVG sprites for INLINE /////////////////

gulp.task('symbols', function () {
   return gulp.src('build/img/*.svg')
       .pipe(svgmin())
       .pipe(svgstore({
           inlineSvg: true
       }))
       .pipe(rename("symbols.svg"))
       .pipe(gulp.dest('build/img'));
});

//////////////////////////////////////////////////////

//////////////////// watchers and sync with browser ////////////////////
// еще одна функция для browser-sync :)

// gulp.task("serve", ["less3"], function () {
//     browserSync.init({
//         server: "."
//     });
//
//     gulp.watch("less/**/*.less", ["less3"]);
//     gulp.watch("*.html").on("change", browserSync.reload);
// });

////////////////////////////////////////////////////////////////////////////

////////////////////// Copying to BUILD /////////////////////////

gulp.task('copy', function () {
   return gulp.src([
       'fonts/**/*.{woff,woff2}',
       'img/**',
       'js/**',
       '*.html'
   ], {
       base: '.'
   })
       .pipe(gulp.dest('build'));
});
///////////////////////////////////////////////////////////////////////////

////////////////// Removing //////////////////////////////////////////
gulp.task('clean', function () {
   return del('build');
});

////////////////////  Upload build to build folder //////////////////////

gulp.task('build', function (fn){
   run(
       'clean',
       'copy',
       'less3',
       'images',
       'symbols',
       fn);
});

///////////////////////////////////////////////////////////////////////////

/////////////// One more watcher //////////////////////////

gulp.task("style1", function() {
    gulp.src("less/style.less")
        .pipe(plumber())
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(postcss([
            autoprefixer({
                browsers: [
                    "last 1 version",
                    "last 2 Chrome versions",
                    "last 2 Firefox versions",
                    "last 2 Opera versions",
                    "last 2 Edge versions"
                ]
            })
        ]))
        .pipe(gulp.dest("css"))
        .pipe(server.stream());
});

gulp.task("serve1", ["style1"], function() {
    server.init({
        server: ".",
        notify: false,
        open: true,
        cors: true,
        ui: false
    });

    gulp.watch("less/**/*.less", ["style1"]);
    gulp.watch("*.html").on("change", server.reload);
});

///////////////////////////////////////////////////////////////////
