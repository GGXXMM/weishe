mui.plusReady(function(){	
	var cpage = plus.webview.currentWebview();//获取当前窗口
	var imgurl = cpage.imgurl;//获取图片url地址
	var opener = cpage.opener();//向 opener 窗口写文本 
	
	var $image = $('.img-container > img');
	$image.attr("src",imgurl);
	$image.on('load',function(){
		//设置图片大小比例
		$image.cropper({
			aspectRatio: 1 / 1,
			guides: false,
			dragCrop: false,
			cropBoxMovable: false,
			cropBoxResizable: false
		});
		var ch = $(".mui-content").height();
		var $imgc = $(".img-container");
		var ih =  $imgc.height();
		if (ch>ih) {
			$(".cropper-container").css("height",ch+"px")
			$(".cropper-canvas").css("margin-top", (ch - ih) / 2 + "px");
			$(".cropper-crop-box").css("margin-top", (ch - ih) / 2 + "px");
		} else if(ch<=ih){
			$(".cropper-container").css("height",ih+"px")
			$(".cropper-canvas").css("margin-top", (ch - ih) / 2 + "px");
			$(".cropper-crop-box").css("margin-top", (ch - ih) / 2 + "px");
		}	
	})
	
	//确定保存
	$("#get-result").on("tap", function() {
		var src = $image.eq(0).attr("src");
		var canvasdata = $image.cropper("getCanvasData");
		var cropBoxData = $image.cropper('getCropBoxData');
		convertToData(src, canvasdata, cropBoxData, function(basechar) {  
			mui.fire(opener, "refersh:heaimg", {  
				imgdata : basechar
			})
			mui.back();
		});	  
	})
	//使用canvas绘制图片
	function convertToData(url, canvasdata, cropdata, callback) {
		var cropw = cropdata.width; // 剪切的宽
		var croph = cropdata.height; // 剪切的宽
		var imgw = canvasdata.width; // 图片缩放或则放大后的高
		var imgh = canvasdata.height; // 图片缩放或则放大后的高

		var poleft = canvasdata.left - cropdata.left; // canvas定位图片的左边位置  
		var potop = canvasdata.top - cropdata.top; // canvas定位图片的上边位置    

		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext('2d');

		canvas.width = cropw;
		canvas.height = croph;  

		var img = new Image();
		img.src = url;

		img.onload = function() {
			this.width = imgw;
			this.height = imgh;	
			ctx.drawImage(this, poleft, potop, this.width, this.height);
			var base64 = canvas.toDataURL('image/jpg', 0.8);
			console.log(base64.length/1024 +"kb")
			callback && callback(base64)
		}
	}
	
})