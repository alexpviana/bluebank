/**
 * MovimentacaoFinanceira.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  		"data_movimentacao" : {
  			type : "datetime",
  			required : "true"
  		},
  		"valor" : {
  			type : "float",
  			required : "true"
  		},
  		"tipo" : {
  			type : "string",
  			enum: ['Depósito', 'Transferência'],
  			required : "true"
  		},
  		"conta_origem" : {
  			model : "contacorrente"
  		},
  		"conta_destino" : {
        model : "contacorrente",
        required : "true"
      },
      "cliente_destino" : {
        model : "cliente",
        required : "true"
      },
      "cliente_origem" : {
  			model : "cliente"
  		},
  }
};

