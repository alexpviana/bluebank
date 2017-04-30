/**
 * Diretivas angular
 */

/*
 * @directive
 *      breadCrumb
 * @html
 *      <bread-crumb></bread-crumb>
 * @scope
 *      NA
 * @descricao
 *      Diretiva para inserir o template de breadcrumb nas páginas
 */
app.directive('breadCrumb', function () {
    return {
        restrict: "E",
        scope: "=",
        replace: true,
        templateUrl: "pages/directives/breadcrumb.html"
    };
});

/*
 * @directive
 *      maskMoney
 * @html
 *      <input type="text" class="form-control" id="" name="" ng-model="dados.money" mask-money />
 * @scope
 *      $scope.dados = { "valor" : "" };
 * @descricao
 *      Diretiva para formatar input em valores monetários
 */
app.directive('maskMoney',function(){
    return {
        restrict: 'A',
        score: '=',
         link: function (scope, element, attrs, ctrl) {
            element.maskMoney({
                thousands: ".",
                decimal: ","
            });
        }
    };
});

/*
 * @directive
 *      datePicker
 * @html
 *      <input type="text" class="form-control date-picker" id="data_inicio" name="data_inicio" ng-model="dados.data_inicio" required="" date-picker data-campomodel="data_inicio" data-enviaForm="true"/>
 * @scope
 *      $scope.data_inicio = "";
 * @descricao
 *      Diretiva para mostrar o datepicker do Jquery UI
 */

app.directive('datePicker',function($parse){
    return {
        restrict: 'A',
        require: 'ngModel',
        score: '=',
         link: function (scope, element, attrs, ctrl) {
            // element.on('focus',function(){
            //     $(this).removeClass('datepicker').datepicker().focus();
            //     return false;
            // });

            element.on('focus',function(){
            	console.log("foooocus");
                $(this).not('.hasDatePicker').datepicker(
                {
                    changeMonth: true,
                    changeYear: true,
                    minDate: 0,
                    onSelect: function (date) {
                        
                        scope.dados[$(element).data('campomodel')] = date;
                        ctrl.$setValidity('datePicker', true);

                        if (typeof scope.dados.embalagem !== 'undefined' && scope.dados.embalagem !== null) {
                            scope.dados.embalagem.data_hora_embalagem = date;
                        }

                        if($(element).data('multiplo')){
                            var objeto = $(element).data('objeto');
                            var model = $parse(objeto);

                            model.assign(scope, date);
                        }

                        scope.$apply();
                        console.log(scope.dados);
                    }
                }).datepicker('show')
            }).on('changeDate', function(){
              $(this).blur();
            });






             // element.datepicker({
             //     changeMonth: true,
             //     changeYear: true,
             //     onSelect: function (date) {
             //         scope.dados[$(element).parent().find('.date-picker').data('campomodel')] = date;
             //         ctrl.$setValidity('datePicker', true);
             //         scope.$apply();
             //     }
             // });
        }
    };
});