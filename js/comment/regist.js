mui.plusReady(function(){
	/*
	 * 1.失去焦点验证
	 */		 
	//验证邮箱是否已被注册	
	$('#userId').on('blur',function(){
		var email=$('#userId').val().trim();
		var remail=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;//判断邮箱		
		if (remail.test(email)) {
			mui.ajax('http://121.42.164.137:8080/weishe/user/UserLoginServlet?method=ajaxValidateEmail',{
				data:{
					email:email
				},			
				type:'GET',
				timeout:10000,
				success:function(data){
					if ("false" == data) {
						mui.toast("该邮箱已被注册！")
					}
					if ("true"==data) {
						getCode();
					}
				},
				error:function(xhr,type,errorThrown){
					
				}
			})
		}		
	})		
	//验证手机号是否被注册
	$('#userId').on('blur',function(){	
		var phone=$('#userId').val().trim();
		var reph = /^[0-9]{0,12}$/;//判断手机号
		if (reph.test(phone)) {
			mui.ajax('http://121.42.164.137:8080/weishe/user/UserLoginServlet?method=ajaxValidateTel',{
			data:{
				tel:phone
			},			
			type:'GET',
			timeout:10000,
			success:function(data){
				if ("false" == data) {
					mui.toast("该手机号已被注册！")
				}
				if ("true"==data) {
					getCode();
				}
			},
			error:function(xhr,type,errorThrown){
				console.log(JSON.stringify(err))
			}
		})
		}		
	})	
	//验证账号
	$('#userId').on('blur',function(){
		var userId=$('#userId').val().trim();
		var phone=$('#userId').val().trim();
		var email=$('#userId').val().trim();		
		var reph = /^[0-9]{0,12}$/;//判断手机号
		var remail=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;//判断邮箱		
		if (!userId) {
			mui.toast("账号不能为空！")
		}else if ((!reph.test(phone))&&(!remail.test(email))) {
			mui.toast("只允许手机号/邮箱！")
		}
	})
	//验证密码
	$('#pwd').on('blur',function(){
		var pwd=$('#pwd').val().trim();
		var repw = /^[\\.a-zA-Z0-9_]{6,}$/;//至少6位密码	
		if (!pwd) {
			mui.toast("密码不能为空！")
		}else if (!repw.test(pwd)) {
			mui.toast("密码输入有误！")
		}
	})
	//验证效验码是否可用
	$('#cCode').on('blur',function(){
		var cCode=$('#cCode').val().trim();
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
				
			}
		})
	})
	//验证真实姓名
	$('#realName').on('blur',function(){
		var realName=$("#realName").val().trim();
		var reName=/[^\w\u4e00-\u9fa5]/g;//非法字符
		if (!realName) {
			mui.toast("姓名不能为空！")
		}else if (reName.test(realName)) {
			mui.toast("姓名含有非法字符！")
		}
	})
	//验证昵称
	$('#name').on('blur',function(){
		var name=$("#name").val().trim();
		var rename=/[^\w\u4e00-\u9fa5]/g;//非法字符
		if (!realName) {
			mui.toast("昵称不能为空！")
		}else if (rename.test(name)) {
			mui.toast("昵称含有非法字符！")
		}
		//验证是否已存在		
		mui.ajax('http://121.42.164.137:8080/weishe/user/UserLoginServlet?method=ajaxValidateName',{
			data:{
				name:name
			},
			type:'GET',
			timeout:10000,
			success:function(data){
				console.log(data);
				if ("false"==data) {
					mui.toast("该昵称已被注册！")
				} else{
					mui.toast("")
				}
			},
			error:function(xhr,type,errorThrown){
				
			}
		})
	})
	//验证date
	$('#birthday').on('blur',function(){
		var birthday=$("#birthday").val().trim();
		var redate=/\d{4}-\d{2}-\d{2}/;//验证日期格式
		if (!redate.test(birthday)) {
			mui.toast("日期格式不正确！")
		}		
	})
	//验证地址
	$('#school').on('blur',function(){
		var school=$("#school").val().trim();
		var reschool=/[^\w\u4e00-\u9fa5]/g;//非法字符
		if (!school) {
			mui.toast("学校不能为空！")
		}else if (reschool.test(school)) {
			mui.toast("学校含有非法字符！")
		}
	})
	/*
	 * 2.初步验证
	 */
				
	//填写基本信息
	$('#registNext').on('click',function(){
		//调用基本信息验证函数
		register();	
		//缓存基本信息
		var userId=document.getElementById("userId");
		var pwd=document.getElementById("pwd");
		var cCode=document.getElementById("cCode");
		plus.storage.setItem('userId',userId.value);
		plus.storage.setItem('pwd',pwd.value);
		plus.storage.setItem('cCode',cCode.value);		
	})
	/*
	 * 3.进一步验证并注册
	 */
	//完善具体信息并注册	
	$('#registInfo').on('click',function(){
		//调用验证函数
		checkInfo();
		//获取缓存信息		
		var userid=plus.storage.getItem('userId');
		var pass=plus.storage.getItem('pwd');
		var code=plus.storage.getItem('cCode');
		console.log("获取缓存值：")
		console.log(userid);
		console.log(pass)
		console.log(code)
		mui.ajax('http://121.42.164.137:8080/weishe/user/UserLoginServlet?method=regist',{
			data:{
				userId:userid,
				pwd:pass,
				cCode:code,
				realName:$("#realName").val().trim(),
				name:$("#name").val().trim(),
				sex:$('input:radio:checked').val(),
				birthday:$("#birthday").val().trim()+' 00:00:00',
				school:$("#school").val().trim()
			},
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			success:function(data){
				console.log(JSON.stringify(data))
				if (data.code == 'success') {
					mui.toast("注册成功！")
					plus.webview.open('../login/login.html')
				}else{
					mui.toast("注册失败！")
				}
			},
			error:function(xhr,type,errorThrown){
//				console.log(JSON.stringify(err))
			}
		});

		
	})	
	/*
	 * 4.功能函数
	 */	
	//基本信息验证
	function register(){
		var userId=$('#userId').val().trim();
		var phone=$('#userId').val().trim();
		var email=$('#userId').val().trim();
		var pwd=$('#pwd').val().trim();
		var cCode=$('#cCode').val().trim();
		var reph=/^[0-9]{11}$/;
		var remail=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
		var repw=/^[\\.a-zA-Z0-9_]{6,}$/;
		if (!userId) {
			mui.toast("账号不能为空！");
		}else if ((!reph.test(phone))&&(!remail.test(email))) {
			mui.toast("只允许手机号/邮箱！")
		}
		if (pwd.length<6) {
			mui.toast("密码不能少于6位！");
			
		} else if(!repw.test(pwd)){
			mui.toast("密码不能含有非法字符！");			
		}
		if(!(email&&cCode&&pwd)){
			mui.toast("请完善注册内容！");
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
						plus.webview.open('registInfo.html');
					}
				},
				error:function(xhr,type,errorThrown){				
				}
			})
			
		}else{
			mui.toast("验证码不能为空！")
		}

	}
	//具体信息验证
	function checkInfo(){
		var realName=$("#realName").val().trim();
		var name=$("#name").val().trim();
		var birthday=$("#birthday").val().trim();	
		var school=$("#school").val().trim();
		var rename=/[^\w\u4e00-\u9fa5]/g;//非法字符
		var redate=/\d{4}-\d{2}-\d{2}/;//验证日期格式
		if (!realName) {
			mui.toast("姓名不能为空！")
		}else if (!name) {
			mui.toast("昵称不能为空！")
		}else if (!birthday) {
			mui.toast("出生日期不能为空！")
		}else if (!school) {
			mui.toast("学校不能为空！")
		}
		if (rename.test(realName)) {
			mui.toast("姓名含有非法字符！")
		}
		if (rename.test(name)) {
			mui.toast("昵称含有非法字符！")
		}
		if (!redate.test(birthday)) {
			mui.toast("日期格式不正确！")
		}
		if (rename.test(school)) {
			mui.toast("学校含有非法字符！")
		}
		
	}
	
	//获取验证码
	function getCode(){
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
	}
	
})
