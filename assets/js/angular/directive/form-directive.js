app.directive('formEnvio',function($http){
    return {
        restrict: 'A',
//        require: 'ngModel',
        score: '=',
        link: function (scope, element, attrs, ctrl) {
            scope.submitted = false;
            scope.formData = {};
            
            scope.dadosOrigem = angular.copy(scope.dados);

            // Dados da session
            // $.getJSON("api/getUserSession").success(function(data){                
            //     scope.hash = data.hash;
            //     scope.$apply();
            // });
            
            scope.resetVar = function(){
                scope.dados = angular.copy(scope.dadosOrigem);
            };
            
            scope.submitForm = function(){
                scope.submitted=true;

                if(!scope.form_envio.$valid){
                    alerta("Preencha os campos marcados em vermelho");
                }
                console.log("submit",scope.submitted);
            };

            scope.handleForm = function(){
                $(':input').each(function(i,el){
                    if($(el).attr('type') === 'text' || $(el).attr('type') === 'password' || $(el).attr('type') === 'hidden'){
                        scope.formData[$(el).attr('name')] = $(el).val();
                    }
                });

                $('select,textarea').each(function(i,el){
                    scope.formData[$(el).attr('name')] = $(el).val();
                });
            };

            scope.limpaForm = function(){
                $(':input').each(function(i,el){
                    if($(el).attr('type') != 'hidden' || $(el).attr('id') == 'id'){
                        $(el).val('');
                    }
                });

                $('select,textarea').each(function(i,el){
                    $(el).val('');
                });
            };

            scope.enviaForm = function() {
                var urlForm = scope.urlForm;

                carregando();

                $http({
                    method : 'POST',
                    url : urlForm,
                    data : $.param($('#form_envio').serializeArray()), // pass in data as strings
                    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
                .then(function successCallback(data){
                    fechaCarregando();
                    
                    scope.submitted = false;
                    
                    if(scope.callSucesso){
                        scope.sucesso(data);
                    }
                    else{
                        alerta(data.msg);
                    }

                    if(data.status === 'ok'){
                        if(scope.hasTable){
                            scope.table.api().ajax.reload();
                        }
                        scope.resetVar();

                        if (typeof inputSelect === "function") { 
                            inputSelect();
                        }
                    }
                },function errorCallback(data){
                    console.log("error",data);
                });
            };
        }
    };
});