mui.plusReady(function(){
	var userId=document.getElementById("userId");
	/*
	 * 1.失去焦点验证
	 */
	//账号验证
	$('#userId').on('blur',function(){
		var userId=$('#userId').val().trim();
		var phone=$('#userId').val().trim();
		var email=$('#userId').val().trim();
		var reph=/^[0-9]{11}$/;
		var remail=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
		if (!userId) {
			mui.toast("账号不能为空！")
		}else if ((!reph.test(phone))&&(!remail.test(email))) {
			mui.toast("只允许手机号/邮箱！")
			
		}
	})
	//验证码验证
	$('#cCode').on('blur',function(){
		//判空
		var cCode=$('#cCode').val().trim();
		if (!cCode) {
			mui.toast("验证码不能为空！")
		}
		//验证码是否一致		
		mui.ajax('http://121.42.164.137:8080/weishe/user/UserLoginServlet?method=ajaxValidateCheckCode',{
			data:{
				cCode:cCode
			},			
			type:'GET',
			timeout:10000,
			success:function(data){
				if ("false" == data) {
					mui.toast("验证码不正确，请重新输入！")
				}
			},
			error:function(xhr,type,errorThrown){	
				console.log(JSON.stringify(err))
			}
		})
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
	//点击获取验证码	
	var time=60;
	var timer=null;
	$('#getCode').on('click',function(){
		var $this=$(this);
		var phone=$('#userId').val();
		var email=$('#userId').val();
		var reph=/^[0-9]{11}$/;
		var remail=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
		if ((!reph.test(phone))&&(!remail.test(email))) {
			mui.toast("请输入有效的账号！")
		} else{
			//设置定时器，60--
			clearInterval(timer);
			timer=setInterval(function(){
				if (time!=0) {
					$this.html((time--) + "s");					
				} else{
					$this.attr('disabled',false);
					$this.html("重新发送")
				}
			},1000)
			$this.attr('disabled',true);
			//check验证码是否存在
			mui.ajax('http://121.42.164.137:8080/weishe/user/UserLoginServlet?method=sendCheckCode',{
				data:{
					tel:phone,
					email:email
				},
				dataType:'json',
				type:'GET',
				timeout:10000,
				success:function(data){
					mui.toast("请求发送成功！");
				},
				error:function(xhr,type,errorThrown){
					$this.attr('disabled',false);
					clearInterval(timer);
					$this.html("重新发送")
				}
				
			})
		}		
	})
	//提交验证码，进入修改密码
	$('#resetPassword').on('click',function(){
		//调用checkModify函数
		checkModify();
		//缓存账号
		localStorage.setItem('userId',userId.value);
	})
	/*
	 * 3.重置密码
	 */	
	$('#backButton').on('click',function(){
		//调用验证新密码函数
		checkNewpass();
		//获取缓存值
		var userid=localStorage.getItem('userId');
		console.log(userid)	
		//调用修改密码函数
		mui.ajax('http://121.42.164.137:8080/weishe/user/UserLoginServlet?method=findPwd',{
			data:{
				tel:userid,
				email:userid,
				newPwd:$('#newPwd').val().trim(),
				rePwd:$('#rePwd').val().trim()			
			},
			dataType:'json',
			type:'GET',
			timeout:10000,
			success:function(data){
				console.log(JSON.stringify(data))
				if (data.code=="success") {
					mui.toast("密码重置成功！")
					plus.webview.open('login.html');
				}else{
					mui.toast("密码重置失败！")
				}	
			},
			error:function(xhr,type,errorThrown){
				mui.toast("请求失败！")
			}
		})
	})		
	/*
	 * 4.功能函数
	 */
	//验证账号和验证码
	function checkModify(){
		var userId=$('#userId').val().trim();
		var phone=$('#userId').val().trim();
		var email=$('#userId').val().trim();
		var cCode=$('#cCode').val().trim();
		var reph=/^[0-9]{11}$/;
		var remail=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
		if (!userId) {
			mui.toast("账号不能为空！")
		}else if ((!reph.test(phone))&&(!remail.test(email))) {
			mui.toast("只允许手机号/邮箱！")
		}
		if (cCode) {
			mui.ajax('http://121.42.164.137:8080/weishe/user/UserLoginServlet?method=ajaxValidateCheckCode',{
				data:{
					cCode:cCode
				},			
				type:'GET',
				timeout:10000,
				success:function(data){
					if ("false" == data) {
						mui.toast("验证码不正确，请重新输入！")
					}else if("true" == data){
						plus.webview.open('resetpassword.html');
					}
				},
				error:function(xhr,type,errorThrown){				
				}
			})
		}else{
			mui.toast("验证码不能为空！")
		}
	}
	//验证新密码函数
	function checkNewpass(){		
		var newPwd=$('#newPwd').val().trim();
		var rePwd=$('#rePwd').val().trim();
		var repw = /^[\\.a-zA-Z0-9_]{6,}$/;//至少6位密码
		if (!newPwd) {
			mui.toast("新密码不能为空！")
		}else if(!rePwd){
			mui.toast("确认密码不能为空！")
		}else if (rePwd!=newPwd) {
			mui.toast("确认密码和密码不相同，请重新输入！")
		}else if (!repw.test(newPwd)) {
			mui.toast("密码至少为6位！")
		}
	}
	
})
