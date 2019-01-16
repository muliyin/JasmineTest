/*告知Node去node_modules中查找gulp包，先局部查找，找不到就去全局环境中查找。找到之后就会赋值给gulp变量，然后就可以使用它*/
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const jasmineBrowser = require('gulp-jasmine-browser');

gulp.task('test', async function () {
	gulp.src(['tests/*.js'])
		.pipe(jasmine({
			integration: true,
			vendor: 'js/*.js'  /*指向js源文件*/
		}))
});

/*gulp.task('watch', async function () {
	gulp.watch('sass/!*.scss', gulp.series('styles', 'autoprefixer'));
	gulp.watch('js/!*.js', gulp.parallel('scripts'));
	gulp.watch('*.html', gulp.parallel('copy-html'));
	gulp.watch('img/!*', gulp.parallel('images'));
});*/


/*gulp.task('server', async function () {
	browserSync.init({
		// 这里的意思是含有这个文件的目录地址，可以将目录更改
		server: "./dist"
	});
});*/

gulp.task('default', gulp.series(
	gulp.parallel(
		'scripts',
		'server'),
	'watch'
));

