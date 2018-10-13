//在命令行输入gulp，会默认找default.js文件

import gulp from 'gulp';

gulp.task('default',['build']);
//一定要有default任务，本文件可以不命名为default.js文件名都可以
