var util = require('util');
var bleno = require('bleno');

// A name to advertise our service.
var name = 'OmniWear';

// Use a custom device name.
process.env['BLENO_DEVICE_NAME'] = 'OmniWear';

// The device itself.
var OmniWear = require('./omniwear_device');
var device = new OmniWear.Device();

// Services that we'll run.
var OmniWearService = require('./omniwear-service');
var omniwearService = new OmniWearService(device);

//
// Wait until the BLE radio powers on before attempting to advertise.
// If you don't have a BLE radio, then it will never power on!
//
bleno.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    //
    // We will also advertise the service ID in the advertising packet,
    // so it's easier to find.
    //
    bleno.startAdvertising(name, [omniwearService.uuid], function(err) {
      if (err) {
        console.log(err);
      }
    });
  }
  else {
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', function(err) {
  if (!err) {
    console.log('advertising...');
    //
    // Once we are advertising, it's time to set up our services,
    // along with our characteristics.
    //
    bleno.setServices([
        omniwearService
    ]);
  }
});

bleno.on('disconnect', function(clientAddress) {
    console.log("Disconnect from: ", clientAddress);
});

bleno.on('accept', function(clientAddress) {
    console.log("Connection from: ", clientAddress);
});
