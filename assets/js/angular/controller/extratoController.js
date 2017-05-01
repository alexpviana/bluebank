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
    $scope.columns      = [{"data" : "data_movimentacao"},{"data" : "origem"},{"data" : "historico"},{"data" : "documento"},{"data" : "valor"},{"data" : "saldo"}];
    $scope.colunasBusca = ["agencia"];
    $scope.order        = [[1,"ASC"]];
    $scope.modoBusca    = "AND";
}]);