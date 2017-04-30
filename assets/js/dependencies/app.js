var app = angular.module("blue_bank",['ngRoute','ui.mask','ui.router']);

app.filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);

app.filter('encode_url', function(){
    return function(text) {
        return encodeURIComponent(text);
    };
});