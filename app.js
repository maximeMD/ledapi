// //Require the pigpio package, this is from https://github.com/fivdi/pigpio
// //This is a Node.js wrapper around the native pigpio C library https://github.com/joan2937/pigpio
// let Gpio = require('pigpio').Gpio;

// //Initialize the LED pin for output (GPIO5, GPIO Header Pin 29) 
// let led = new Gpio(17,{mode: Gpio.OUTPUT});

// led.digitalWrite(0);

// //and drive it low (off) initially...
// led.pwmWrite(255);


var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var ledColorRoutes = require("./routes/ledColorRoutes");
ledColorRoutes(app);
var clientRoutes = require("./routes/clientRoutes");
clientRoutes(app);
var speechRoutes = require("./routes/speechRoutes");
speechRoutes(app);

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.listen(port);
console.log('Express server started on : ' + port);

