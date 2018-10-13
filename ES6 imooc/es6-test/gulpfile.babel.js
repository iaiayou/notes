//启动gulp后走的第一个文件，需将tasks文件都加载进来，并执行

import requireDir from 'require-dir';

requireDir('./tasks');//引入tasks目录下的所有文件