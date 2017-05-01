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
        		{"conta_origem" : req.session.ccId },
        		{"conta_destino" : req.session.ccId },
        	]
    	})
        .populate("conta_origem")
        .populate("conta_destino")
        	.sort("data_movimentacao ASC")
        	.exec(function(err,movs){
        		if(err){
	      			return res.serverError(err);
	      		}

	      		var saldo =0;

	      		for(var i=0; i<movs.length; i++){
	      			var objMov = movs[i];
	      			saldo += objMov.valor;

	      			vetData.push({
	      				"id" : objMov.id,
	      				"data_movimentacao" : sails.moment(objMov.createdAt).format("DD/MM/YYYY"),
	      				"origem" : (objMov.tipo == "Depósito") ? "Depósito" : "Ag / CC Fulano",
	      				"historico" : (objMov.tipo == "Depósito") ? "Depósio em Conta" : "Transferência Fulano",
	      				"documento" : objMov.id,
	      				"valor" : "$ " + objMov.valor.toFixed(2).replace(".",","),
	      				"saldo" : "$ " + saldo.toFixed(2).replace(".",",")
	  				});
	      		}

	      		var dados = {
	      			"draw" : req.param("draw"),
	      			"recordsTotal" : movs.length,
	      			"recordsFiltered" : movs.length,
	      			"data" : vetData 
	      		};

	      		console.log(dados);

	      		return res.json(dados);
        	});
	},
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