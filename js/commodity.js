window.onload=function(){
$("#category-block .b").hide()
$("#category-block").hover(function(){
	$("#category-block .b").show();
},function(){
	$("#category-block .b").hide();
})
//--------------------加载商品-------------------
	var cookie=cookieObj.get("datas");
	if(cookie==undefined){
		cookieObj.set({name:"datas",value:"[]"});
	}
	var cookiearr=JSON.parse(cookieObj.get("datas"));
	var small=document.querySelector(".thumb ul");
	var str='';
	for (var n=0;n<cookiearr.length;n++) {
		document.getElementById("pid").innerHTML=cookiearr[n].pid;
		document.querySelector(".picture img").src=cookiearr[n].imgsrc;
		document.querySelector(".pro_name h1").innerHTML=cookiearr[n].pname;
		document.querySelector(".pro_name p").innerHTML=cookiearr[n].tips;
		document.querySelector(".pro_price b").innerHTML=cookiearr[n].price;
		cookiearr[n].pcount=document.getElementById("sum").value;
		str='<li><img src="'+cookiearr[n].small+'" /></li>'
		small.innerHTML=str;
		
	}
//--------------------放大镜----------------
	$(".picture").mouseenter(function(){
		$(".big_picture").show();
		$(".mask").show();
		$(this).mousemove(function(e){
			var e=e||window.event;
			var x=e.clientX-$(".picture").offset().left-$(".mask").outerWidth()/2;
			var y=e.clientY+$(window).scrollTop()-$(".picture").offset().top-$(".mask").outerHeight()/2;
			if(x<=0){
					x=0;
				}else if(x>=$(".picture").outerWidth()-$(".mask").outerWidth()){
					x=$(".picture").outerWidth()-$(".mask").outerWidth();
				}
				
				if(y<=0){
					y=0;
				}else if(y>=$(".picture").outerHeight()-$(".mask").outerHeight()){
					y=$(".picture").outerHeight()-$(".mask").outerHeight();
				}
				
				$(".mask").css("top",y+"px");
				$(".mask").css("left",x+"px");
				
				$(".big_picture").scrollLeft(x*$(".big_picture img").outerWidth()/$(".picture").outerWidth());
				$(".big_picture").scrollTop(y*$(".big_picture img").outerHeight()/$(".picture").outerHeight());
		})
		$(this).mouseleave(function(){
			$(".big_picture").hide();
			$(".mask").hide();
		})
	
	})
	
	var bigimg=document.querySelector(".picture img")
	var smallimg=document.querySelectorAll(".thumb ul img ")
	var magnify=document.querySelector(".big_picture img")
	for(var i=0;i<smallimg.length;i++){
		smallimg[i].onmouseenter=function(){
			bigimg.src=this.src;
			magnify.src=this.src;
			console.log(magnify)
		}
	}
	
	//--------------------------商品数量------------------
	$(".pro_qty input").eq(0).click(function(){
		var x=$(".pro_qty input").eq(1).val();
		if(x>1){
			x--;
		}else{
			alert("数量不能小于1")
		}
		$(".pro_qty input").eq(1).val(x);
	})
	$(".pro_qty input").eq(2).click(function(){
		var x=$(".pro_qty input").eq(1).val();
			x++;
		$(".pro_qty input").eq(1).val(x);
	})
	//--------------------------详情的tab切换-------------
	$(".prodetail li").each(function(index,ele){
		$(this).click(function(){
			$(".prodetail_wrap div").eq(index).addClass("block").siblings().removeClass("block");
		})
	})
	
	




}
