// 处理命令行参数脚本文件
// 识别命令行输入的东西
import yargs from 'yargs';

const args = yargs
//区分开发环境和线上环境
//区分命令行是不是有这个参数
.option('production',{
	boolean:true,
	default:false,//默认值fasle为开发环境
	describe:'min all scrpts' //描述
})
//watch监听开发环境中修改文件是否需要自动编译
.option('watch',{
	boolean:true,
	default:false,
	describe:'watch all files'
})
//详细输出命令行执行日志
.option('verbose',{
	boolean:true,
	default:false,
	describe:'log'
})
//js映射 js压缩后的sourcemap
.option('sourcemap',{
	describe:'force the creation of sourcemaps'
})//强制生成sourcemap
//设置服务器端口
.option('port',{
	string:true,
	default:8080,
	describe:'server port'
})

//对输入的命令行、内容以字符串作为解析
.argv

