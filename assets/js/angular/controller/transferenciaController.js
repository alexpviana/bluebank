app.controller("transferenciaController",['$scope','$location','$http','$parse',function($scope,$location,$http,$parse){

    $scope.dados = {
    };

    $scope.breadCrumb = [{
    	"nome" : "Home",
    	"link" : "/#!/home"
    },{
    	"nome" : "Transferência",
    	"link" : "/#!/transferencia"
    }];
}]);