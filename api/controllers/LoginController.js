/**
 * LoginController
 *
 * @description :: Server-side logic for managing Login
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	auth : function(req,res){
		var bcrypt = require('bcryptjs');

      	ContaCorrente.findOne({
      		"numero" : req.param('conta_corrente')
      	})
      	.populate('agencia',{
      		where : {
      			numero : req.param('agencia')
      		}
      	})
      	.exec(function(err,data){
      		if(err){
      			return res.serverError(err);
      		}

      		if(data){
      			Cliente.findOne({id : data.cliente}).exec(function(err,cliente){
	      			if(cliente){
	      				if(bcrypt.compareSync(req.param('senha'), cliente.password)){
	      					req.session.authenticated = true;
	      					req.session.userId = cliente.id;
	      					req.session.ccId = data.id;
	      					req.session.agenciaId = data.agencia.id;

	      					return res.json({ status : true, msg : "Aguarde, você está sendo redirecionado." });	
	      				}
	      				else{
	      					return res.json({ status : false, msg : "Atenção! Senha inválida." });		
	      				}
	      			}
	      			else{
	      				return res.json({ status : false, msg : "Cliente não encontrado" });
	      			}
	      		});
      		}
      		else{
      			return res.json({ status : false, msg : "Conta Corrente e Agência não encontradas" });	
      		}
      	});
	}
};

