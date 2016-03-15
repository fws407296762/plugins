"use strict";
var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    concat = require('gulp-concat'),
    annotate = require('gulp-ng-annotate');

gulp.task('compressMoveController',function(){
    gulp.src('src/controller/*.js')
    .pipe(annotate())
    .pipe(uglify())
    .pipe(concat('controller.js'))
    .pipe(gulp.dest('./public/js/'));
});
gulp.task('default',['compressMoveController']);

let watcher = gulp.watch('src/controller/*.js',["compressMoveController"]);

watcher.on("change",function(e){
    console.log('文件' + e.path +'被' +e.type +',任务运行中...')
})