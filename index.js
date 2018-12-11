// import utils from './utils';
// import PhoneMotion from './phoneMotion';
// import imgList from './myjsonfile';
// import { writeFile } from 'fs-web';
/*

*/
var _App = {
//
config:{
  xoffset:180,
  yoffset:0,
  zoffset:0,
  curDeg:{
    x:40,y:40,z:40
  },
  curAcl:{
    alpha:0,beta:0,gamma:0,
    alphaMax:0,betaMax:0,gammaMax:0
  },
  curClr:"none"
},
init: function(){
    this.ang=1;
    _App.setup();

  },
  setup:function(){
    _App.addEvents();
    _App.connectCanvas();
    _App.resize();
    _App.draw();
  },
  addEvents:function(){
    window.addEventListener('resize', _App.resize, false);
    window.addEventListener('orientationchange', _App.resize, false);
    window.addEventListener('deviceorientation', function(e) {
       _App.config.curDeg.x = parseInt((e.beta+180)+_App.config.xoffset)%360;
       _App.config.curDeg.y = parseInt((e.gamma+90)+_App.config.yoffset)%360;
       _App.config.curDeg.z = parseInt(e.alpha+_App.config.zoffset)%360;
    });

    window.addEventListener('devicemotion', function(e){
      let c = _App.config.curAcl;
          c.beta = Math.abs(parseInt(e.rotationRate.beta));
          c.gamma = Math.abs(parseInt(e.rotationRate.gamma));
          c.alpha = Math.abs(parseInt(e.rotationRate.alpha));
      if(c.betaMax < parseInt(e.rotationRate.beta)){
          c.betaMax  = parseInt(e.rotationRate.beta);
      }
      if(c.gammaMax < parseInt(e.rotationRate.gamma)){
          c.gammaMax  = parseInt(e.rotationRate.gamma);
      }
      if(c.alphaMax < parseInt(e.rotationRate.alpha)){
          c.alphaMax  = parseInt(e.rotationRate.alpha);
      }

    });

    document.body.addEventListener("touchmove", function(event) { event.preventDefault();    event.stopPropagation();}, false);

  },
  connectCanvas:function(){
    console.log("connectCanvas");
    _App.mainCanvas = document.getElementById("gameCanvas");
    _App.mainCtx = _App.mainCanvas.getContext("2d");
    _App.bgCanvas = document.getElementById("bgCanvas");
    _App.bgCtx = _App.bgCanvas.getContext("2d");
  },
  update:function(){
    // console.log("update");
    //
    _App.mainCtx.clearRect(0,0,_App.mainCanvas.width, _App.mainCanvas.height)
    // _App.mainCtx.fillStyle = _App.config.curClr;
    // _App.mainCtx.rect(0,0,_App.mainCanvas.width, _App.mainCanvas.height);
    // _App.mainCtx.fill();
    //
    //draw wave
    _App.mainCtx.fillStyle = _App.mainCtx.strokeStyle="#e0ffff";
    _App.mainCtx.lineWidth=2;
    let count = 33;

    let amp = 4;
    let speed = 0.07;
    _App.ang-=speed;
    for (let i = 0; i < count; i++) {
      let y = Math.cos(_App.ang+(i/amp))*10;
      let x = (_App.mainCanvas.width/count) * i + 2;
      _App.mainCtx.beginPath();
      _App.mainCtx.moveTo(x,window.innerHeight);
      _App.mainCtx.lineTo(x,y+(window.innerHeight*0.85));
      _App.mainCtx.stroke();
    }

    _App.updateRGB();
   _App.drawStats();
  },
  drawStats(){
    let c =_App.config.curDeg;
    let d =_App.config.curAcl;

    // _App.mainCtx.beginPath();
    // _App.mainCtx.lineWidth=2;
    // _App.mainCtx.arc(_App.mainCanvas.width/2,_App.mainCanvas.height/1.2,40,0,2*Math.PI);
    // _App.mainCtx.stroke();
    // _App.mainCtx.beginPath();
    // _App.mainCtx.arc(_App.mainCanvas.width/2,_App.mainCanvas.height/1.2,20,0,2*Math.PI);
    // _App.mainCtx.stroke();
    // _App.mainCtx.beginPath();
    // _App.mainCtx.arc(_App.mainCanvas.width/2,_App.mainCanvas.height/1.2,5,0,2*Math.PI);
    // _App.mainCtx.fill();
    let b = 100;
    _App.mainCtx.font = "20px neutra";
    _App.mainCtx.lineWidth=1;
    _App.mainCtx.fillText(c.x,20,b);
    _App.mainCtx.fillText(c.y,20,b+30);
    _App.mainCtx.fillText(c.z,20,b+60);
    // _App.mainCtx.fillText(_App.config.curClr,20,290);
    _App.mainCtx.fillText(d.beta,20,b+120);
    _App.mainCtx.fillText(d.gamma,20,b+150);
    _App.mainCtx.fillText(d.alpha,20,b+180);

    _App.mainCtx.save();
    _App.mainCtx.fillStyle="rgb(13,16,59)";
    _App.mainCtx.fillRect(60, b-10, 100, 4 );
  	_App.mainCtx.fillRect(60, b+20, 100, 4 );
  	_App.mainCtx.fillRect(60, b+50, 100, 4 );
//
    _App.mainCtx.fillRect(80, b+110, 100, 4 );
  	_App.mainCtx.fillRect(80, b+140, 100, 4 );
  	_App.mainCtx.fillRect(80, b+170, 100, 4 );
    _App.mainCtx.restore();

    _App.mainCtx.fillRect(60, b-10, c.x/360*100, 4 );
  	_App.mainCtx.fillRect(60, b+20, c.y/180*100, 4 );
  	_App.mainCtx.fillRect(60, b+50, c.z/360*100, 4 );

    _App.mainCtx.fillRect(80, b+110, (d.beta/2100)*100, 4 );
  	_App.mainCtx.fillRect(80, b+140, (d.gamma/2100)*100, 4 );
  	_App.mainCtx.fillRect(80, b+170, (d.alpha/2100)*100, 4 );

    _App.mainCtx.save();
    _App.mainCtx.fillStyle="rgba(99,136,199,0.6)";
//
    _App.mainCtx.fillRect(80, b+110, (d.betaMax/2100)*100, 4 );
  	_App.mainCtx.fillRect(80, b+140, (d.gammaMax/2100)*100, 4 );
  	_App.mainCtx.fillRect(80, b+170, (d.alphaMax/2100)*100, 4 );
    _App.mainCtx.restore();


  },
  updateRGB:function(){
    // console.log("rgb updating");
      let d = _App.config.curDeg;
    	_App.bgCtx.clearRect(10, 0, 550, 550);
      //this is for RGB colors 0-255
      let numbers = [d.x+90, d.y+90, d.z+90];
      let ratio = Math.max.apply(Math, numbers) / 255;
      for (let i = 0; i < numbers.length; i++) {
          numbers[i] = Math.abs(Math.round(numbers[i] / ratio));
    	}
      //this is for hsl colors: h:0-360, s:0-100%, l:0-100%
      let h=_App.config.curDeg.z;
      let s=_App.config.curDeg.y;
      var l=_App.config.curDeg.x;
      h = h%360;
      s = Math.floor(s/180*100);
      l = 100-Math.floor(s/360*100);
      //console.log(numbers);
    	// _App.config.curClr = "rgb("+numbers[0]+","+numbers[1]+","+numbers[2]+")";
    	_App.config.curClr = "hsl("+h+","+l+"%,"+s+"%)";

  },
  draw:function() {

        // _App.mainCtx.strokeStyle = '#fe0000';
        // _App.mainCtx.lineWidth = '5';
        // _App.mainCtx.strokeRect(0, 0, _App.mainCanvas.width, _App.mainCanvas.height);
        _App.update();
        window.requestAnimationFrame(_App.draw);
  },
  resize:function(){
    console.log("resiiiize");
   // _App.mainCanvas.width =
   // _App.mainCanvas.height =
   _App.mainCanvas.setAttribute('width',  Math.min(window.innerWidth, 600));
   _App.mainCanvas.setAttribute('height',  Math.min(window.innerHeight, 900));
   _App.bgCanvas.setAttribute('width',  Math.min(window.innerWidth, 600));
   _App.bgCanvas.setAttribute('height',  Math.min(window.innerHeight, 900));
   _App.ang = 1;
   _App.update();
 },
 accelerate:function(){

 }
}
window.onload=function(){
  window._App = _App;
  _App.init();

}
