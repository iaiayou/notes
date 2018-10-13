//处理服务器脚本的脚本文件

import gulp from 'gulp';
import gulpif from 'gulp-if';
//启动服务器的包
import liveserver from 'gulp-live-server';
import args from './util/args';

gulp.task('serve',(cb)=>{
  //判断不是处于监听状态下，直接返回回调函数
  if(!args.watch) return cb();

  
  /**
   * 处于监听状态下，创建服务器
   * --harmony:在当前命令行下执行后面的脚本
   * server/bin/www服务器启动express下默认的脚本
   */
  var server = liveserver.new(['--harmony','server/bin/www']);
  server.start();//服务器启动

  //监听server目录下的文件发生改变的时候热更新-浏览器自动更新
  gulp.watch(['server/public/**/*.css','server/public/**/*.js','server/views/**/*.ejs'],function(file){
    server.notify.apply(server,[file]);//将文件的改动通知服务器
  })

  //监听需要重启服务器的文件-服务器中的路由、接口发生变化
  gulp.watch(['server/routes/**/*.js','server/app.js'],function(){
    server.start.bind(server)()//重启服务器
  });
})