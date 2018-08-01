window.onload=function(){
    var aBtn = document.getElementById('btn').children;
    var aImg=document.getElementById('img').children;
    var oPrecide=document.getElementById('precide');
    var oNext=document.getElementById('next');
    var oCarouselBox=document.getElementById('carouselBox');
 
    var now=0;   

  for(var i=0;i<aBtn.length;i++){
    aBtn[i].index=i;
    aBtn[i].onclick=function(){
      now=this.index;    
      tab();
    }
  }

  function tab(){
    for(var f=0;f<aBtn.length;f++){
      aBtn[f].className="";
      aImg[f].style.zIndex=1;
      aImg[f].style.opacity=0.3;
    }
    aBtn[now].className="active";
    aImg[now].style.zIndex=30;
    startMove(aImg[now],{opacity:100});   
  }

  function startMove(object,json,fnEnd){
    clearInterval(object.timer);   
    object.timer=setInterval(function(){
      var tStop=true;        
      for(attr in json){
        var currt=parseFloat(getComputedStyle(object,false)[attr]);
        if(attr=='opacity'){
          currt=Math.round(currt*100);    
        }
        var speed=(json[attr]-currt)/5;
        speed=speed>0 ? Math.ceil(speed) : Math.floor(speed);
        if(json[attr]!=currt){
          var tStop=false;
          if(attr=='opacity'){
            object.style[attr]=(currt+speed)/100;
          }else{
            object.style[attr]=currt+speed+'px';
          }   
        }
        if(tStop){
          clearInterval(object.timer);
          if(fnEnd){
            fnEnd();         
            }
        }     
      }     
    },30);
  }  

  oPrecide.onclick=function(){
    now--;    
    if(now<0){    
      now=aBtn.length-1;
    }
    tab();
  }
  oNext.onclick=function(){
    now++;    
    if(now==aBtn.length){   
      now=0; 
    }
    tab();
  }
  var timer=setInterval(function(){    
    oNext.onclick();
  },5000);
  oCarouselBox.onmouseover=function(){  
    clearInterval(timer);
  }
  oCarouselBox.onmouseout=function(){
    timer=setInterval(function(){    
      oNext.onclick();
    },5000);
  }
  document.onkeydown=function(ev){      
    var oEvent=ev || event;
    if(oEvent.keyCode==37){
      now--;     
      if(now<0){    
        now=aBtn.length-1;
      }
      tab();
    }else  if(oEvent.keyCode==39){
      now++;    
      if(now==aBtn.length){   
        now=0; 
      }
      tab();      
    }
  }
}
  window.onscroll = function(){
    var ht=document.documentElement.scrollTop || document.body.scrollTop; 
    if(ht>400){
      $("#top").css({
        "position":"fixed","top":"0px","margin":"auto","box-shadow":"0 1px 4px #ccc"
      });
    }
    else{$("#top").css({"position":"relative"});}
    }