mui.plusReady(function(){
	var putongButton=document.getElementById("putongButton");
	var weisheButton=document.getElementById("weisheButton");
	
	//跳转普通社团创建
	putongButton.addEventListener('click',function(){
		mui.openWindow({
			url:'normalClub.html',
			id:'normalClub'
		})
	})
	//跳转微社创建
	weisheButton.addEventListener('click',function(){
		mui.openWindow({
			url:'weisheClub.html',
			id:'weisheClub'
		})
	})
})