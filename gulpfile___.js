var gulp = require('gulp'); 
var less = require('gulp-less');
var path = require('path');
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create()
var mqpacker = require("css-mqpacker");
var minify = require("gulp-csso");
var rename = require("gulp-rename");

// less({
//       paths: [ path.join(__dirname, 'less', 'includes') ]
//     })

gulp.task("style", function() {
  gulp.src("less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer({browsers: [
		"last 1 version",
		"last 2 Chrome versions",
		"last 2 Firefox versions",
		"last 2 Opera versions",
		"last 2 Edge versions"
		]}),
		mqpacker({
			sort: true
		})
    ]))
    .pipe(gulp.dest("css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
	.pipe(gulp.dest("css"));
  //  .pipe(server.stream());
});

gulp.task("serve", ["style"], function() {
  server.init({
    server: ".",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("less/**/*.less", ["style"]);
  gulp.watch("*.html").on("change", server.reload);
});

