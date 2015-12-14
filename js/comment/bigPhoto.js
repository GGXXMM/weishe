mui.plusReady(function(){	
	var changPhoto=document.getElementById("changPhoto");
	var byCamera=document.getElementById("bycamera");
	var byGallery=document.getElementById("bygallery");
	var trigger=document.getElementById("trigger");
	//点击更换头像
	changPhoto.addEventListener('click',function(){
		mui('#getpic').popover('toggle');
	})
	//点击拍照
	byCamera.addEventListener('click',function(){
		mui('#getpic').popover('toggle');
		bycamera();
	})
	//点击相册
	byGallery.addEventListener('click',function(){
		mui('#getpic').popover('toggle');
		bygallery();
	})
	//点击取消
	trigger.addEventListener('click',function(){
		mui('#getpic').popover('toggle');
	})
	//拍照
	function bycamera(){
		var cmr = plus.camera.getCamera();
		var res = cmr.supportedVideoResolutions[0];
		var fmt = cmr.supportedVideoFormats[0];
		cmr.captureImage(function(path) {
			plus.io.resolveLocalFileSystemURL(path, function(entry) {
				var local = entry.toLocalURL();
				cropImg(local);
			});
		})  
	}
	//调相册
	function bygallery() {
		plus.gallery.pick(function(path) {
			cropImg(path);
		}, function(e) {
			mui.toast('选择图片失败' + e)
		}, {
			filter: 'image',
			multiple: false
		})
	}
	// 跳转到另一个页面进行头像的截取选择
	function cropImg(url){
		openWindow("selectImg.html", {
			imgurl : url			
		})
	}
})