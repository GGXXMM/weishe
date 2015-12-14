mui.plusReady(function(){
	var infoButton=document.getElementById("infoButton");	
	var myJoinClub=document.getElementById("myJoinClub");
	var myCreateClub=document.getElementById("myCreateClub");
	var myDynamic=document.getElementById("myDynamic");
	var install=document.getElementById("install");
	var backLogin=document.getElementById("backLogin");
	//跳转info
	infoButton.addEventListener('click',function(){
		mui.openWindow({
			url:'personalInfo.html',
			id:'personalInfo'
		})
	})
	//跳转myJoinClub
	myJoinClub.addEventListener('click',function(){
		mui.openWindow({
			url:'my-JoinClub.html',
			id:'myJoinClub'
		})
	})
	//跳转myCreateClub
	myCreateClub.addEventListener('click',function(){
		mui.openWindow({
			url:'my-createClub.html',
			id:'myCreateClub'
		})
	})
	//跳转my-dynamic
	myDynamic.addEventListener('click',function(){
		mui.openWindow({
			url:'my-dynamic.html',
			id:'my-dynamic'
		})
	})
	//跳转install
	install.addEventListener('click',function(){
		mui.openWindow({
			url:'install.html',
			id:'install'
		})
	})
	//退出当前账号
	backLogin.addEventListener('click',function(){
		mui.openWindow({
			url:'../login/login.html',
			id:'login'			
		})
	})
})