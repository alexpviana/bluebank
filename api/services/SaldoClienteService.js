// api/services/SaldoClienteService.js
/**
 * Serviço que retorna o saldo do cliente, via ID da conta corrente
 * @type double
 */

module.exports = {
	getSaldo : function(data,cb){
		MovimentacaoFinanceira.find({
	    	or : [
	    		{"conta_destino" : data.conta },
	    	]
		})
	    .populate("conta_origem")
	    .populate("conta_destino")
		.sort("data_movimentacao ASC")
		.exec(function(err,movs){			
			if(err){
	  			return cb(err,null);
	  		}

	  		var saldo = 0;

	  		for(var i=0; i<movs.length; i++){
	  			var objMov = movs[i];
	  			saldo += objMov.valor;
	  		}

	  		cb(null,saldo);
		});
	},
};