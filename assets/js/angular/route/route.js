app.config(function($stateProvider, $urlRouterProvider,$httpProvider,$locationProvider) {

    $stateProvider        
        .state('/',{
            url: "/",
            templateUrl: 'pages/home.html',
            requireLogin : false
        })
        .state('home', {
            url: '/home',
            templateUrl: 'pages/home.html',
            requireLogin : false
        })
        .state('login', {
            url: '/login',
            templateUrl: 'pages/login.html',
            requireLogin : false
        })
        .state('extrato', {
            url: '/extrato',
            templateUrl: 'pages/extrato.html',
            requireLogin : true
        })
        .state('transferencia', {
            url: '/transferencia',
            templateUrl: 'pages/transferencia.html',
            requireLogin : true
        });
});

app.run(function ($rootScope,$location,$state) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        console.log("location",$location.path());
        var requireLogin = (toState.requireLogin !== undefined) ? toState.requireLogin : false;
        var logged = false;

        if(requireLogin){
            // Check if user is logged in
            //json funcao retorna se logado ou nao
            if(!logged){
                event.preventDefault();
                $state.go('login');
            }
        }
        else{

        }
    });
});