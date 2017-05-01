/**
 * ContaCorrente.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  	attributes: {
  		numero : {
  			type : 'string',
  			required : "true"
  		},
  		agencia : {
        model : "agencia",
        unique : true,
        required : "true"
      },
      cliente : {
  			model : "cliente",
  			unique : true,
        required : "true"
  		}
  	}
};

