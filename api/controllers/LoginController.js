/**
 * LoginController
 *
 * @description :: Server-side logic for managing Login
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	auth : function(req,res){
		var bcrypt = require('bcryptjs');
		var senhaHash = "";

		bcrypt.hash(req.param('senha'), 10, function (err, hash) {
	      	senhaHash = hash;

	      	// Agencia.find({
	      	// 	"numero" : "405789-5"
	      	// }).populate('contacorrente', { ''})

	      	// Cliente.find({
	      	// 	"agencia" : {
	      			
	      	// 	}
	      	// }).exec(function(err,data){
	      	// 	console.log(err,data);
	      	// });

	      	console.log(req.allParams(),senhaHash);
	    });
		
	}
};

