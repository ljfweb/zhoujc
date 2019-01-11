window.onload=function(){
//-------------------------------引入头部--脚步-------------------------------
	$("#comminHeader").load("header.html","",function(){
		
	})
	$("#commonFooter").load("footer.html","",function(){
		
	})
//-------------------------------轮播图-----------------------------------
	var ul=document.querySelector("#focus ul")
	var lis=document.querySelectorAll("#focus li")
	var btn=document.querySelectorAll(".btn span")
	var index=0;
	var flag=true;
	function time(){
		ul.style.left=-(index*980)+"px"
		ul.style.width=lis.length*980+"px"
		ul.style.transition=""
		for (var i=0;i<btn.length;i++) {
			btn[i].style.opacity="0.2"
		}
		btn[index].style.opacity="1";
		index++;
		if(index==lis.length){
			index=0;
		}
		ul.style.transition="1s"
	}
	var ad=setInterval(time,4000)
	ul.onmouseover=function(){
		if(flag){
			clearInterval(ad);
			flag=false
		}
	}
	ul.onmouseleave=function(){
		flag=true;
		if(flag){
			ad=setInterval(time,4000)
			flag=true;
		}
	}
	for(var n=0;n<btn.length;n++){
		btn[n].index=n;
		btn[n].onmouseover=function(){
			for (var i=0;i<btn.length;i++) {
			btn[i].style.opacity="0.2"
		}
			btn[this.index].style.opacity="1"
			ul.style.left=-(this.index*980)+"px"
			clearInterval(ad);
			index=this.index;
		}
		btn[n].onmouseleave=function(){
			ad=setInterval(time,4000)
		}
	}
	//--------------------------------楼层切换-------------------------------
	var elevator=document.querySelectorAll("#elevator li");
	var floor=document.getElementsByClassName("floor");
	
	window.onscroll=function(){
		var scorollTop=document.body.scrollTop||document.documentElement.scrollTop;
		if(scorollTop>=floor[0].offsetTop){
			document.getElementById("elevator").style.display="block"
		}else{
			document.getElementById("elevator").style.display="none"
		}
	}
	for(var s=0;s<elevator.length-1;s++){
		elevator[s].index=s;
		elevator[s].onclick=function(){
			window.scrollTo(0,floor[this.index].offsetTop+1);
		}
	}
	elevator[5].onclick=function(){
		var timer=setInterval(function(){
			elevator[n].className=""
			flag=false;
			var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
			window.scrollBy(0,-100);
			if(scrollTop<=0){
				clearInterval(timer);
				flag=true;
			}
		},20)
	}
	//-------------------------------数据加载------------
	var list=document.getElementById("hot_new_main");
	ajax("get","list.json","",true,function(res){
		var resarr=JSON.parse(res);
		var str='';
		str='<ul>'
		for(var i=0;i<resarr.length;i++){
			str+='<li class="hot-list">'
					+'<div class="hot-list-wrapper">'
						+'<div class="hot-list-abort pro" pid="'+resarr[i].pid+'">'
							+'<div class="hot-list-img">'
								+'<a href="#">'
									+'<img class="lazy" src="'+resarr[i].imgsrc+'" style="display: inline;" width="180" height="180">'
								+'</a>'
							+'</div>'
							+'<div class="hot-list-name" title="鳄鱼恤时尚男鞋甄选组">'
								+'<a href="#">'
									+'<span>'+resarr[i].pname+'</span>'
								+'</a>'
							+'</div>'
							+'<div class="hot-list-introduction">'
								+'<div>'+resarr[i].tips+'</div>'
							+'</div>'
							+'<div>'
								+'<div class="hot-pro_btn">'
									+'<a href="commodity.html"><span class="add">立即抢购</span></a>'
								+'</div>'
								+'<div class="hot-list-price">'
									+'<span>¥</span><em>'+resarr[i].price+'</em>'
								+'</div>'
							+'</div>'

							+'<div class="hot-list-tag">'
								+'<img src="img/new1.png" alt="新品">'
							+'</div>'
						+'</div>'
					+'</div>'
				+'</li>'
		}
		str+='</ul>'
		list.innerHTML=str;
		//给按钮绑定事件
			var adds=document.getElementsByClassName("add");
			//判断cookie中 是否 有 datas:[]
			var cookie=cookieObj.get("datas");
			if(cookie==undefined){
				cookieObj.set({name:"datas",value:"[]"});
			}
		//显示总数
		document.getElementById("header-cart-total").innerHTML=getTotal();
		var cookiearr=JSON.parse(cookieObj.get("datas"));
		for(var i=0;i<adds.length;i++){
			adds[i].onclick=function(){
							//添加到购物车 把商品信息抽离出来 {"pid":"1001","imgsrc":"food/image01.jpg","pname":"苹果","price":"888","pdes":"iphone88"}
							var obj={};
							var pro=this.parentNode.parentNode.parentNode.parentNode;
							console.log(pro)
							var pid=pro.getAttribute("pid");
							obj.pid=pid;
							obj.imgsrc=pro.children[0].children[0].children[0].getAttribute("src");
							obj.pname=pro.children[1].children[0].children[0].innerHTML;
							obj.tips=pro.children[2].children[0].innerHTML;
							obj.price=pro.children[3].children[1].children[1].innerHTML;
							obj.small=pro.children[0].children[0].children[0].getAttribute("src");
							obj.pcount=1;
							console.log(obj)
							if(checkCookie(pid)){
								//更新pcount
								updateCookie(pid,1);
								
							}else{
							
								//把商品信息的json添加到cookie
								var carr=getAll();
								
								carr.push(obj);
								var cookiestr=JSON.stringify(carr);
								cookieObj.set({name:"datas",value:cookiestr});
							}
							
							//显示总数
							document.getElementById("header-cart-total").innerHTML=getTotal();
						}
		}
	})








}
