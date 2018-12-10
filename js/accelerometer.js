var x = 0, y = 0,
    vx = 0, vy = 0;

var canvas, bg_canvas; 
var ctx, bg_ctx;
var count = 0;
var bool = 0;
var total = 0;
var scoresArr = [];

function initAccelerometer(){	
	// console.log($('#accelerationY'));
	canvas = document.getElementById("graph");
	canvas.width = 640;
	canvas.height = 960;
	ctx = canvas.getContext('2d');
	//
	bg_canvas = document.getElementById("bg");
	bg_canvas.width = window.innerWidth;
	bg_canvas.height = window.innerHeight;
	bg_ctx = bg_canvas.getContext('2d');


	//

	var moveData = [];
	if (window.DeviceMotionEvent != undefined) {
		window.ondevicemotion = function(e) {
			//ax = event.accelerationIncludingGravity.x * 5;
			//ay = event.accelerationIncludingGravity.y * 5;
				moveData.alpha = parseInt(e.rotationRate.alpha);
				moveData.beta = parseInt(e.rotationRate.beta);
				moveData.gamma = parseInt(e.rotationRate.gamma);
			
			document.getElementById("accelerationX").innerHTML = moveData.alpha;
			document.getElementById("accelerationY").innerHTML = moveData.beta;
			document.getElementById("accelerationZ").innerHTML = moveData.gamma;
			
			if ( e.rotationRate ) {
				moveData.xdeg = parseInt(e.accelerationIncludingGravity.x*10);
				moveData.ydeg = parseInt(e.accelerationIncludingGravity.y*10);
				moveData.zdeg = parseInt(e.accelerationIncludingGravity.z*10);
			
				document.getElementById("rotationAlpha").innerHTML =moveData.xdeg;
				document.getElementById("rotationBeta").innerHTML = moveData.ydeg;
				document.getElementById("rotationGamma").innerHTML =moveData.zdeg;
			}
			document.getElementById("rgb").innerHTML = moveData.rgb;
			
			drawGraph(moveData);
			changeColor(moveData);
			//tick(e);		
			// changeIndicator();
		}

		
	} 

}

function changeColor(d){
	bg_ctx.fillStyle = createRGB(d);
	bg_ctx.fillRect(0, 0,window.innerWidth, window.innerHeight);
	
}


function createRGB(d){
	var numbers = [d.xdeg+90, d.ydeg+90, d.zdeg+90];
	// var numbers = [d.alpha, d.beta, d.gamma];
    var ratio = Math.max.apply(Math, numbers) / 255;

for (var i = 0; i < numbers.length; i++) {
    numbers[i] = Math.abs(Math.round(numbers[i] / ratio));
}

var str = "rgb("+numbers[0]+","+numbers[1]+","+numbers[2]+")";
//console.log(str);
d.rgb = str;
return str;
}
// function tick(e){
// 	count++;
// 	var sum = Math.abs(e.rotationRate.alpha) + Math.abs(e.rotationRate.beta) + Math.abs(e.rotationRate.gamma);
	
// 	total+=parseInt(sum);
	
// 	if(count>30){
// 		count=0;
// 		if(total>700){
// 			scoresArr.push(total);
// 		}else{
// 			scoresArr = [];
// 		}
// 		total = 0;
		
// 		// if(bool == 0){
// 		// 	changeIndicator("#f00");
// 		// 	bool = 1;
// 		// }else{
// 		// 	changeIndicator("00f");
// 		// 	bool = 0;
// 		// }
// 	}
// }

function drawGraph(d){
	ctx.clearRect(10, 0, 550, 550);
	//countIt(scoresArr);
	ctx.fillStyle = "#f0b";
	ctx.fillRect(10, 0,4, Math.abs(d.xdeg));
	ctx.fillRect(30, 0,4, Math.abs(d.ydeg));
	ctx.fillRect(50, 0,4, Math.abs(d.zdeg));
	ctx.fillStyle = "#b0f";
	ctx.fillRect(110, 0,4, Math.abs(d.beta));
	ctx.fillRect(130, 0,4, Math.abs(d.gamma));
	ctx.fillRect(150, 0,4, Math.abs(d.alpha));
}

// function changeIndicator(col){
// 	ctx.fillStyle = col;
// 	ctx.fillRect(170, 0,100, 100);

// }

// function countIt(num){	
//   // ctx.clearRect(10, 200, 100, 100);
//   ctx.lineWidth=1;
//   ctx.fillStyle="#000";
//   ctx.font="12px sans-serif";
//   ctx.fillText("> "+num, 10, 140);



// }

