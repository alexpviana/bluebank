app.config(function($stateProvider, $urlRouterProvider,$httpProvider,$locationProvider) {

    $stateProvider        
        .state('/',{
            url: "/",
            templateUrl: 'pages/home.html',
        })
        .state('home', {
            url: '/home',
            templateUrl: 'pages/home.html'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'pages/login.html'
        })
        .state('extrato', {
            url: '/extrato',
            templateUrl: 'pages/extrato.html'
        })
        .state('transferencia', {
            url: '/transferencia',
            templateUrl: 'pages/transferencia.html'
        });
});

app.run(function($rootScope) {
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});