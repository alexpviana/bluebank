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

	      	ContaCorrente.find({
	      		"numero" : req.param('conta_corrente')
	      	})
	      	.populate('agencia',{
	      		where : {
	      			numero : req.param('agencia')
	      		}
	      	})
	      	.populate('cliente',{
	      		where : {
	      			password : senhaHash
	      		}
	      	})
	      	.exec(function(err,data){
	      		console.log(data,data.length);
	      		if(err){
	      			return res.serverError(err);
	      		}

	      		if(data.length >= 1){ // Consulta válida
	      			req.session.authenticated = true;
	      			return res.json({ status : true, resp : "ok" });
	      		}
	      		else{
	      			return res.json({ status : false, resp : "erro" });	
	      		}
	      	});

	      	console.log(req.allParams(),senhaHash);
	    });
		
	}
};

