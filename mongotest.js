var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;

	var client = new MongoClient(new Server('localhost', 27017, {poolSize: 5}), {retryMiliSeconds: 500});

	client.open(function(err, client){
		if(err){
			console.log("Connection failed via client object.");
		} else{
			var db = client.db('testdb');
			if (db){
				console.log("connected via client object...");
				db.authenticate("user","password", function(err, results){
					if(err){
						console.log("authentication failed . . . ");
						client.close();
						console.log("Connection closed");
					} else{
						console.log("Authenticated via client object . . . ");
						db.logout(function(err, results){
							if(!err){
								console.log("Logged out via client object . . . ");
							}
							client.close();
							console.log("connection closed . . . ");
						})
					}
				});
			}
		}
	})