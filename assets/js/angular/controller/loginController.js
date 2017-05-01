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

    $scope.sucesso = function(resp){
        console.log("data",resp.data.status);

        if(resp.data.status){
            carregando();
            $state.go('extrato');
        }
        else{
            alerta(resp.data.msg);
        }
    };

}]);