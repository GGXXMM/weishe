mui.plusReady(function(){
	var personalMessage1=document.getElementById("personalMessage1");
	var personalMessage2=document.getElementById("personalMessage2");
	var personalMessage3=document.getElementById("personalMessage3");
	var personalMessage4=document.getElementById("personalMessage4");
	var personalMessage5=document.getElementById("personalMessage5");
	var personalMessage6=document.getElementById("personalMessage6");
	var personalMessage7=document.getElementById("personalMessage7");
	//打开相应的子页面
	personalMessage1.addEventListener('click',function(){
		mui.openWindow({
			url:'personMessage1.html',
			id:'personMessage2'
		})
	})
	
	personalMessage2.addEventListener('click',function(){
		mui.openWindow({
			url:'personMessage2.html',
			id:'personMessage2'
		})
	})
	personalMessage3.addEventListener('click',function(){
		mui.openWindow({
			url:'personMessage3.html',
			id:'personMessage3'
		})
	})
	
	personalMessage4.addEventListener('click',function(){
		mui.openWindow({
			url:'personMessage4.html',
			id:'personMessage4'
		})
	})
	personalMessage5.addEventListener('click',function(){
		mui.openWindow({
			url:'personMessage5.html',
			id:'personMessage5'
		})
	})
	
	personalMessage6.addEventListener('click',function(){
		mui.openWindow({
			url:'personMessage6.html',
			id:'personMessage6'
		})
	})
	personalMessage7.addEventListener('click',function(){
		mui.openWindow({
			url:'personMessage7.html',
			id:'personMessage7'
		})
	})

})