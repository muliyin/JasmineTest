/*告知Node去node_modules中查找gulp包，先局部查找，找不到就去全局环境中查找。找到之后就会赋值给gulp变量，然后就可以使用它*/
const gulp = require('gulp');
const watch = require('gulp-watch')
const browserSync = require('browser-sync').create();

gulp.task('watch', async function () {
	watch(['js/*.js','jasmine/**/*.js','index.html'],'change',browserSync.reload);
});

gulp.task('server', async function () {
	browserSync.init({
		// 这里的意思是含有这个文件的目录地址，可以将目录更改
		server: "./"
	});
});

gulp.task('default',gulp.series('server','watch'));

