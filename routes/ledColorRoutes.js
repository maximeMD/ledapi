module.exports = function(app) {
    var ledColor = require('../controllers/ledColorController');

    app.route('/ledColor')
        .post(ledColor.setColors);
    
    app.route('/random')
        .post(ledColor.setRandom);

    app.route('/rgb')
        .post(ledColor.setRgb);

    app.route('/rgbFade')
        .post(ledColor.setRgbFade);

    app.route('/rgbStrictFade')
        .post(ledColor.setRgbStrictFade);

        
}