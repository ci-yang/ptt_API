const nodeRoutes = require('./apiRoute');

module.exports = function(app, account){
	nodeRoutes(app, account);
}