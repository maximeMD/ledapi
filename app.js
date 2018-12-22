//Require the pigpio package, this is from https://github.com/fivdi/pigpio
//This is a Node.js wrapper around the native pigpio C library https://github.com/joan2937/pigpio
let Gpio = require('pigpio').Gpio;

//Initialize the LED pin for output (GPIO5, GPIO Header Pin 29) 
let led = new Gpio(17,{mode: Gpio.OUTPUT});

led.digitalWrite(0);

//and drive it low (off) initially...
led.pwmWrite(255);
