var year=prompt("请输入您的出生年份");
    var month=prompt("请输入您的出生月份");
    var date=prompt("请输入您的出生日期");
    //获取日期为当年的第几天
    function funDay(year,month,date){
    	var sum=0
    	for(var i=1;i<month;i++){
    		console.log(i)
    		sum+=monthDays(year,i);
    	}
    	sum+=date;
    	document.write('您的生日是在'+year+'年的第'+sum+'天！')
    }
    var moreMonth=[1,3,5,7,8,10,12];//31天的月数组
    var lessMonth=[4,6,9,11];//30天的月数组
    //获取当月中的总天数
    function monthDays(year,month){
    	if(ifExistMonth(month,moreMonth)){//当月为31天的月份
    		return 31;
    	}
    	if(ifExistMonth(month,lessMonth)){//当月为30天的月份
    		return 30;
    	}else{//当月为2月份
    		if(ifLeapYear(year)){//当年为闰年
    			return 29;
    		}else{
    			return 28;
    		}
    	}
    }
    //判断当月是否在月数组months中
    function ifExistMonth(month,months){
    	for(var mon=0;mon<months.length;mon++){
    		if(month==months[mon]){
    			return true;
    		}
    	}
    	return false;
    }
    //判断是否为闰年
    function ifLeapYear(year){
    	if(year%100!=0 && year%4==0){
    		return true;
    	} else if(year%400==0){
    		return true;
    	}else{
    		return false;
    	}
    }
	funDay(Math.floor(year),Math.floor(month),Math.floor(date))