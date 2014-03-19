$(document).ready(function(){
	$(".item25").connect($(".box").not(".multibox"), {"border":"solid 2px #f00"}, 'direct', 0);
	$(".item11").connect($(".item23"), {"border":"solid 2px #0f0"}, 'indirect', 0.5);
	$(".item12").connect($(".item24"), {"border":"solid 2px #0f0"}, 'indirect', 0.49);
});
