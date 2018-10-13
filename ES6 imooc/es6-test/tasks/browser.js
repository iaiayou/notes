//原文件发生改变，自动编译生成文件放到server/public或view目录下

import gulp from 'gulp';
import gulpif from 'gulp-if';
import gutil from 'gulp-util';
import args from './util/args';

gulp.task('browser',(cb)=>{
  if(!args.watch) return cb();
  /**
   * 监听原始目录下js发生变化时启动scripts构建脚本
   * 参数1：监听什么文件
   * 参数2：执行什么任务
   */
  gulp.watch('app/**/*.js',['scripts']);
  gulp.watch('app/**/*.ejs',['pages']);
  gulp.watch('app/**/*.css',['css','pages']);
});