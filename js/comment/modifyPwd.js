mui.plusReady(function(){
	/*
	 * 1.失去焦点验证
	 */	
	//旧密码验证
	$('#oldPwd').on('blur',function(){
		var $this=$(this);
		var oldPwd=$this.val().trim();
		var repw = /^[\\.a-zA-Z0-9_]{6,}$/;//至少6位密码	
		if (!oldPwd) {
			mui.toast("旧密码不能为空！")
		}else if (!repw.test(oldPwd)) {
			mui.toast("旧密码是6位以上的数字/字母！")
		}
	})
	//新密码验证
	$('#newPwd').on('blur',function(){
		var $this=$(this);
		var newPwd=$this.val().trim();
		var repw = /^[\\.a-zA-Z0-9_]{6,}$/;//至少6位密码	
		if (!newPwd) {
			mui.toast("新密码不能为空！")
		}else if (!repw.test(newPwd)) {
			mui.toast("新密码至少6位以上的数字/字母！")
		}		
	})
	//确认密码验证
	$('#rePwd').on('blur',function(){
		var $this=$(this);
		var rePwd=$this.val().trim();
		var repw = /^[\\.a-zA-Z0-9_]{6,}$/;//至少6位密码	
		if (!rePwd) {
			mui.toast("确认密码不能为空！")
		}else if (rePwd!=$('#newPwd').val()) {
			mui.toast("确认密码和新密码不一致！")
		}
	})	
	/*
	 * 2.修改密码
	 */
	$('#modifyPwd').on('click',function(){
		//调用checkModify函数
		checkModify();
		//获取缓存值
		var userid=localStorage.getItem('userId');
		console.log(userid)
		//进行修改密码
		mui.ajax('http://121.42.164.137:8080/weishe/user/UserServlet?method=updatePwd',{
			data:{
				userId:userid,
				newPwd:$('#newPwd').val().trim(),
				rePwd:$('#rePwd').val().trim(),
				oldPwd:$('#oldPwd').val().trim()
			},
			dataType:'json',
			type:'GET',
			timeout:10000,
			success:function(data){
				console.log("success函数：")			
				if (data.code == 'success') {
					mui.toast("修改密码成功！")
					plus.webview.open('../login/login.html')
				}else{
					mui.toast("修改密码失败！")
				}
			},
			error:function(xhr,type,errorThrown){
				console.log(JSON.stringify(err))
				mui.toast("请求失败！")
			}
		})
	})
	/*
	 * 3.功能函数
	 */
	function checkModify(){
		var oldPwd=$('#oldPwd').val().trim();
		var newPwd=$('#newPwd').val().trim();
		var rePwd=$('#rePwd').val().trim();
		var repw = /^[\\.a-zA-Z0-9_]{6,}$/;//至少6位密码
		if (!oldPwd) {
			mui.toast("旧密码不能为空！")
		}else if (!newPwd) {
			mui.toast("新密码不能为空！")
		}else if(!rePwd){
			mui.toast("确认密码不能为空！")
		}else if (rePwd!=newPwd) {
			mui.toast("确认密码和密码不相同，请重新输入！")
		}else if (!repw.test(oldPwd)) {
			mui.toast("旧密码应为6位数字/字母！")
		}else if (!repw.test(newPwd)) {
			mui.toast("新密码应为6位数字/字母！")
		}
	}
})