$(function(){
	var xzqhDM = document.getElementById('xzqhDM');//获取存储行政区划代码的DOM

	//jsonp实现跨域
	var callback_success = function(data){
		console.log(111)
		console.log(data)
	}
	$.ajax({
		url:'/bd-czsb/home/getIncomeAndExpend?'+Math.random(),
		type:'get',
		dataType:'jsonp',
		jsonp:'callback',//参数名
		jsonpCallback:'callback_success',//参数值即返回函数名
		data:{
			'xzqhDM':xzqhDM.value
		}
		,
		success:function(data){
			// data为返回callback_success函数中的参数data数据
			console.log(data)
			if(data!=undefined && data.error==undefined){
				$('.income').text(data.income.trim())
				$('.expend').text(data.expend.trim())
				$('.surplus').text(data.surplus.trim())
			}else{
				alert('收入支出数据加载失败！')
			}
		}
	})

	
})
