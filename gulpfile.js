let project_folder = "build";
let source_folder = "src";

let path={
    build:{
        html: project_folder + "/",
        pug: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        img: project_folder + "/img/",
    },
    src:{
        html: source_folder + "/*.html",
        pug: source_folder + "/*.pug",
        css: source_folder + "/scss/style.scss",
        js: source_folder + "/js/script.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif}",
    },
    watch:{
        html: source_folder + "/**/*.html",
        pug: source_folder + "/**/*.pug",
        css: source_folder + "/scss/**/*.scss",
        js: source_folder + "/js/**/*.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif}",
    },
    clean: "./" + project_folder + "/"
}

let { src, dest} = require('gulp'),
gulp = require('gulp'),
browsersync = require("browser-sync").create(),
del = require('del'),
pug = require('gulp-pug'),
scss = require('gulp-sass')(require('sass')),
autoprefixer = require('gulp-autoprefixer'),
group_media = require('gulp-group-css-media-queries'),
clean_css = require('gulp-clean-css'),
uglify = require('gulp-uglify-es').default,
imagemin = require('gulp-imagemin'),
obfuscator = require('gulp-javascript-obfuscator');

function browserSync(params) {
    browsersync.init ({
        server: {
            baseDir: "./" + project_folder + "/"
        },
        port: 3000,
        notify: false
    })
}

function html() {
    return src(path.src.html)
    .pipe(pug({
        pretty: true
     }))
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
}

function pugInclude() {
    return src(path.src.pug)
    .pipe(pug({
        pretty: true
     }))
    .pipe(dest(path.build.pug))
    .pipe(browsersync.stream())
}

function js() {
    return src(path.src.js)
    .pipe(obfuscator({
        compact: true
    }))
    .pipe(uglify())
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())
}

function css() {
    return src(path.src.css)
    .pipe (
        scss ({
            outputStyle: 'expanded'
        })
    )
    .pipe (
        autoprefixer ({
            overrideBrowserslist:  ['last 5 versions'],
            cascade: true
        })
    )
    .pipe (
        group_media ()
    )
    .pipe(clean_css())
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())
}

function images() {
    return src(path.src.img)
  
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream())
}

function watchFiles (params) {
    gulp.watch([path.watch.html],html)
    gulp.watch([path.watch.pug],pugInclude)
    gulp.watch([path.watch.css],css)
    gulp.watch([path.watch.js],js)
    gulp.watch([path.watch.img],images)
}

function clean (params) {
    return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(css, js, html, pugInclude, images));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.images = images;
exports.css = css;
exports.js = js;
exports.html = html;
exports.pug = pug;
exports.build = build;
exports.watch = watch;
exports.default = watch;