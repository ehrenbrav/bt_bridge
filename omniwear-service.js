var util = require('util');
var bleno = require('bleno');

var StatusCharacteristic = require('./status-characteristic');

function OmniWearService(hh) {
    bleno.PrimaryService.call(this, {
        uuid: '99700001-ad20-11e6-8000-00805F9B34FB',
        characteristics: [
            new StatusCharacteristic(hh),
        ]
    });
}

util.inherits(OmniWearService, bleno.PrimaryService);

module.exports = OmniWearService;



