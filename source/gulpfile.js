var gulp = require('gulp'),
    fileinclude = require('gulp-file-include'),
    include=require('gulp-include'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	sourcemaps = require('gulp-sourcemaps'),
	sass = require('gulp-sass'),
    path = require('path'),
    data = require('gulp-data'),
    teddy = require('gulp-teddy').settings({
    setTemplateRoot: './',
    setVerbosity: 3,
    strictParser: true,
    enableForeachTag: false,
    compileAtEveryRender: true
})
;

var config = {
    bootstrapDir: './bower_components/bootstrap-sass',
    publicDir: './public/angular',
    sassDir: './resources/angular',
    urlDir:'public/angular'
};
gulp.task('loop', function() {
    return gulp.src([config.publicDir+'/component/cate-content.html'])
        .pipe(data(function(file) {
            return require(config.publicDir+'/data/'+ path.basename(file.path, '.html') + '.json');
        }))
        .pipe(teddy.compile())
        .pipe(gulp.dest('public/component/template'));
});
gulp.task('js',function(){
    return gulp.src([config.sassDir+'/js/*.js'])
        .pipe(include())
        .pipe(gulp.dest(config.publicDir+'/js'));
});
gulp.task('fileinclude', function() {
  gulp.src([config.publicDir+'/component/{index,category,product}.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(config.publicDir));
});
gulp.task('css', function() {
    return gulp.src(config.sassDir+'/sass/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        includePaths: [config.bootstrapDir + '/assets/stylesheets'],
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.publicDir + '/css'));
});
gulp.task('serve', [], function () {
    browserSync({
        notify: false,
        server: {
            baseDir: config.urlDir
        }
    });
    gulp.watch([config.sassDir+'/sass/**/*.scss'], ['css',reload]);
    gulp.watch([config.publicDir+'/component/**/*.html'], ['fileinclude',reload]);
});
gulp.task('fonts', function() {
    return gulp.src(config.bootstrapDir + '/assets/fonts/**/*')
    .pipe(gulp.dest(config.publicDir + '/fonts'));
});

gulp.task('default', ['css', 'fonts']);