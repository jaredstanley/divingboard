$(document).ready(function(){

initAccelerometer();

addEventListener("touchstart", doTouchStart, false);
addEventListener("touchmove", doTouchMove, false);

function doTouchStart(e){
	e.preventDefault();
	
}

function doTouchMove(e){
	e.preventDefault();
}


});



