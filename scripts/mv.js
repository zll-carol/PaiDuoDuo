function move(obj,json,fnEnd){				
				clearInterval(obj.timer);			
				obj.timer = setInterval(function(){
						var bStop = true;	//由于会出现一个属性运行完，就关闭了定时器，导致其他的属性无法正常运行，所以在对所有属性循环开始前就声明一个布尔变量，规定其为true，即默认所有的属性都已运行完。	
						for(attr in json){		//对json进行遍历，所有的内容在
						var curr = parseFloat(getComputedStyle(obj,false)[attr]);
						if(attr == 'opacity'){
							curr = Math.round(curr*100);
						}
					var speed = (json[attr] - curr)/3;
						speed = speed >0 ? Math.ceil(speed) : Math.floor(speed);
						if(json[attr] != curr){			//判断，如果json里有属性不等于目前的值，定时器就不能关闭，需要继续循环。直到所有的属性都执行完。
							bStop = false;
							if(attr == 'opacity'){
								obj.style[attr] = (curr +　speed)/100;
							}else{
								obj.style[attr] = curr + speed + 'px';
							}	
						}
					}	
					if(bStop){						
					clearInterval(obj.timer); //判断，如果所有的属性都运行完了，就关掉定时器
					if(fnEnd){				//一个属性执行完后，接着执行下一个函数，
							fnEnd();
						}
					}	
				},30);
				
	}	

