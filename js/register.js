window.onload=function(){
//--------------------------正则判断---------------------------
	var inpus=document.querySelectorAll("#login-user-form input")
	var sp=document.querySelectorAll("#login-user-form p")
	inpus[0].onblur=function(){
		var reg=/^[1]\d{10}$/;
		if(this.value==""){
			sp[0].innerHTML="请输入内容";
			sp[0].style.color="red";
		}else{
				if(reg.test(this.value)){
				sp[0].innerHTML="√";
				sp[0].style.color="green";
			}else{
				sp[0].innerHTML="请输入正确的手机号码";
				sp[0].style.color="red";
			}
		}
		
	}
	inpus[1].onblur=function(){
		var reg=/^[0-9a-zA-Z]{6,20}$/;
		if(this.value==""){
			sp[1].innerHTML="请输入内容";
			sp[1].style.color="red";
		}else{
			if(reg.test(this.value)){
				sp[1].innerHTML="√";
				sp[1].style.color="green";
			}else{
				sp[1].innerHTML="密码长度只能在6-20位字符之间";
				sp[1].style.color="red";
			}
		}
	}
	inpus[2].onblur=function(){
		var reg=/^[0-9a-zA-Z]{6,20}$/;
		if(this.value==""){
			sp[2].innerHTML="请输入内容";
			sp[2].style.color="red";
		}else{
			if(this.value==inpus[1].value&&reg.test(this.value)){
				sp[2].innerHTML="√";
				sp[2].style.color="green";
			}else{
				sp[2].innerHTML="输入密码不一致";
				sp[2].style.color="red";
			}
		}	
	}
	
	
		function makeCode(){
			codes="";
			var arr=["1","2","3","a","b","c","A","B","C"];
			for(var i=0;i<4;i++){
				var index=parseInt(Math.random()*arr.length);
				codes+=arr[index];
			}
			return codes;
		}
		var verCode=document.getElementById("verificationCode");
		verCode.innerHTML=makeCode();
		verCode.onclick=function(){
			this.innerHTML=makeCode();
		}
	inpus[3].onblur=function(){
		if(this.value==""){
			sp[3].innerHTML="请输入内容";
			sp[3].style.color="red";
		}else{
			if(this.value.toLocaleLowerCase()==verCode.innerHTML.toLocaleLowerCase()){
				sp[3].innerHTML="√";
				sp[3].style.color="green";
			}else{
				sp[3].innerHTML="验证码错误";
				sp[3].style.color="red";
			}
		}
	}
	
	var Code=document.getElementById("getCodeBtn");
	var str=""
	Code.onclick=function(){
		
		str=makeCode()
		alert("验证码:"+str)
	}
	inpus[4].onblur=function(){
		var reg=/^[0-9a-zA-Z]{6,20}$/;
		if(this.value==""){
			sp[4].innerHTML="请输入内容";
			sp[4].style.color="red";
		}else{
			if(this.value.toLocaleLowerCase()==str.toLocaleLowerCase()){
				sp[4].innerHTML="√";
				sp[4].style.color="green";
			}else{
				sp[4].innerHTML="验证码错误";
				sp[4].style.color="red";
			}
		}	
	}
	var reg=document.getElementById("regbtn")
	
	reg.onclick=function(){
		var flag=true;
		var userval=inpus[0].value;
		var passval=inpus[1].value;
		for(var x=0;x<sp.length;x++){
			if(sp[x].innerHTML!="√"){
				flag=false;
			}
		}
		if(flag){
			if(cookieObj.get("user")==undefined){
			cookieObj.set({name:"user",value:"[]"});
			}
			if(userval&&passval){
				var userstr=cookieObj.get("user");
				var userarr=JSON.parse(userstr);
				for(var i=0;i<userarr.length;i++){
					if(userarr[i].user==userval){
						alert("用户名已存在");
						return 
					}
			}
			userarr.push({user:userval,pass:passval});
			var newstr=JSON.stringify(userarr);
			cookieObj.set({name:"user",value:newstr});
			alert("注册成功");
		}else{
			alert("请正确填写信息");
		}
	}else{
		alert("请正确填写信息");
	}
	}
	
}
