app.controller("mainController",['$scope','$http','$location','$rootScope',function($scope,$http,$location,$rootScope){
    $scope.location    = $location;
    $scope.paginaAtual = $location.path();
    
    console.log($location);
    console.log($location.path());

    if($location.path() == ""){
        $location.path("/home");
    }

    $scope.$watch('paginaAtual',function(newVal,oldVal){
        console.log("paginaAtual",newVal);
        if(newVal == "/home"){
            $.backstretch("images/bg-home.png");
        }
        else{
            $(".backstretch").remove();
        }
    });

    $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams){
            console.log("event",event);
            $scope.paginaAtual = toState.url;
            $scope.location = $location;
            
            console.log("toState",toState);
            console.log("location",$location);
            // $.post('api/validaPath',{url : location.href.split(baseUrl)[1]},function(data){
            //     if(!data.acesso){
            //         event.preventDefault();
            //         $location.path('/acesso-negado');
            //     }
            //     else{
            //         $scope.handlePagina();
            //     }
            // },'json');
        }
    );

    $rootScope.entraPagina = function(pagina){
        $location.path("/" + pagina);
    };

}]);