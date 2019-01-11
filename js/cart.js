window.onload=function(){
	var cartlist=document.querySelector(".vendor-cart");
	var str='';
	var cookie=cookieObj.get("datas");
	
		if(cookie==undefined){
			cookieObj.set({name:"datas",value:"[]"});
		}
		var cookiearr=JSON.parse(cookieObj.get("datas"))
		for(var n=0;n<cookiearr.length;n++){
			document.getElementById("totalNum").innerHTML=getTotal();
			document.getElementById("cart_null").style.display="none"
			str+='<div class="cart_item_list">'
				+'<div class="item_item item_selected clear">'
						+'<div class="item_form">'
							+'<input type="checkbox" class="ck">'
						+'</div>'
						+'<div class="p_goods ">'
								+'<div class="p_img_index">'
									+'<a href="/">'
										+'<img src="'+cookiearr[n].imgsrc+'" width="80" height="80">'
									+'</a>'
								+'</div>'
							+'<div class="p_name">'
								+'<a href="/">'+cookiearr[n].pname+'</a>'
							+'</div>'
						+'</div>'
						+'<div class="p_price">'
							+'<strong>'+cookiearr[n].price+'</strong>'
						+'</div>'
						+'<div class="p_quantity">'
							+'<button class="jian">-</button>'
							+'<input type="text" value="'+cookiearr[n].pcount+'">'
							+'<button class="jia">+</button>'
						+'</div>'
						+'<div class="p_sum">'
							+'<strong class="totalprice">'+cookiearr[n].price*cookiearr[n].pcount+'</strong>'
						+'</div>'
						+'<div class="p_ops">'
							+'<button>删除</button>'
						+'</div>'
					+'</div>'
				+'</div>'
		}
		cartlist.innerHTML=str;
	
	var inps=document.getElementsByTagName("input")
			inps[0].onchange=function(){
				for(var x=0;x<inps.length;x++){
					if(inps[0].checked){
						inps[x].checked=true;
					}else{
						inps[x].checked=false;
					}
				}
			}
	var jia=document.getElementsByClassName("jia");
	var jian=document.getElementsByClassName("jian");
	var sp=document.querySelectorAll(".p_quantity input");
	var ops=document.querySelectorAll(".p_ops button");
	var sum=document.getElementsByClassName("totalprice")
	var price=document.querySelectorAll(".p_price strong");
	for(var i=0;i<jia.length;i++){
				jia[i].ind=i;
				jian[i].ind=i;
				ops[i].ind=i;
				sp[i].ind=i;
				sum[i].ind=i;
				jia[i].onclick=function(){
					sp[this.ind].value++;
					sum[this.ind].innerHTML=price[this.ind].innerHTML*sp[this.ind].value;
					document.querySelector(".cart_footer_price strong").innerHTML=num();
					document.getElementById("totalNum").innerHTML=getTotal();
				}
				jian[i].onclick=function(){
					if(sp[this.ind].value<=1){
						alert("商品数量不能小于1")
					}else{
						sp[this.ind].value--;
						sum[this.ind].innerHTML=price[this.ind].innerHTML*sp[this.ind].value;
					}
					document.querySelector(".cart_footer_price strong").innerHTML=num();
					document.getElementById("totalNum").innerHTML=getTotal();
				}
				ops[i].onclick=function(){
					this.parentNode.parentNode.remove(0);
					document.querySelector(".cart_footer_price strong").innerHTML=num();
					document.getElementById("totalNum").innerHTML=getTotal();
				}
			}
		function num(){
					var s=0;
					var cks=document.getElementsByClassName("ck");
					for (var i=0;i<cks.length;i++) {
						if(cks[i].checked==true){
							s+=Number(sum[i].innerHTML);
						}
					}
					return s;
					
				}
		var cks=document.getElementsByClassName("ck");
		for (var k=0;k<cks.length;k++) {
				cks[k].onchange=function(){
				checkall()
				document.querySelector(".cart_footer_price strong").innerHTML=num();
				}
			}
			var allCheck=document.getElementById("allCheck");
			allCheck.onchange=function(){
				for(var i=0;i<cks.length;i++){
					cks[i].checked=this.checked;
				}
				document.querySelector(".cart_footer_price strong").innerHTML=num();
			}
		function checkall(){
				var flag=true;
				for(var i=0;i<cks.length;i++){
					if(cks[i].checked==false){
						flag=false;
						break;
					}
				}
				if(flag){
					allCheck.checked=true;
				}else{
					allCheck.checked=false;
				}
			}
}
