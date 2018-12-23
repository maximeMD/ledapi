//This is a Node.js wrapper around the native pigpio C library https://github.com/joan2937/pigpio
let Gpio = require('pigpio').Gpio;

let redLed = new Gpio(22,{mode: Gpio.OUTPUT});
let greenLed = new Gpio(17,{mode: Gpio.OUTPUT});
let blueLed = new Gpio(24,{mode: Gpio.OUTPUT});





// Greetings to https://github.com/victordibia/beats :)
var AudioContext = require('web-audio-api').AudioContext
context = new AudioContext
var fs = require('fs')
var exec = require('child_process').exec;
var _ = require('underscore');
var player = require('play-sound')(opts = {})

var pcmdata = [] ;

//Note: I have no rights to these sound files and they are not created by me.
//You may downlaod and use your own sound file to further test this.
//
var soundfile = "/home/pi/Spacedge.mp3"


/**
 * [decodeSoundFile Use web-audio-api to convert audio file to a buffer of pcm data]
 * @return {[type]} [description]
 */
function decodeSoundFile(soundfile){
  console.log("decoding mp3 file ", soundfile, " ..... ")
  fs.readFile(soundfile, function(err, buf) {
    if (err) throw err
    context.decodeAudioData(buf, function(audioBuffer) {
      console.log(audioBuffer.numberOfChannels, audioBuffer.length, audioBuffer.sampleRate, audioBuffer.duration);
      pcmdata = (audioBuffer.getChannelData(0)) ;
      samplerate = audioBuffer.sampleRate;
      maxvals = [] ; max = 0 ;
      playsound(soundfile)
      findPeaks(pcmdata, samplerate);
    }, function(err) { throw err })
  })
}


/**
 * [findPeaks Naive algo to identify peaks in the audio data, and wave]
 * @param  {[type]} pcmdata    [description]
 * @param  {[type]} samplerate [description]
 * @return {[type]}            [description]
 */
function findPeaks(pcmdata, samplerate){
  var interval = 0.05 * 1000 ; index = 0 ;
  var step = Math.round( samplerate * (interval/1000) );
  var max = 0 ;
  var prevmax = 0 ;
  var prevdiffthreshold = 0.3 ;

  //loop through song in time with sample rate
  var samplesound = setInterval(function() {
    if (index >= pcmdata.length) {
      clearInterval(samplesound);
      console.log("finished sampling sound")
      return;
    }

    for(var i = index; i < index + step ; i++){
      max = pcmdata[i] > max ? pcmdata[i].toFixed(1)  : max ;
    }

    // Spot a significant increase? Potential peak
    bars = getbars(max) ;
    if(max-prevmax >= prevdiffthreshold){
      bars = bars + " == peak == "
    }

    // Print out mini equalizer on commandline
    console.log(bars, max )
    
    if(max < 0) max = 0;
    if(max > 1) max = 1;
    var val = Math.floor(max * 255)
    redLed.pwmWrite(val);

    prevmax = max ; max = 0 ; index += step ;
  }, interval,pcmdata);
}

/**
 * TBD
 * @return {[type]} [description]
 */
function detectBeats(){

}

/**
 * [getbars Visualize image sound using bars, from average pcmdata within a sample interval]
 * @param  {[Number]} val [the pcmdata point to be visualized ]
 * @return {[string]}     [a set of bars as string]
 */
function getbars(val){
  bars = ""
  for (var i = 0 ; i < val*50 + 2 ; i++){
    bars= bars + "|";
  }
  return bars ;
}

/**
 * [Plays a sound file]
 * @param  {[string]} soundfile [file to be played]
 * @return {[type]}           [void]
 */
function playsound(soundfile){
    // access the node child_process in case you need to kill it on demand
    var audio = player.play(soundfile, function(err){
        if (err && !err.killed) throw err
    })
    // audio.kill()
}


exports.test = function(req,res){
    redLed.pwmWrite(0);
    greenLed.pwmWrite(0);
    blueLed.pwmWrite(0);

    decodeSoundFile(soundfile);
    res.sendStatus(200);
}


exports.testPlay = function(req,res){
    playsound(soundfile);
    res.sendStatus(200);
}

