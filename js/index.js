$(function(){
	var down=$(".down");
	var my=$("#my");
	var footer=$("#my #footer");
	console.log(footer)
	down.on("touchend",function(){
		my.css("display","block");
	})
	footer.on("touchend",function(){
		my.css("display","none");
	});
	var list=$(".tan");
	var song=$("#song");
	var close=$(".close");
	list.on("touchend",function(){
		song.css("display","block");
	});
	close.on("touchend",function(){
		song.css("display","none");
	});
	var san=$(".san");
	var list_san=$("#list");
	var quxiao=$(".quxiao");
	san.on("touchend",function(){
		list_san.css("display","block");
	});
	quxiao.on("touchend",function(){
		list_san.css("display","none");
	});
	
		   function format(v){
		v=Math.floor(v);
		var s=v%60;
		s=(s<10)?('0'+s):s;
		var m=Math.floor(v/60);
		return m+':'+s;
	}
	    var play=$(".play");
	    var process=$(".process");
	    var width1=process.width();
	    var pi=$(".p-i");
	    pi.css("left",-pi.width()/2);
		var current=$(".current");
		var duration=$(".duration");
		$(audio).on("canplay",function(){
			duration.html(format(audio.duration));
		})
	
		var audio=$("#audio").get(0);
	   	play.on("click",function(){
			if(audio.paused){
				audio.play();
				$(this).find("a").html("&#xe602;");
			}else{
				audio.pause();
				$(this).find("a").html("&#xe783;");
			}	
		})

	   $(audio).on("timeupdate",function(){
		current.html(format(audio.currentTime));
		var left=process.width() * audio.currentTime/audio.duration;
		var r=pi.width()/2;
		pi.css("left",left-r);
		})
		
		var vol=$("#volume");
		var vi=$("#v-i");

/*进度条*/
	pi.on("touchend",false);
	process.on("touchend",function(e){
		var offsetX=e.originalEvent.changedTouches[0].clientX-
					process.position().left;
		audio.currentTime=offsetX/width1*audio.duration;
	})
	pi.on("touchstart",function(e){
		var offsetX=e.originalEvent.changedTouches[0].clientX-pi.position().left;
		var start=pi.width()/2-offsetX;
		$(document).on("touchmove",function(e){
			var left=e.originalEvent.changedTouches[0].clientX+start;
			var c=left/process.width()*audio.duration;
			if(c>=process.width()||c<=0){
				return;
			}
			audio.currentTime=c;
		});
		return false;
	});
	pi.on("touchend",function(){
		$(document).off("touchmove");
	})
	/*进度条*/
	$(audio).on("volumechange",function(e){
		vi.css("left",vol.width()* audio.volume - vi.width()/2 )
	})
/*歌曲列表*/
	var currentIndex;//表示当前歌曲
	var musics=[
		{name:"逆流成河",author:"金南铃",state:"0",src:"逆流成河-金南玲-1772409519-1.mp3"
		},
		{name:"其实都没有",author:"杨宗纬",state:"0",src:"其实都没有-杨宗纬-1771734083-0.mp3"
		},
		{name:"You Are Beautiful",author:"胡彦斌",state:"0",src:"You Are Beautiful.mp3",
		},
	];
	var ul1=$("#song ul");
	var t=$(".t");//下面歌词名
	var b=$(".b");//下面作者名
	function render(){
		ul1.empty();
		$.each(musics,function(i,v){
			if(i==currentIndex){
				s="active";
			}else{
				s="";
			}
		$('<li><div class="song">"'+v.name+'"</div><div class="jie iconfont">&#xe649;</div><div class="delete iconfont">&#xe619;</div></li>').appendTo(ul1);
		});
	}
	render();
	ul1.on("touchend","li",function(e){
		$(this).find("a").html("&#xe602;");
		currentIndex=$(this).index();
		t.html(musics[currentIndex].name);
		b.html(musics[currentIndex].author);
		audio.src=musics[currentIndex].src;
		audio.play();
		render();
		return false;
	})
	
	/*切换歌曲*/
	$(".pre").on("touchend",function(){
		console.log($(this))
		$(".play").find("a").html("&#xe602;");
		if(currentIndex==undefined){
			currentIndex=musics.length-1;
		}else{
			currentIndex--;
			if(currentIndex<0){
				currentIndex=musics.length-1;
			}
		}
		t.html(musics[currentIndex].name);
		b.html(musics[currentIndex].author);
		audio.src=musics[currentIndex].src;
		audio.play();
		render();
	});
	$(".next").on("touchend",function(){
		$(".play").find("a").html("&#xe602;");
		if(currentIndex==undefined){
			currentIndex=0;
		}else{
			currentIndex++;
			if(currentIndex>=musics.length){
				currentIndex=0;
			}
		}
		t.html(musics[currentIndex].name);
		b.html(musics[currentIndex].author);
		audio.src=musics[currentIndex].src;
		audio.play();
		render();
	});	
	/*切换歌曲*/
})
