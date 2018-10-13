//bind方法模拟
if(!Function.prototype.binda){
	Function.prototype.binda = function(oThis){
		if(typeof this!=='function'){
			throw new TypeError('What is trying to be bound is not callable');
		}
		console.log(oThis)
		console.log(this)
		console.log(arguments)
		console.log(Array.prototype.slice.call(arguments,1))
		var aArgs = Array.prototype.slice.call(arguments,1),
			fToBind = this,
			fNOP = function (){},
			fBound = function(){
				console.log(Array.prototype.slice.call(arguments))
				return fToBind.apply(this instanceof fNOP?this:oThis,
					aArgs.concat(Array.prototype.slice.call(arguments)));
			};
		fNOP.prototype = this.prototype;
		fBound.prototype = new fNOP();
		return fBound;
	};
}

function foo(){
	this.b=100;
	return this.a;
}
var func = foo.binda({a:1});
console.log(func())
console.log(new func())


//封装require
function run(context){
	(function(module){
		function add(a,b){
			return a+b;
		}
		module.exports = add;
	})(context)
}

//运算符优先级
var person={};
Object.defineProperties(person,{
	salary:{value:5000,enumerable:true,writable:true},
	promote:{
		set:function(level){
			this.salary*=1+level*0.1;
		}
	}
})
person.salary;
person.promote=2;
person.salary;

//基于原型创建对象
function Person(name,age){
	this.name = name;
	this.age = age;
}
Person.prototype.hi = function(){
	console.log('person+name:'+this.name+'+age:'+this.age)
}
function Student(name,age,classname){
	Person.call(this,name,age);
	this.classname = classname;
}
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Person;
Student.prototype.hi = function(){
	console.log('student+name:'+this.name+'+age:'+this.age+'+classname:'+this.classname)
}
var bosn = new Student('Bosn',27,'Class3 Grade2');
bosn.hi();