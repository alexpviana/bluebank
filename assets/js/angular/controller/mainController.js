app.controller("mainController",['$scope','$http','$location','$rootScope',function($scope,$http,$location,$rootScope){
    $scope.location = $location;
    
    console.log($location);
    console.log($location.path());

    if($location.path() == ""){
        $location.path("/home");
    }

    // $rootScope.$on('$stateChangeStart',
    //     function(event, toState, toParams, fromState, fromParams){
    //         $.post('api/validaPath',{url : location.href.split(baseUrl)[1]},function(data){
    //             if(!data.acesso){
    //                 event.preventDefault();
    //                 $location.path('/acesso-negado');
    //             }
    //             else{
    //                 $scope.handlePagina();
    //             }
    //         },'json');
    //     }
    // );

}]);