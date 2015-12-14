mui.plusReady(function(){
	//写动态
	var writeCompose=document.getElementById("writeCompose");
	var dynamicButton=document.getElementById("dynamicButton");	
	var news1=document.getElementById("news1");
	var news2=document.getElementById("news2");
	var news3=document.getElementById("news3");
	//发说说
	writeCompose.addEventListener('click',function(){
		mui('.mui-popover-write').popover('toggle');
	})
	//跳转我的动态dynamic
	dynamicButton.addEventListener('click',function(){
		mui.openWindow({
			url:'dynamic.html',
			id:'dynamic'
		})
	})
	//跳转具体的消息
	news1.addEventListener('click',function(){
		mui.openWindow({
			url:'news1.html',
			id:'news1'
		})
	})
	
	news2.addEventListener('click',function(){
		mui.openWindow({
			url:'news2.html',
			id:'news2'
		})
	})
	news3.addEventListener('click',function(){
		mui.openWindow({
			url:'news3.html',
			id:'news3'
		})
	})
})