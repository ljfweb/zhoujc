//--------------------登录验证-------------------
window.onload=function(){
		
		var login=document.getElementById("login");
    		login.onclick=function(){
    			var userval=document.getElementById("username").value;
				var passval=document.getElementById("pwd").value;
				var cookiestr=cookieObj.get("user");
				var cookiearr=JSON.parse(cookiestr);
				if(userval&&passval){
				for(var i=0;i<cookiearr.length;i++){
					
					if(userval==cookiearr[i].user){
						if(cookiearr[i].pass==passval){
							alert("登录成功");
							location.href="index.html";
							return ;
						}else{
							alert("密码错误");
							return ;
						}
					}
				}
				alert("用户名不存在");	
			}else{
				alert("输入用户名密码");
			}
    	}
    	
}
	
