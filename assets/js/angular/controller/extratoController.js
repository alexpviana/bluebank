app.controller("extratoController",['$scope','$location','$http','$parse',function($scope,$location,$http,$parse){

    $scope.dados = {
    };

    $scope.breadCrumb = [{
    	"nome" : "Home",
    	"link" : "/#!/home"
    },{
    	"nome" : "Extrato",
    	"link" : "/#!/extrato"
    }];

    /*
     * Data Table
     */
    $scope.db           = "bluebank";
    $scope.tabela       = "movimentacaofinanceira";
    $scope.tabelaView   = "movimentacaofinanceira";
    $scope.tabelaEdit   = "movimentacaofinanceira";

    $scope.table        = "";
    $scope.urlDataTable = "movimentacaofinanceira/getDadosTable";
    $scope.columns      = [{ "data" : "id"}];
    $scope.colunasBusca = ["agencia"];
    $scope.order        = [[0,"DESC"]];
    $scope.modoBusca    = "AND";
    // $scope.columDefs    =
    // [       
    //     {
    //         "targets" : 0,
    //         "render" : function ( data, type, full, meta ) {
    //             return '';
    //         }
    //     }, 
    //     {
    //         "targets" : 1,
    //         "render" : function ( data, type, full, meta ) {
    //             return '<i class="fa fa-eye fa-lg mostra-detalhe" data-id="' + data + '"></i>';
    //         }
    //     }, 
    //     {
    //         "targets": 7,
    //         "data"   : "data_cadastro",
    //         "className": 'dt-body-center',
    //         "render" : function ( data, type, full, meta ) {
    //             if(data){
    //                 var dtFormat = moment(data);
    //                 return dtFormat.format("DD/MM/YYYY HH:mm");
    //             }
    //         }
    //     },
    //     {
    //         "targets": 8,
    //         "data"   : "em_vistoria",
    //         "className" : "cont-botao dt-body-center",
    //         "render" : function ( data, type, full, meta ) {
    //             if(data){
    //                 return '<i class="fa fa-check bt-status" aria-hidden="true" data-ativo="1" data-tabela="' + $scope.tabela + '" data-campo="em_vistoria" data-id="' + meta.settings.aoData[meta.row].nTr.id + '"></i>';
    //             }
    //             else{
    //                 return '<i class="fa fa-times bt-status" aria-hidden="true" data-ativo="0" data-tabela="' + $scope.tabela + '" data-campo="em_vistoria" data-id="' + meta.settings.aoData[meta.row].nTr.id + '"></i>';
    //             }
    //         }
    //     },
    //     {
    //         "targets": 9,
    //         "data"   : "aproveitamento",
    //         "className" : "cont-botao dt-body-center",
    //         "render" : function ( data, type, full, meta ) {
    //             if(data){
    //                 return '<i class="fa fa-check bt-status" aria-hidden="true" data-ativo="1" data-tabela="' + $scope.tabela + '" data-campo="aproveitamento" data-id="' + meta.settings.aoData[meta.row].nTr.id + '"></i>';
    //             }
    //             else{
    //                 return '<i class="fa fa-times bt-status" aria-hidden="true" data-ativo="0" data-tabela="' + $scope.tabela + '" data-campo="aproveitamento" data-id="' + meta.settings.aoData[meta.row].nTr.id + '"></i>';
    //             }
    //         }
    //     },
    //     {
    //         "targets": $scope.params.listaOrcamento.target,
    //         "data"   : $scope.params.listaOrcamento.targetField,
    //         "className" : "cont-botao dt-body-center",
    //         "render" : function ( data, type, full, meta ) {
    //             if(data){
    //                 return (data == 1) ? '<i class="fa fa-check fa-ativo bt-status" aria-hidden="true" data-ativo="1" data-tabela="' + $scope.tabela + '" data-campo="ativo" data-id="' + meta.settings.aoData[meta.row].nTr.id + '"></i>' : '<i class="fa fa-times fa-ativo bt-status" aria-hidden="true" data-ativo="0" data-tabela="' + $scope.tabela + '" data-campo="ativo" data-id="' + meta.settings.aoData[meta.row].nTr.id + '"></i>';
    //             }
    //         }
    //     }
    // ];
}]);