'use strict';

const mode = process.argv[2];

console.log('You may restart docker service before running this test');

var chp = require('child_process');
var async = require('async');

var cmds = [
  'cd ' + process.cwd() + ' && node cli.js cluster leave',
  'cd ' + process.cwd() + ' && node cli.js cluster leave-manager',
  'cd ' + process.cwd() + ' && node cli.js cluster init 127.0.0.1',
  'docker network rm orcinus-unit-testing-stack',
  'docker swarm init',
];

if (mode === 'post') {
  cmds.splice(2,1);
}

async.eachSeries(cmds, (cmd, cb) => {
  chp.exec(cmd, (err, stdout, stderr) => {
    cb();
  });
}, () => {
  if (mode === 'pre') {
    console.log('Ready to test');
  }
});
