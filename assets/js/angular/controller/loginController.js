app.controller("loginController",['$scope','$location','$http','$parse','$state',function($scope,$location,$http,$parse,$state){

    $scope.dados = {
    	"agencia" : "",
    	"conta_corrente" : "",
    	"senha" : ""
    };

    $scope.breadCrumb = [{
    	"nome" : "Home",
    	"link" : "/#!/home"
    },{
    	"nome" : "Login",
    	"link" : "/#!/login"
    }];

    /*
     * Form - formEnvio Directive
     */
    $scope.hasTable     = false;
    $scope.callSucesso  = true;
    $scope.urlForm      = "login/auth";

    $scope.sucesso = function(data){
        console.log("data",data.status);
        
        if(data.status){
            $state.go('extrato');
        }
        else{
            alerta("Houve um erro, verifique as informações e tente novamente");
        }
    };

}]);