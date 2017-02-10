var gulp = require("gulp"),
    handlebars = require("gulp-handlebars"),
    wrap = require("gulp-wrap"),
    declare = require("gulp-declare"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    rename = require('gulp-rename');

gulp.task("handlebars-preCompile", function(){
    var template_src = "src/js/templates/",
        pre_template_src = "src/js/pre-templates/";

    gulp.src(template_src+'*.handlebars')
        .pipe(handlebars({
            handlebars: require('handlebars')
        }))
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'Student.templates',
            noRedeclare: true // Avoid duplicate declarations
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest(pre_template_src))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest(pre_template_src));
});