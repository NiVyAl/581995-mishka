"use strict";

var gulp = require("gulp");
var less = require("gulp-less"); // конвертирует в css
var rename = require("gulp-rename"); // для переименования файлов
var plumber = require("gulp-plumber"); // подключил библиотеку (plumber-не дает прервать работу консоли)
var postcss = require("gulp-postcss"); // postcss-добавляет префиксы
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var csso = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var postHtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");

gulp.task("css", function () { // css - имя задачи
  return gulp.src("source/less/style.less")
    .pipe(plumber()) // запустил библиотеку
    .pipe(less())
    .pipe(postcss([
      autoprefixer() // используем в postcss ток autoprefixer
    ]))
    .pipe(gulp.dest("build/css")) // складывает в папку
    .pipe(csso())
    .pipe(rename("style.min.css")) // .min.css -- название переименованного
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("images", function() {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
]))
    .pipe(gulp.dest("source/img"));
});

gulp.task("webp", function() {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("source/img"));
});

gulp.task("sprite", function() {
  return gulp.src("source/img/icon-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("html", function() {
  return gulp.src("source/*.html")
    .pipe(postHtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
})

gulp.task("server", function () { // настройка сервера
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("css"));
  gulp.watch("source/img/icon-*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
  //gulp.watch("source/*.html").on("change", server.reload);
});

gulp.task("refresh", function(done) {
  server.reload();
  done();
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("copy", function() {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/**"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
})

gulp.task("build", gulp.series("clean", "copy", "css", "sprite", "html"));
gulp.task("start", gulp.series("build", "server"));
