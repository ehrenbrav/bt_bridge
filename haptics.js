var sdk = require('./build/Release/omniwear_addon')

const NUM_MOTORS = 8;
const MOTOR = {

    FRONT:       0,
    BACK:        1,
    LEFT:        3,
    RIGHT:       2,
    FRONT_RIGHT: 4,
    FRONT_LEFT:  5,
    BACK_RIGHT:  6,
    BACK_LEFT:   7,
};

function Open() {
    sdk.open();
}

function Reset() {
    sdk.reset_motors();
}

function Buzz(motor, duration_ms) {
    // Turn on.
    sdk.configure_motor(motor, 100);

    // Turn off.
    setTimeout(function() {
        sdk.configure_motor(motor, 0)}, duration_ms);
}

function BuzzAll(duration_ms) {
    for (var motor = 0; motor < NUM_MOTORS; motor++) {
        sdk.configure_motor(motor, 100);
        setTimeout(function() {
            sdk.configure_motor(motor, 0)}, duration_ms);
    }
}

module.exports.MOTOR = MOTOR;
module.exports.Reset = Reset;
module.exports.Buzz = Buzz;
module.exports.BuzzAll = BuzzAll;
module.exports.Open = Open;

