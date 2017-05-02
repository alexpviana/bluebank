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

app.run(function ($rootScope,$location,$state,$http) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {        
        var requireLogin = (toState.requireLogin !== undefined) ? toState.requireLogin : false;
        var logged = false;

        $(".ui-view").hide();
        $('body').addClass('loading');
        fechaCarregando();

        if(requireLogin){
            // Verifica se usuário está logado
            $http.get('cliente/logado').then(
                function success(resp){
                    logged = resp.data.logado;

                    if(!logged){
                        event.preventDefault();
                        $('.navbar-nav li').removeClass('active');
                        $state.go('login');
                    }

                    $(".ui-view").show();
                    $('body').removeClass('loading');
                },
                function error(err){
                    console.log(err);
                }
            );
        }
        else{
            $('body').removeClass('loading');
        }

        $rootScope.paginaAtual = $location.path();
    });
});