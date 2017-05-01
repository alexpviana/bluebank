/**
 * MovimentacaoFinanceiraController
 *
 * @description :: Server-side logic for managing Movimentacaofinanceiras
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getDadosTable : function(req,res){
        var tabela = req.param('tabela');
        var start = parseInt(req.param('start'),10);
        var length = parseInt(req.param('length'),10);
        var search = req.param('search[value]');
        var order = req.param('order');
        var columns = req.param('columns');

        var admin = req.param('admin');
        var url = req.param('url');

        var ordem = "";

        for(var i=0; i<order.length; i++){
            ordem += (i > 0) ? ", " + columns[order[i].column].data + " " + order[i].dir : " "  + columns[order[i].column].data + " " + order[i].dir;
        } // ex: id DESC

        var vetData = [];
        MovimentacaoFinanceira.find({
        	or : [
        		{"conta_destino" : req.session.ccId },
        	]
    	})
        .populate("conta_origem")
        .populate("conta_destino")
        .populate("cliente_destino")
    	.sort("data_movimentacao ASC")
    	.exec(function(err,movs){
    		if(err){
      			return res.serverError(err);
      		}

      		var saldo =0;

      		for(var i=0; i<movs.length; i++){
      			var objMov = movs[i];
      			saldo += objMov.valor;

      			var origemTxtTransferencia = "";

      			if(typeof objMov.cliente_origem != "undefined"){
      				origemTxtTransferencia = "Depósito - " + objMov.cliente_origem.nome;
      			}
      			else{
      				origemTxtTransferencia = "";	
      			}
      			
      			vetData.push({
      				"id" : objMov.id,
      				"data_movimentacao" : sails.moment(objMov.createdAt).format("DD/MM/YYYY"),
      				"origem" : (objMov.tipo == "Depósito") ? "Depósito em Conta" : origemTxtTransferencia,
      				"historico" : (objMov.tipo == "Depósito") ? "Depósio em Conta" : "Transferência - " + objMov.cliente_destino.nome,
      				"documento" : objMov.id,
      				"valor" : "$ " + objMov.valor.toFixed(2).replace(/\./g,","),
      				"saldo" : "$ " + saldo.toFixed(2).replace(/\./g,",")
  				});
      		}

      		var dados = {
      			"draw" : req.param("draw"),
      			"recordsTotal" : movs.length,
      			"recordsFiltered" : movs.length,
      			"data" : vetData 
      		};

      		return res.json(dados);
    	});
	},

	transferencia : function(req,res){
		var agencia       = req.param('agencia');
		var contaCorrente = req.param('conta_corrente');
		var cpf           = req.param('cpf').replace(/\./g,"").replace(/\-/,"");
		var valor         = parseFloat(req.param('valor').replace(/\./g,"").replace(",","."));

		//Checa se conta existe
		ContaCorrente.findOne({numero : contaCorrente})
		.populate("agencia",{
			"numero" : agencia
		})
		.populate("cliente",{
			"cpf" : cpf
		})
		.exec(function(err,conta){
			if(err){
				return res.serverError(err);
			}

			console.log("contaaaa",conta);
			console.log("types",typeof conta.cliente,typeof conta.agencia);

			var checkAgencia = false;
			var checkCliente = false;
			var checkConta   = false;

			if (typeof conta != 'undefined') { // Conta corrente existe
				// Check agencia
				if (typeof conta.agencia != 'undefined') {
					checkAgencia = true;
				}
				else{
					console.log("Agencia errada");
					return res.json({ status : false, msg : "Atenção! Agência e conta não conferem." });
				}

				if (typeof conta.cliente != 'undefined') {
					checkCliente = true;
				}
				else{
					console.log("Cliente errado");
					return res.json({ status : false, msg : "Atenção! Esta conta não pertence ao dono do CPF informado." });
				}

				// checa se conta logada é a mesma enviada
				if(conta.id == req.session.ccId){ // mesma conta - erro
					console.log("Erro - mesma conta");	
					checkConta = false;
					return res.json({ status : false, msg : "Atenção! Transferência não autorizada.<br>Impossível transferir para a mesma conta." });	
				}
				else{
					checkConta = true;
				}

				if(checkAgencia && checkCliente && checkConta){ // todas informações estão OK
					console.log("tudo ok");

					// Checar se tem saldo na conta logada
					SaldoClienteService.getSaldo({conta : req.session.ccId},function(err,saldo){
						if(saldo > 0 && valor <= saldo){ // Possui saldo para transferencia
							// Insere valor negativo referente ao valor na conta logada
							MovimentacaoFinanceira.create({
								"data_movimentacao": sails.moment().format(),
								"valor"            : -valor,
								"tipo"             : "Transferência",
								"conta_origem"     : req.session.ccId,
								"conta_destino"    : req.session.ccId,
								"cliente_destino"  : conta.cliente.id,
								"cliente_origem"   : req.session.userId,
							})
							.exec(function(err,mov){								
								if(mov.id){
									// Cria crédito na conta destino informada via post
									MovimentacaoFinanceira.create({
										"data_movimentacao": sails.moment().format(),
										"valor"            : valor,
										"tipo"             : "Depósito",
										"conta_origem"     : req.session.ccId,
										"conta_destino"    : contaCorrente,
										"cliente_destino"  : conta.cliente.id,
										"cliente_origem"   : req.session.userId,
									})
									.exec(function(err,mov){
										if(mov.id){
											return res.json({ status : true, msg : "Transferência executada com sucesso." });
										}
									});
								}
							});
						}
						else{
							return res.json({ status : false, msg : "Atenção! Saldo Insuficiente. Saldo atual : $" + saldo });
						}
					});
				}
			}
			else{
				// Conta não encontrada
				return res.json({ status : false, msg : "Atenção! Conta Corrente inexistente" });	
			}
		});
	}
};

// public function getDadosTable(){


//         for(var $i=0; $i<count($order); $i++){
//             $ordem .= ($i > 0) ? ", " .$columns[$order[$i]["column"]]["data"] ." " .$order[$i]["dir"] : " " .$columns[$order[$i]["column"]]["data"] ." " .$order[$i]["dir"];
//         }

//         if($ordem != ""){
//             $ordem = " ORDER BY $ordem";
//         }

//         $colunasBusca = req.param('colunasBusca');

//         if($search != ""){
//             $start = 0;
//             $where = " WHERE (";
//             for($i=0;$i<count($colunasBusca);$i++){
//                 $where .= ($i > 0) ? " OR $colunasBusca[$i] LIKE '%$search%'" : "$colunasBusca[$i] LIKE '%$search%'";
//                 if($i == count($colunasBusca)-1){
//                     $where .= ")";
//                 }
//             }
//         }
//         else{
//             $where = "";
//         }

//         $respTotal = $this->geral_model->retornaQuery("SELECT * FROM $tabela $where");
//         $resp = $this->geral_model->retornaQuery("SELECT * FROM $tabela $where $ordem LIMIT $start,$length");

//         $cont = 0;
//         foreach($resp->result() as $item){
//             $item->DT_RowId     = (isset($item->id)) ? $item->id : $cont;
//             //$item->DT_RowData   = (object)array("tipo" => $item->tipo);
//             $cont++;
//         }

//         $vetDados = array(
//             "draw" => req.param('draw'),
//             "recordsTotal" => $respTotal->num_rows(),
//             "recordsFiltered" => ($search != '') ? $resp->num_rows() : $respTotal->num_rows(),
//             "data" => $resp->result()
//         );

//         echo json_encode($vetDados);
//     }