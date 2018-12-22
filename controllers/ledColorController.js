//This is a Node.js wrapper around the native pigpio C library https://github.com/joan2937/pigpio
let Gpio = require('pigpio').Gpio;

let redLed = new Gpio(22,{mode: Gpio.OUTPUT});
let greenLed = new Gpio(17,{mode: Gpio.OUTPUT});
let blueLed = new Gpio(24,{mode: Gpio.OUTPUT});

var animation;

var defaultTimeInterval = 500;

exports.setColors = function(req,res){
    clearInterval(animation);
    redLed.pwmWrite(req.body.redValue);
    greenLed.pwmWrite(req.body.greenValue);
    blueLed.pwmWrite(req.body.blueValue);

    res.sendStatus(200);
}

exports.setRandom = function(req,res){
    clearInterval(animation);
    var timeInterval = req.body.timeInterval || defaultTimeInterval;
    animation = setInterval(function(){
        var random1 = Math.floor(Math.random() * 255);
        var random2 = Math.floor(Math.random() * 255);
        var random3 = Math.floor(Math.random() * 255);
        redLed.pwmWrite(random2);
        greenLed.pwmWrite(random1);
        blueLed.pwmWrite(random3);
    }, timeInterval);
    res.sendStatus(200);
}

exports.setRgb = function(req,res){
    clearInterval(animation);
    var timeInterval = req.body.timeInterval || defaultTimeInterval;
    var i = 0;
    animation = setInterval(function(){
        switch(i){
            case 0 :
                redLed.pwmWrite(255);
                greenLed.pwmWrite(0);
                blueLed.pwmWrite(0);
                break;
            case 1 :
                redLed.pwmWrite(0);
                greenLed.pwmWrite(255);
                blueLed.pwmWrite(0);
                break;
            case 2 :
                redLed.pwmWrite(0);
                greenLed.pwmWrite(0);
                blueLed.pwmWrite(255);
                break;
            }
        if( i < 2 ) i++;
        else i = 0;
    }, timeInterval);
    res.sendStatus(200);
}

exports.setRgbFade = function(req,res){
    clearInterval(animation);
    var timeInterval = req.body.timeInterval || defaultTimeInterval;
    var i = 0;
    animation = setInterval(function(){
        switch(i){
            case 0 :
                fadeColor(redLed, 0, 255, timeInterval);
                fadeColor(blueLed, 255, 0, timeInterval);
                break;
            case 1 :
                fadeColor(greenLed, 0, 255, timeInterval);
                fadeColor(redLed, 255, 0, timeInterval);
                break;
            case 2 :
                fadeColor(blueLed, 0, 255, timeInterval);
                fadeColor(greenLed, 255, 0, timeInterval);
                break;
            }
        if( i < 2 ) i++;
        else i = 0;
    }, timeInterval);
    res.sendStatus(200);
}

exports.setRgbStrictFade = function(req,res){
    clearInterval(animation);
    var timeInterval = req.body.timeInterval || defaultTimeInterval;
    var halfTimeInterval = Math.floor(timeInterval / 2);
    var i = 0;
    animation = setInterval(function(){
        switch(i){
            case 0 :
                fadeColor(redLed, 0, 255, halfTimeInterval);
                setTimeout(function(){fadeColor(blueLed, 255, 0, halfTimeInterval)}, halfTimeInterval);   
                break;
            case 1 :
                fadeColor(greenLed, 0, 255, timeInterval);
                setTimeout(function(){fadeColor(redLed, 255, 0, halfTimeInterval)}, halfTimeInterval);
                break;
            case 2 :
                fadeColor(blueLed, 0, 255, timeInterval);
                setTimeout(function(){fadeColor(greenLed, 255, 0, halfTimeInterval)}, halfTimeInterval);
                break;
            }
        if( i < 2 ) i++;
        else i = 0;
    }, timeInterval);
    res.sendStatus(200);
}

fadeColor = function(led, value1, value2, duration){
    var min = Math.min(value1, value2);
    var max = Math.max(value1, value2);
    
    var durationInterval = duration / (max - min);

    if(min == value1){
        var value = min;
        var i = 0;
        var interval = setInterval(function(){
            led.pwmWrite(value);
            value++;
            i += durationInterval;
            if( i >= duration){
                clearInterval(interval);
            }
        }, durationInterval);
    }else{
        var value = max;
        var i = 0;
        var interval = setInterval(function(){
            led.pwmWrite(value);
            value--;
            if(value < 0) value = 0;
            i += durationInterval;
            if( i >= duration){
                clearInterval(interval);
            }
        }, durationInterval);
    }
}