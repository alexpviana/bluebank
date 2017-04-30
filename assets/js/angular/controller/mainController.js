app.controller("mainController",['$scope','$http','$location','$rootScope',function($scope,$http,$location,$rootScope){
    $scope.location    = $location;
    $scope.paginaAtual = $location.path();

    if($location.path() == ""){
        $location.path("/home");
    }

    $scope.$watch('paginaAtual',function(newVal,oldVal){
        if(newVal == "/home"){
            $.backstretch("images/bg-home.png");
        }
        else{
            $(".backstretch").remove();
        }
    });

    $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams){
            $scope.paginaAtual = toState.url;
            $scope.location = $location;

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

    $scope.$on('sailsSocket:connect', function(ev, data) {
        console.log("connect",ev);
        // sailsSocket.get(
        // '/get_user', {},
        // function(response) {
        //     $scope.team_id = response.user;
        //     sailsSocket.get(
        //     '/status_update?sort=createdAt%20ASC&team_id='+$scope.team_id, {},
        //     function(response) {
        //         $scope.updates = response;
        //         $log.debug('sailsSocket::/status_update', response);
        //     });
        // });
    });

}]);