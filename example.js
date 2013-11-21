$(document).ready(function(){
	$(".item15").connect($(".item21"), {x:0, y:0}, {x:0, y:0}, {'border-top':'10px solid red'});
	$(".item15").connect($(".item11"), {x:0, y:0}, {x:0, y:0}, {'border-top':'10px solid green'});
	$(".item25").connect($(".item11"), {x:0, y:0}, {x:0, y:0}, {'border-top':'10px solid red'});
	$(".item25").connect($(".item21"), {x:0, y:0}, {x:0, y:0}, {'border-top':'10px solid green'});
	$(".item11").connect($(".item25"), {x:0, y:0}, {x:0, y:0}, {'border-top':'10px solid red'});
	$(".item15").connect($(".item21"), {x:0, y:0}, {x:0, y:0}, {'border-top':'10px solid green'});
	
	$(".box1").connect($(".box2"), {x:0, y:0}, {x:0, y:0}, {'border-top':'5px solid blue'});
	$(".box2").connect($(".box3"), {x:$(".box2").realWidth()/2, y:0}, {x:-$(".box3").realWidth()/2, y:0}, {'border-top':'5px solid orange'});
	$(".box2").connect($(".box4"), {x:0, y:$(".box2").realHeight()/2}, {x:-$(".box4").realWidth()/2, y:0}, {'border-top':'5px solid pink'});
});
