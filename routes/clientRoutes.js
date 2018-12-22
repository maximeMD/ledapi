module.exports = function(app) {
    var client = require('../controllers/clientController');

    app.route('/')
        .get(client.home);
}