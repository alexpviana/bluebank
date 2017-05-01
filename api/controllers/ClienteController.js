/**
 * ClienteController
 *
 * @description :: Server-side logic for managing clientes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	logado : function(req,res){
		return res.json({logado : req.session.authenticated});
	},

	logout : function(req,res){
		req.session.authenticated = null;
		return res.redirect('/#!/home');
	}

};

