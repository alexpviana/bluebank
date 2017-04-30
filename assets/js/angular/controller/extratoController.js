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
}]);