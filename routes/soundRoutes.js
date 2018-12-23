module.exports = function(app) {
    var soundController = require('../controllers/soundController');

    app.route('/audioTest')
        .get(soundController.test);
    app.route('/playSound')
        .get(soundController.testPlay);
}