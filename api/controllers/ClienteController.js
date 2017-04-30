/**
 * ClienteController
 *
 * @description :: Server-side logic for managing clientes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	logado : function(req,res){
		passport.authenticate('bearer',{ session : false }), 
			function(req,res){
			console.log("bearer",req);
			};
		
		// var user = req.user;
		// return res.view('cliente',{
		// 	dados : user
		// });
	}
};

