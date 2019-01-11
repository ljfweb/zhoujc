

//		method--提交方式
//      url---提交地址
//      data--发送的数据
//      async--是否异步
//      success--成功回调函数 

		function ajax(method,url,data,async,success){
			//1.创建对象
			var xhr=null;
			try{
				xhr=new XMLHttpRequest();
			}catch(e){
				xhr=new ActiveXObject("Microsoft.XMLHTTP");
			}
			//open方法
			if(method=="get"){
				url+="?"+data;
			}
			xhr.open(method,url,async);
			//send()方法
			
			if(method=="get"){
				xhr.send();
			}else{
				//设置请求头
				xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
				xhr.send(data)
			}
			
			xhr.onreadystatechange=function(){
				if(xhr.status==200&&xhr.readyState==4){
					
//					xhr.responseText--返回数据
					
					success(xhr.responseText)
				}
			}

	}
		
	
