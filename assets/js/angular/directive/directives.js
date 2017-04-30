/**
 * Diretivas angular
 */

/**
 * Breadcrumb
 */

app.directive('breadCrumb', function () {
    return {
        restrict: "E",
        scope: "=",
        replace: true,
        templateUrl: "pages/directives/breadcrumb.html",
        link: function (scope, element, attr) {
             
        }
    };
});