var util = require('util');
var bleno = require('bleno');
var device = require('./omniwear_device');
var haptics = require('./haptics');
var sdk = require('./build/Release/omniwear_addon')

const NUM_MOTORS = 13;

function StatusCharacteristic(hh) {
    bleno.Characteristic.call(this, {
    uuid: '99700002-ad20-11e6-8000-00805F9B34FB',
    properties: ['writeWithoutResponse', 'write'],
  });
    this.device = device;
}

util.inherits(StatusCharacteristic, bleno.Characteristic);

StatusCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {

    // Sanity check.
    if ((data[0] > NUM_MOTORS) || (data[1] > 100)) {
        console.log("Illegal command: ", data);
        callback(this.RESULT_SUCCESS);
    }
    sdk.configure_motor(data[0], data[1]);
    console.log('Write: ', data);
    callback(this.RESULT_SUCCESS);

};

module.exports = StatusCharacteristic;



