app.controller("transferenciaController",['$scope','$location','$http','$parse',function($scope,$location,$http,$parse){

    $scope.dados = {
    	"data_transferencia" : "",
    	"agencia" : "",
    	"conta_corrente" : "",
    	"valor" : "",
    };

    $scope.breadCrumb = [{
    	"nome" : "Home",
    	"link" : "/#!/home"
    },{
    	"nome" : "Transferência",
    	"link" : "/#!/transferencia"
    }];

    // Evento Blur - campo CPF
    // Site com CPFs válidos para testes: https://www.geradordecpf.org/
    $scope.checkCpf = function(ev){    	
    	console.log($scope.validaCPF($(ev.currentTarget).val()));
    };

    // Validacao de CPF
    $scope.validaCPF = function(cpf){
    	console.log(cpf);
    	cpf = cpf.replace(/[^\d]+/g,'');    
	    if(cpf == '') return false; 
	    // Elimina CPFs invalidos conhecidos    
	    if (cpf.length != 11 || 
	        cpf == "00000000000" || 
	        cpf == "11111111111" || 
	        cpf == "22222222222" || 
	        cpf == "33333333333" || 
	        cpf == "44444444444" || 
	        cpf == "55555555555" || 
	        cpf == "66666666666" || 
	        cpf == "77777777777" || 
	        cpf == "88888888888" || 
	        cpf == "99999999999")
	            return false;       
	    // Valida 1o digito 
	    add = 0;    
	    for (i=0; i < 9; i ++)       
	        add += parseInt(cpf.charAt(i)) * (10 - i);  
	        rev = 11 - (add % 11);  
	        if (rev == 10 || rev == 11)     
	            rev = 0;    
	        if (rev != parseInt(cpf.charAt(9)))     
	            return false;       
	    // Valida 2o digito 
	    add = 0;    
	    for (i = 0; i < 10; i ++)        
	        add += parseInt(cpf.charAt(i)) * (11 - i);  
	    rev = 11 - (add % 11);  
	    if (rev == 10 || rev == 11) 
	        rev = 0;    
	    if (rev != parseInt(cpf.charAt(10)))
	        return false;       
	    return true;   
    };
}]);