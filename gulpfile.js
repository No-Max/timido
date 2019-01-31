var gulp           = require('gulp'),
		gutil          = require('gulp-util' ),
		browserSync    = require('browser-sync'),
		concat         = require('gulp-concat'),
		uglify         = require('gulp-uglify'),
		cleanCSS       = require('gulp-clean-css'),
		rename         = require('gulp-rename'),
		del            = require('del'),
		imagemin       = require('gulp-imagemin'),
		cache          = require('gulp-cache'),
		autoprefixer   = require('gulp-autoprefixer'),
		ftp            = require('vinyl-ftp'),
		notify         = require("gulp-notify"),
		rsync          = require('gulp-rsync'),
		includeHtml	   = require("gulp-include-html"),
		less		   = require("gulp-less"),
		htmlbeautify   = require('gulp-html-beautify');

// Скрипты проекта

gulp.task('build-html' , function(){
    return gulp.src("app/html/*.html")
        .pipe(includeHtml({
           // 'public':"./public/bizapp" + version,
           // 'version':version,
            
            baseDir:'app'
           // ignore:\/modules\/
        }))
        .pipe(gulp.dest("app"));
});

 
gulp.task('htmlbeautify', function() {
  gulp.src('app/*.html')
    .pipe(htmlbeautify({indentSize: 4}))
    .pipe(gulp.dest('app'))
});

//== LIBS ==
gulp.task('js', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/jquery-validation/dist/jquery.validate.min.js',
		'app/libs/jquery/dist/jquery.maskedinput.js',
		'app/libs/bootstrap/dist/js/bootstrap.min.js',
		'app/libs/slick-carousel/slick/slick.min.js',
		])
	.pipe(concat('libs.min.js'))
	// .pipe(uglify()) // Минимизировать весь js (на выбор)
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('css', function() {
	return gulp.src([
		'app/libs/bootstrap/dist/css/bootstrap.min.css',
		'app/libs/font-awesome/css/font-awesome.min.css',
		'app/libs/slick-carousel/slick/slick.css',
		])
	.pipe(concat('libs.min.css'))
	//.pipe(uglify()) // Минимизировать весь css (на выбор)
	.pipe(gulp.dest('app/css'));
});

gulp.task('less', ['css'], function() {
	return gulp.src([
		'app/less/mixins.less',
		'app/less/config.less',
		'app/less/main.less',
		'app/less/media.less' // Всегда в конце
		])
	.pipe(concat('main.less'))
	//.pipe(gulp.dest('app/css'))
	.pipe(less())
	.pipe(autoprefixer(['last 15 versions']))
	//.pipe(uglify()) // Минимизировать(на выбор)
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// tunnel: true,
		// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
	});
});

gulp.task('watch', ['less', 'js', 'build-html', 'browser-sync'], function() {
	gulp.watch('app/less/**/*.less', ['less']);
	gulp.watch(['libs/**/*.js', 'app/js/main.js'], ['js']);
	gulp.watch('app/html/**/*.html', ['build-html', browserSync.reload]);
});

gulp.task('imagemin', function() {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin()))
	.pipe(gulp.dest('dist/img')); 
});

gulp.task('build', ['removedist', 'imagemin', 'less', 'js', 'build-html', 'htmlbeautify'], function() {

	var buildFiles = gulp.src([
		'app/*.html',
		//'app/.htaccess',
		]).pipe(gulp.dest('dist'));

	var buildCss = gulp.src([
		'app/css/*',
		]).pipe(gulp.dest('dist/css'));

	var buildJs = gulp.src([
		'app/js/*.js',
		]).pipe(gulp.dest('dist/js'));

	var buildFonts = gulp.src([
		'app/fonts/**/*',
		]).pipe(gulp.dest('dist/fonts'));

});

gulp.task('deploy', function() {

	var conn = ftp.create({
		host:      'hostname.com',
		user:      'username',
		password:  'userpassword',
		parallel:  10,
		log: gutil.log
	});

	var globs = [
	'dist/**',
	'dist/.htaccess',
	];
	return gulp.src(globs, {buffer: false})
	.pipe(conn.dest('/path/to/folder/on/server'));

});

gulp.task('rsync', function() {
	return gulp.src('dist/**')
	.pipe(rsync({
		root: 'dist/',
		hostname: 'username@yousite.com',
		destination: 'yousite/public_html/',
		archive: true,
		silent: false,
		compress: true
	}));
});

gulp.task('removedist', function() { return del.sync('dist'); });
gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['watch']);
