mui.plusReady(function(){
	$('.mui-title').on('click',function(){
		$('.downMenu').toggle();
	})
	
	var personMessage=document.getElementById("personMessage");
	var commentButton=document.getElementById("comment");
	var praise=document.getElementById("praise");
	var clubMessage1=document.getElementById("clubMessage1");
	var clubMessage2=document.getElementById("clubMessage2");
	var clubMessage3=document.getElementById("clubMessage3");
	var clubMessage4=document.getElementById("clubMessage4");
	//跳转私信
	personMessage.addEventListener('click',function(){
		mui.openWindow({
			url:'messageList.html',
			id:'messageList'
		})
	})
	//跳转评论
	commentButton.addEventListener('click',function(){
		mui.openWindow({
			url:'comment.html',
			id:'comment'
		})
	})
	//跳转赞
	praise.addEventListener('click',function(){
		mui.openWindow({
			url:'praise.html',
			id:'praise'
		})
	})
	//具体信息列表查看
	clubMessage1.addEventListener('click',function(){
		mui.openWindow({
			url:'clubMessages1.html',
			id:'clubMessages1'
		})
	})
	clubMessage2.addEventListener('click',function(){
		mui.openWindow({
			url:'clubMessages2.html',
			id:'clubMessages2'
		})
	})
	clubMessage3.addEventListener('click',function(){
		mui.openWindow({
			url:'clubMessages3.html',
			id:'clubMessages3'
		})
	})
	clubMessage4.addEventListener('click',function(){
		mui.openWindow({
			url:'clubMessages4.html',
			id:'clubMessages4'
		})
	})
})