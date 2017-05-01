/**
 * MovimentacaoFinanceiraController
 *
 * @description :: Server-side logic for managing Movimentacaofinanceiras
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getDadosTable : function(req,res){
		return res.json({ req : req.allParams()});
	},
};

// public function getDadosTable(){
//         var tabela = req.param('tabela');
        
//         var start = intval(req.param('start'));
//         var length = intval(req.param('length'));
//         var search = req.param('search[value]');
//         var order = req.param('order');
//         var columns = req.param('columns');

//         var admin = req.param('admin');
//         var url = req.param('url');

//         var ordem = "";

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


//         if(strpos($url,"index.php") !== false){
//             $url = str_replace("index.php/", "", $url);
//         }

//         // if($admin != ''){
//         //     if($admin){
//         //         // verifica nas permissoes se o usuário tem permissao na url passada por parametro
//         //         $this->geral_model->initDb("");
//         //         $respUrl = $this->geral_model->retornaConteudo($url,"link","menu")->row();

//         //         if(!$this->site->checkPermissao($this->session->userdata('user_id'),$respUrl->id)){
//         //             $where .= ($where != '') ? " AND $campoAutor = " .$valCampoAutor : "WHERE $campoAutor = " .$valCampoAutor;
//         //         }
//         //     }
//         // }
//         // else{
//             // $where .= ($where != '') ? " AND $campoAutor = " .$valCampoAutor : "WHERE $campoAutor = " .$valCampoAutor;
//         // }

//         $this->geral_model->initDb($db);

//         $this->geral_model->retornaQuery("SET lc_time_names = 'pt_BR'");
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