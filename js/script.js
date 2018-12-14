import utils from './utils';
import PhoneMotion from './phoneMotion';


var _App = {
//
config:{
  width: window.innerWidth,
  height: window.innerHeight,
  xoffset:180,yoffset:0,zoffset:0,
  curDeg:{
    x:40,y:40,z:40
  },
  curAcl:{
    alpha:0,beta:0,gamma:0,
    alphaMax:0,betaMax:0,gammaMax:0
  },
  curClr:"none",
  palette:{
    primary:"#66c1d3",
    primarylt:"#defafe",
    white:"#FFFFFF"
  }
},
init: function(){
  console.log("init");
  utils.logTest();
  _App.phone = new PhoneMotion();
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
    document.body.addEventListener("touchmove", function(event) { event.preventDefault();    event.stopPropagation();}, false);
    document.getElementById("play_btn").addEventListener('click', _App.gotoLobby, false);
    document.getElementById("play_btn").addEventListener('touchstart', _App.gotoLobby, false);
  },
  connectCanvas:function(){
    // console.log("ddd", _App.config.height);
    _App.mainCanvas = document.getElementById("gameCanvas");
    _App.mainCtx = _App.mainCanvas.getContext("2d");
    _App.bgCanvas = document.getElementById("bgCanvas");
    _App.bgCtx = _App.bgCanvas.getContext("2d");
//
    _App.mainCanvas.setAttribute("width", _App.config.width);
    _App.mainCanvas.setAttribute("height", _App.config.height);
    _App.bgCanvas.setAttribute("width", _App.config.width);
    _App.bgCanvas.setAttribute("height", _App.config.height);

    let ss = document.getElementById("startScreen");
    ss.setAttribute("width",_App.config.width);
    ss.setAttribute("height",_App.config.height);

    _App.wc = document.getElementById('waveCanvas');
    _App.wcCtx = _App.wc.getContext('2d');
//
    _App.wc.setAttribute("width", _App.config.width);
    _App.wc.setAttribute("height", 200);
    // _App.wc.setAttribute("height", 200);

    // _App.wc.style.top=_App.config.height-200;;




  },
  update:function(){
    // console.log("update");
    //
    _App.mainCtx.clearRect(0,0,_App.mainCanvas.width, _App.mainCanvas.height)
    _App.wcCtx.clearRect(0,0,_App.mainCanvas.width, 200)
    // _App.mainCtx.fillStyle = _App.config.curClr;
    // _App.mainCtx.rect(0,0,_App.mainCanvas.width, _App.mainCanvas.height);
    // _App.mainCtx.fill();
    //

    //draw wave
    _App.mainCtx.fillStyle = _App.mainCtx.strokeStyle=_App.config.palette.primary;
    _App.wcCtx.fillStyle = _App.wcCtx.strokeStyle=_App.config.palette.primary;
    _App.wcCtx.lineWidth=8;
    _App.wcCtx.lineCap="round";
    let count = 22;

    let amp = 6;
    let speed = 0.03;
    _App.ang-=speed;
    for (let i = 0; i < count; i++) {
      let y = Math.cos(_App.ang+(i/amp))*amp;
      let x = (_App.config.width/count) * i+_App.wcCtx.lineWidth;
      _App.wcCtx.beginPath();
      // _App.wcCtx.moveTo(x,window.innerHeight);
      _App.wcCtx.moveTo(x,200);
      _App.wcCtx.lineTo(x,2*y+120);
      _App.wcCtx.stroke();
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
    _App.mainCtx.fillStyle=_App.config.palette.primary;
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
    _App.mainCtx.fillStyle=_App.config.palette.white;
//
    _App.mainCtx.fillRect(80, b+112, (d.betaMax/2100)*100, 4 );
  	_App.mainCtx.fillRect(80, b+142, (d.gammaMax/2100)*100, 4 );
  	_App.mainCtx.fillRect(80, b+172, (d.alphaMax/2100)*100, 4 );
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
  gotoLobby:function(e){
    document.getElementById("startScreen").className+=" hidden";
    // console.log(e.currentTarget);
    // e.currentTarget.className+=" hidden";

  },
  draw:function() {

        // _App.mainCtx.strokeStyle = '#fe0000';
        // _App.mainCtx.lineWidth = '5';
        // _App.mainCtx.strokeRect(0, 0, _App.mainCanvas.width, _App.mainCanvas.height);
        _App.update();
        window.requestAnimationFrame(_App.draw);
  },
  resize:function(){
   _App.mainCanvas.setAttribute('width',  Math.min(window.innerWidth, 600));
   _App.mainCanvas.setAttribute('height',  Math.min(window.innerHeight, 900));
   _App.bgCanvas.setAttribute('width',  Math.min(window.innerWidth, 600));
   _App.bgCanvas.setAttribute('height',  Math.min(window.innerHeight, 900));
   _App.ang = 1;
   _App.update();
 }
}
window.onload=function(){
  window._App = _App;
  _App.init();

}
