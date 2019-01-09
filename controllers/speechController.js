var dictionary = 
    [
        {
            "action" :  "ledColor",
            "sentences" : [
                    "allume couleur"
                ],
            "parameters" : {
                "redValue" : [
                    "rouge"
                ],
                "greenValue" : [
                    "verte"
                ],
                "blueValue" : [
                    "bleue"
                ],
            }                
        },
        {
            "action" :  "random",
            "sentences" : [
                "allume mode aléatoire",
                "allume mode random",
                "active mode aléatoire",
                "active mode random",
                "baise ta mère"
            ]                
        },
        {
            "action" :  "rgb",
            "sentences" : [
                "allume mode RGB",
                "active mode RGB",
            ]                
        },
        {
            "action" :  "rgbFade",
            "sentences" : [
                "allume mode fondu",
                "allume mode fade",
                "active mode fondu",
                "active mode fade"
            ]                
        }
    ];
var request = require('request');
exports.analyse = function(req,res){    
    
    var speechMatches
    var bestMatch = 0;
    var bestQuery = "";
    dictionary.forEach(query => {
        query.sentences.forEach(sentence => {
            sentence = sentence.toLowerCase();
            var desiredWords = sentence.split(" ");            
            var currentWords = req.body.sentence.toLowerCase().split(" ");
            speechMatches = 0;
            desiredWords.forEach(desiredWord => {
                if(currentWords.includes(desiredWord)) speechMatches++;
                if(speechMatches > bestMatch) {
                    bestMatch = speechMatches;
                    bestQuery = query.action;
                }
            });
        });        
    });
    if(bestMatch > 0){
        request.post('http://localhost:3000/' + bestQuery, {
            form:{
                timeInterval : 1000
            }
        })
    }
}
