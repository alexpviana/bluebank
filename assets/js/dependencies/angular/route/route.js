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

        // Verifica se usuário está logado
        $http.get('cliente/logado').then(
            function success(resp){
                $('body').removeClass('loading');

                logged = resp.data.logado;

                if(!logged){
                    if(requireLogin){
                        event.preventDefault();
                        $('.navbar-nav li').removeClass('active');
                        $state.go('login');
                    }
                    
                    $(".navbar-right").html('<a class="btn btn-default btn-entrar" href="/#!/login">Acesse sua conta</a>');
                }else{
                    $(".navbar-right").html('<a class="btn btn-default btn-entrar" href="cliente/logout">Sair</a>');
                }

                $(".ui-view").show();
                $('body').removeClass('loading');
            },
            function error(err){
                console.log(err);
            }
        );

        $rootScope.paginaAtual = $location.path();
    });
});