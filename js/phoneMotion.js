//import utils from './utils';
//static class variables (internal)
//global (to this module)
// const maxPoints= 10000;


function init() {
  // console.log("phoneMotion.init()");
  addEvents();
}
function addEvents(){
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
}
// new
class PhoneMotion {
  constructor(app){
    this._App = app;
    // console.log("phoneMotion");
    init();
  }


  // constructor(app, color) {
    // this.subdivisions = 0;
    // this.totalPoints = 0;
    // this.app = app;
    // this.color = color;
    // this.starter();
    // setup(this);
  // }
  // starter() {
  //   //
  // }


}
export default PhoneMotion;
