//构建脚本--对js处理
//gulp处理的都是文件流，基于stream的
import gulp from 'gulp';
import gulpif from 'gulp-if';//用gulp语句作if判断
import concat from 'gulp-concat';//在gulp中处理文件拼接
import webpack from 'webpack';//使用webpack打包
//gulp对webpack的处理结合webpack-stream
import gulpWebpack from 'webpack-stream';
//对文件重命名作标志的
import named from 'vinyl-named';
//热更新-修改文件后浏览器自动刷新
import livereload from 'gulp-livereload';
//处理文件信息流
import plumber from 'gulp-plumber';
//对文件重命名
import rename from 'gulp-rename';
//js压缩css压缩
import uglify from 'gulp-uglify';
//在命令行工具输出的包
import {log,colors} from 'gulp-util';
//对命令行参数处理的包
import args from './util/args';


//创建gulp任务
gulp.task('scripts',()=>{
  return gulp.src(['app/js/index.js'])//打开文件
    .pipe(plumber({//处理常规错误逻辑
      //避免在某一环节报错、抛出异常，要集中处理错误。改变默认处理错误的机制
      errorHandle:function(){
      	//（这里会默认错误处理，结合webpack去做）
      }
    }))
    .pipe(named())//重命名
    .pipe(gulpWebpack({//编译js
      module:{
        loaders:[{
          test:/\.js$/,
          //需要安装babel-loader安装包，并依赖babel-core、babel-preset-env包
          loader:'babel-loader'//遇到js需使用babel-loader去处理
        }]
      }
    }),null,(err,stats)=>{//处理错误
      log(`Finished '${colors.cyan('scripts')}'`,stats.toString({
        chunks:false
      }))
    })
    .pipe(gulp.dest('server/public/js'))//放置编译后文件路径
    //路径放在server中，因为server要拿到js文件才能跑起来
    .pipe(rename({
      basename:'cp',
      extname:'.min.js'
    }))//重命名、重新复制一份，文件名改为cp.min.js
    //压缩文件
    .pipe(uglify({compress:{properties:false},output:{'quote_keys':true}}))
    .pipe(gulp.dest('server/public/js'))//报错压缩文件位置
    //监听这个文件，当文件变化之后，自动刷新
    .pipe(gulpif(args.watch,livereload()))
})

