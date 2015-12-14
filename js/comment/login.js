mui.plusReady(function(){
	/*
	 * 1. 失去焦点验证
	 */
	//账号验证
	$('#loginName').on('blur',function(){
		var loginName=$('#loginName').val().trim();
		var phone=$('#loginName').val().trim();
		var email=$('#loginName').val().trim();		
		var reph = /^[0-9]{0,12}$/;//判断手机号
		var remail=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;//判断邮箱		
		if (!loginName) {
			mui.toast("账号不能为空！")
		}else if ((!reph.test(phone))&&(!remail.test(email))) {
			mui.toast("只允许手机号/邮箱！")
		}
	})
	//密码验证
	$('#pwd').on('blur',function(){
		var pwd=$('#pwd').val().trim();
		var repw = /^[\\.a-zA-Z0-9_]{6,}$/;//至少6位密码	
		if (!pwd) {
			mui.toast("密码不能为空！")
		}else if (!repw.test(pwd)) {
			mui.toast("密码至少6位以上的数字/字母！")
		}
	})
	/*
	 * 2.跳转验证
	 */
	var loginButton=document.getElementById("loginButton");
	var registButton=document.getElementById("registButton");
	var findpassword=document.getElementById("findpassword");
	//登陆验证并跳转
	loginButton.addEventListener('click',function(){
		var loginName=document.getElementById("loginName");
		var pwd=document.getElementById("pwd");		
		checkLogin();		
		mui.ajax('http://121.42.164.137:8080/weishe/user/UserLoginServlet?method=login',{			
			//&loginName=986979282@qq.com&pwd=986979282
			data:{
				loginName:loginName.value,
				pwd:pwd.value
			},
			dataType:'json',
			type:'GET',
			timeout:10000,
			success:function(data){				
				//测试json数据
				//if(!$.isPlainObject(data)) return;
				if (data.code=='success') {
					mui.toast("亲，登陆成功哦！")
					//本地缓存账号、密码
					plus.storage.setItem('loginName',loginName.value);
					plus.storage.setItem('pwd',pwd.value);
					plus.webview.open('../home/guangchang.html');
				} else{
					mui.toast("账号/密码输入有误！")
				}
			},
			error:function(xhr,type,errorThrown){
				//异常处理
				mui.toast("登陆失败！")
			}
		})	
	})		
	//跳转注册
	registButton.addEventListener('click',function(){
		mui.openWindow({
			url:'../regist/regist.html',
			id:'regist'
		})
	})	
	//跳转忘记密码
	findpassword.addEventListener('click',function(){
		mui.openWindow({
			url:'findpassword.html',
			id:'findpassword'
		})
	})
	/*
	 * 3.功能函数
	 */
	//登陆验证函数
	function checkLogin(){
		var loginName=$("#loginName").val().trim();
		var pwd=$("#pwd").val().trim();
		var reph = /^[0-9]{0,12}$/;//判断手机号
		var remail=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;//判断邮箱
		var repw = /^[\\.a-zA-Z0-9_]{6,}$/;//至少6位密码
		var flag=true;
		if (!loginName) {
			mui.toast('账号不能为空！');
			return;
		} else if (!pwd) {
			mui.toast('密码不能为空！');
			return;
		} else if (pwd && loginName) {
			if ((!reph.test(loginName))&&(!remail.test(loginName))) {
				flag = false;
				mui.toast("账号输入有误！");
				return;
			}
			if (!repw.test(pwd)) {
				flag = false;
				mui.toast("密码输入有误！");
				$('#pwd').val('');
			}
		}
	}
})