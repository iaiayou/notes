//清空server指定目录文件的任务

import gulp from 'gulp';
//引入做删除任务的包
import del from 'del';
import args from './util/args';

gulp.task('clean',()=>{
  return del(['server/public','server/views'])//清空两个目录
})