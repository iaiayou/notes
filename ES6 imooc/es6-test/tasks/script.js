//�����ű�--��js����
//gulp����Ķ����ļ���������stream��
import gulp from 'gulp';
import gulpif from 'gulp-if';//��gulp�����if�ж�
import concat from 'gulp-concat';//��gulp�д����ļ�ƴ��
import webpack from 'webpack';//ʹ��webpack���
//gulp��webpack�Ĵ�����webpack-stream
import gulpWebpack from 'webpack-stream';
//���ļ�����������־��
import named from 'vinyl-named';
//�ȸ���-�޸��ļ���������Զ�ˢ��
import livereload from 'gulp-livereload';
//�����ļ���Ϣ��
import plumber from 'gulp-plumber';
//���ļ�������
import rename from 'gulp-rename';
//jsѹ��cssѹ��
import uglify from 'gulp-uglify';
//�������й�������İ�
import {log,colors} from 'gulp-util';
//�������в�������İ�
import args from './util/args';


//����gulp����
gulp.task('scripts',()=>{
  return gulp.src(['app/js/index.js'])//���ļ�
    .pipe(plumber({//����������߼�
      //������ĳһ���ڱ����׳��쳣��Ҫ���д�����󡣸ı�Ĭ�ϴ������Ļ���
      errorHandle:function(){
      	//�������Ĭ�ϴ��������webpackȥ����
      }
    }))
    .pipe(named())//������
    .pipe(gulpWebpack({//����js
      module:{
        loaders:[{
          test:/\.js$/,
          //��Ҫ��װbabel-loader��װ����������babel-core��babel-preset-env��
          loader:'babel-loader'//����js��ʹ��babel-loaderȥ����
        }]
      }
    }),null,(err,stats)=>{//�������
      log(`Finished '${colors.cyan('scripts')}'`,stats.toString({
        chunks:false
      }))
    })
    .pipe(gulp.dest('server/public/js'))//���ñ�����ļ�·��
    //·������server�У���ΪserverҪ�õ�js�ļ�����������
    .pipe(rename({
      basename:'cp',
      extname:'.min.js'
    }))//�����������¸���һ�ݣ��ļ�����Ϊcp.min.js
    //ѹ���ļ�
    .pipe(uglify({compress:{properties:false},output:{'quote_keys':true}}))
    .pipe(gulp.dest('server/public/js'))//����ѹ���ļ�λ��
    //��������ļ������ļ��仯֮���Զ�ˢ��
    .pipe(gulpif(args.watch,livereload()))
})

