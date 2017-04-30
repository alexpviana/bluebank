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
  			enum: ['C', 'D'],
  			required : "true"
  		},

  		"conta_origem" : {
  			collection : "contacorrente",
  			unique : true,
  			required : "true"
  		},
  		"conta_destino" : {
  			collection : "contacorrente",
  			unique : true,
  			required : "true"
  		}
  }
};

