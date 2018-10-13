parentArr=[];
childArr=[];
for(var i=0;i<fbdataArray.length;i++){
if(fbdataArray[i].xm_pardm.length == 0){
	fbdataArray[i].children = [];
	parentArr.push(fbdataArray[i]);
}else{
	childArr.push(fbdataArray[i]);
}
}

function findChildren(parent,childrens){
console.log(parent)
console.log(parent.data_id)
console.log(childrens)
for(var n=0;n<childrens.length;n++){
	if(childrens[n].xm_pardm == parent.data_id){
		parent.children = parent.children!=null &&parent.children.length>0 ?parent.children:[];
		parent.children.push(childrens[n]);
//            						var children_new=[];
		var parentli = childrens[n];
		var childrensNew = childrens;
		childrensNew.splice(childrensNew.indexOf(parentli),1);
		if(childrensNew!=null &&　childrensNew.length>0){
			findChildren(parentli,childrensNew);
		}
	}
}
}
for(var m=0;m<parentArr.length;m++){
findChildren(parentArr[m],childArr);
console.log(parentArr[m])
}