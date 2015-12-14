mui.plusReady(function(){
	//写动态
	var writeCompose=document.getElementById("writeCompose");
	var guangchangButton=document.getElementById("guangchangButton");	
	//发说说
	writeCompose.addEventListener('click',function(){
		mui('.mui-popover-write').popover('toggle');
	})
	//跳转我的动态dynamic
	guangchangButton.addEventListener('click',function(){
		mui.openWindow({
			url:'guangchang.html',
			id:'guangchang'
		})
	})
	
})