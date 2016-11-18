var util = require('util');
var events = require('events');

function Device() {
  events.EventEmitter.call(this);
}

util.inherits(Device, events.EventEmitter);
module.exports.Device = Device;





