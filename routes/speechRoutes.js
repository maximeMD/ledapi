module.exports = function(app) {
    var speech = require('../controllers/speechController');

    app.route('/speech')
        .post(speech.analyse);
        
}