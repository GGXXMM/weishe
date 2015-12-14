mui.plusReady(function(){
	var modifyPwd=document.getElementById("modifyPwd");
	modifyPwd.addEventListener('click',function(){
		mui.openWindow({
			url:'modifyPwd.html',
			id:'modifyPwd'
		})
	})
	
	//关于微社
	$('#about-us').on('tap',function(){
		plus.webview.open('about.html')
	})
	//查看本机信息
	function checkMachine(){
		mui.toast('本机机型'+plus.device.vendor+"屏幕分辨率"+plus.screen.resolutionHeight*plus.screen.scale);
	}  
	$('#machine_info').on('tap',function(){
		checkMachine();
	})
	//声音（开关）
	function sound(){
		var status=$('#sound_action').hasClass('mui-active');
		if(status){
			plus.device.beep(1);
		}
	}
	$('#sound_switch').on('tap',function(){
		sound()
	})
	//震动（开关）
	function vabrite(){
		var status=$('#vibrate_action').hasClass('mui-active');
		if(status){
			plus.device.vibrate(1000);
		}
	}
	$('#vibrate_switch').on('tap',function(){
		vabrite();
	})
})