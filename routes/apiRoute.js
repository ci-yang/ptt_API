const mysql = require('mysql');
module.exports = function(app, account){
	app.get('/ptt/', function(req, res, next) {
		//const articleID = req.params.id;
		const articleID = req.query.articleID
		const start = req.query.start
		const end = req.query.end
		var data = {
			programList: null,
			userList: null,
			tagList: null,
			bubbleSet: null,
			numTag: null
		}
		var db = mysql.createConnection({
		    host:account[0],
		    user:account[1],
		    password:account[2],
		    database:account[3]
		});
		db.connect(function(err){
		    if(err){
		        console.error(err);
		        return;
		    }
		    else{
		    	console.log("connect success!");
		    }
		});
		var query = "SELECT * FROM Articles ORDER BY Articles.push_amount DESC LIMIT 5";
		if( typeof articleID !== 'undefined' )
			query = "SELECT * FROM Articles WHERE id = " + articleID;
		console.log(articleID);

		db.query(query, function(err, rows, fiels) {
		    if(err)	
		    	console.log(err);
		    else{
		    	db.end(function(){console.log("db close!")});
	    		res.json(rows);
		    }
	    });
	});
	app.get('/reference/', function(req, res, next) {
		//const articleID = req.params.id;
		const start = req.query.start
		const end = req.query.end
		var data = {
			programList: null,
			userList: null,
			tagList: null,
			bubbleSet: null,
			numTag: null
		}
		var db = mysql.createConnection({
		    host:account[0],
		    user:account[1],
		    password:account[2],
		    database:account[3]
		});
		db.connect(function(err){
		    if(err){
		        console.error(err);
		        return;
		    }
		    else{
		    	console.log("connect success!");
		    }
		});
		//var query = "SELECT * FROM Articles ORDER BY Articles.push_amount DESC LIMIT 5";
		var query = "SELECT References.*, Articles.* FROM `References` WHERE References.date > " + start.toString() + " AND References.date <= " + end.toString();
		console.log(query)

		db.query(query, function(err, rows, fiels) {
		    if(err)	
		    	console.log(err);
		    else{
		    	db.end(function(){console.log("db close!")});
	    		res.json(rows);
	    		console.log(rows)
		    }
	    });
	});
};