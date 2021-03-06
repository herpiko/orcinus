var utils = require("./utils");
var proc = require('process');
var chp = require('child_process');
var val;
module.exports = {
  init : (value)=>{
    val = value;
    var svc = utils.obj(val);
    if(svc.indexOf('services') <= 0) {
      console.log("Service can't defined.");
      proc.exit(1);
    }
    var app = utils.obj(val.services);
    app.forEach((v)=>{
      module.exports.prs(v);
    });
  },
  execution : (keyMap)=>{
    var name = keyMap.name;
    var cmd = "docker service rm "+name;
    chp.exec(cmd,(e, stdout, stderr)=> {
      if(stdout){
        console.log("delete :"+stdout);
      }
      if(stderr){
        console.log(stderr)
      }
    })
  },
  prs : (key)=>{
    var keyMap = {
      name: key
    }
    module.exports.execution(keyMap);
  }
}
