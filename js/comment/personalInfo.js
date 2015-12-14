mui.plusReady(function(){
	var photo=document.getElementById("photo");
	photo.addEventListener('click',function(){
		//查看大头像
		mui.openWindow({
			url:'bigPhoto.html',
			id:'bigPhoto'
		})
	})
})