app.controller("mainController",['$scope','$http','$location','$rootScope',function($scope,$http,$location,$rootScope){
    $scope.location    = $location;
    $scope.paginaAtual = $location.path();

    if($location.path() === ""){
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

    // io.socket.on('connect', function(){
    //     io.socket.get('/')
    // });
}]);