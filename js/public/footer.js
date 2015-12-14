mui.plusReady(function(){
	var guangchangButton=document.getElementById("guangchangButton");
	var messageButton=document.getElementById("messageButton");
	var popoverMenu=document.getElementById("popoverMenu");
	var joinClub=document.getElementById("joinClub");
	var createClub=document.getElementById("createClub");
	var nearButton=document.getElementById("nearButton");
	var personalButton=document.getElementById("personalButton");
	
	//跳转广场guangchang
	guangchangButton.addEventListener('click',function(){
		mui.openWindow({
			url:'../home/guangchang.html',
			id:'guangchang'
		})
	})
	//跳转消息sendMessage
	messageButton.addEventListener('click',function(){
		mui.openWindow({
			url:'../message/messages.html',
			id:'messages'
		})
	})
	//弹出层
	popoverMenu.addEventListener('click',function(){
		mui('.mui-popover-footer').popover('toggle');
	})
	//跳转加入社团
	joinClub.addEventListener('click',function(){
		mui.openWindow({
			url:'../joinClub/joinClub.html',
			id:'joinClub'
		})
	})
	//跳转创建社团
	createClub.addEventListener('click',function(){
		mui.openWindow({
			url:'../createClub/createClub.html',
			id:'createClub'
		})
	})
	//跳转附近
	nearButton.addEventListener('click',function(){
		mui.openWindow({
			url:'../near/near.html',
			id:'near'
		})
	})
	//跳转个人中心personal
	personalButton.addEventListener('click',function(){
		mui.openWindow({
			url:'../person/personal.html',
			id:'personal'
		})
	})
})