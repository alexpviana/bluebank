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
                $(this).not('.hasDatePicker').datepicker(
                {
                    changeMonth: true,
                    changeYear: true,
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

app.directive('dateTimePicker',function($parse){
    return {
        restrict: 'A',
        require: 'ngModel',
        score: '=',
         link: function (scope, element, attrs, ctrl) {
            element.on('focus',function(){
                $(this).not('.hasDatepicker').datetimepicker(
                {
                    currentText: "Agora",
                    closeText: "OK",
                    prevText: '<<',
                    nextText: '>>',
                    changeMonth: true,
                    changeYear: true,
                    onSelect: function (date) {
                        scope.dados[$(element).parent().find('.date-timepicker').data('campomodel')] = date;
                        ctrl.$setValidity('dateTimePicker', true);

                        if($(element).data('multiplo')){
                            var objeto = $(element).data('objeto');
                            var model = $parse(objeto);

                            model.assign(scope, date);
                        }

                        scope.$apply();
                    }
                }).datepicker('show')
            }).on('changeDate', function(){
              $(this).blur();
            });
        }
    };
});

app.directive('timePicking',function($parse){
    return {
        restrict: 'A',
        require: 'ngModel',
        score: '=',
         link: function (scope, element, attrs, ctrl) {
            element.on('focus',function(){
                console.log($(this));
                $(this).timepicker({
                  showPeriodLabels: false,
                  hourText: 'Hora',
                  minuteText: 'Minuto',
                  minutes: {
                        starts: 0,                // First displayed minute
                        ends: 55,                 // Last displayed minute
                        interval: 5,              // Interval of displayed minutes
                        manual: []                // Optional extra entries for minutes
                    },
                }).timepicker('show');
            });
        }
    };
});

app.directive('datePickerCardapio',function($parse){
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
                $(this).not('.hasDatePicker').datepicker(
                {
                    changeMonth: true,
                    changeYear: true,
                    onSelect: function (date) {
                        scope.dados[$(element).parent().find('.date-picker').data('campomodel')] = date;
                        ctrl.$setValidity('datePicker', true);

                        scope.$apply();
                    },
                    beforeShowDay: function(date){
                      var day = date.getDay();
                      return [day == 1,""];
                    }
                }).datepicker('show')
            }).on('changeDate', function(){
              $(this).blur();
            });
        }
    };
});

/*
 * @directive
 *      maskMoney
 * @html
 *      <input type="text" class="form-control" id="" name="" ng-model="dados.money" mask-money />
 * @scope
 *      $scope.dados = { "money" : "" };
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

app.directive('maskDouble',function(){
    return {
        restrict: 'A',
        require: 'ngModel',
        score: '=',
         link: function (scope, element, attrs, ctrl) {
            element.maskMoney({
                thousands: "",
                decimal: ","
            });
        }
    };
});

/*
 * @directive
 *      autocompleteColaborador
 * @html
 *      <input type="text" id="diretor" name="diretor" class="form-control colaborador" autocomplete-colaborador data-campomodel="id_funcionario" ng-model="dados.funcionario" required=""/>
        <input type="hidden" id="id-diretor" name="diretor_id" data-enviaForm="true" value="{{ dados.id_funcionario }}"/>
 * @scope
 *      $scope.dados = {
            "funcionario" : "",
            "id_funcionario" : ""
        };
 * @descricao
 *      Diretiva que utiliza o autocomplete para buscar o funcionário
 */

app.directive('autocompleteColaborador',function(){
    return {
        restrict: "A",
        scope: "=",
        link: function (scope, element, attrs, ctrl) {
            element.on("focus", function (event) {
                $(this).autocomplete({
                    source: "api/retornaColaboradorAutoComplete",
                    minLength: 3,
                    select: function(e,ui){
                        //$(e.target).parent().find('.colaborador').val(ui.item.id);
                        scope.dados[$(e.target).parent().find('.colaborador').data('campomodel')] = ui.item.id;
                        scope.getDadosUsuarioSelecionado();
                        scope.$apply();
                    },
                    search: function(e,ui){

                    }
                });
            });
        }
    }
});

app.directive('autocompleteFornecedor',function(){
    return {
        restrict: "A",
        scope: "=",
        link: function(scope,element){
            element.on("focus", function (event) {
                $(this).autocomplete({
                    source: "api/retornaFornecedor",
                    minLength: 3,
                    select: function(e,ui){
                        //$(e.target).parent().find('.colaborador').val(ui.item.id);
                        console.log("fornecedor:"+ui.item.id)
                        $('#id_fornecedor').val(ui.item.id);

                        //scope.dados.empresa_id = ui.item.id_empresa;
                        scope.$apply();
                    },
                    search: function(e,ui){

                    }
                });
            });
        }
    }
});
app.directive('autocompleteColaboradorIntranet',function(){
    return {
        restrict: "A",
        scope: "=",
        link: function(scope,element){
            element.on("focus", function (event) {
                $(this).autocomplete({
                    source: "api/retornaUsuarioIntranetAutoComplete",
                    minLength: 3,
                    select: function(e,ui){
                        //$(e.target).parent().find('.colaborador').val(ui.item.id);
                        scope.dados[$(e.target).parent().find('.colaborador').data('campomodel')] = ui.item.id;
                        scope.dados[$(e.target).parent().find('.colaborador').data('objeto')] = ui.item.dados;

                        console.log('campomodel',ui.item.dados,$(e.target).parent().find('.colaborador').data('objeto'));

                        scope.$apply();
                        console.log(scope);
                    },
                    search: function(e,ui){

                    }
                });
            });
        }
    }
});

app.directive('autocompleteColaboradorIntranetRh',function($http){
    return {
        restrict: "A",
        scope: "=",
        link: function(scope,element){
            element.on("focus", function (event) {
                $(this).autocomplete({
                    source: "api/retornaUsuarioGestorIntranetAutoComplete",
                    minLength: 3,
                    select: function(e,ui){
                        console.log(ui.item);
                        scope.dados.usuario = ui.item.dados;
                        scope.dados.funcionario_id = ui.item.id;
                        scope.dados.id_empresa_atual = ui.item.dados.empresa;
                        scope.dados.id_centro_custo_atual = ui.item.dados.centro_custo;
                        scope.dados.cargo_atual = ui.item.dados.cargo;
                        scope.dados.unidade_organizacional_atual = ui.item.dados.unidade_organizacional;

                        $http({
                            method : 'POST',
                            url : "rh/testeHolerite",
                            data : $.param({ "cpf" : ui.item.cpf }),
                            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
                        })
                        .success(function(data) {
                            scope.dados.salario_atual = data.salario;

                            scope.dados[$(e.target).parent().find('.colaborador').data('campomodel')] = ui.item.id;
                            scope.dados[$(e.target).parent().find('.colaborador').data('objeto')] = ui.item.dados;
                            console.log(data);
//                            scope.$apply();
                        });
                    },
                    change: function(e,ui){
                        // console.log("change",$(e.target).parent().find('.colaborador').data('campomodel'));
                        // scope.dados[$(e.target).parent().find('.colaborador').data('campomodel')] = "";
                        // scope.$apply();

                        // scope.verificaId();
                    }
                });
            });
        }
    }
});

app.directive('autocompleteColaboradorRh',function($http){
    return {
        restrict: "A",
        scope: "=",
        link: function(scope,element){
            element.on("focus", function (event) {
                $(this).autocomplete({
                    source: "api/retornaColaboradorAutoComplete",
                    minLength: 3,
                    select: function(e,ui){
                        scope.dados[$(e.target).parent().find('.colaborador').data('campomodel')] = ui.item.id;
                    },
                    search: function(e,ui){

                    }
                });
            });
        }
    }
});

app.directive('autocompleteColaboradorArray',function(){
    return {
        restrict: "A",
        scope: "=",
        link: function(scope,element){
            element.on("focus", function (event) {
                $(this).autocomplete({
                    source: "api/retornaColaboradorAutoComplete",
                    minLength: 3,
                    select: function(e,ui){
                        scope.dados.funcionario[$(e.target).parent().find('.colaborador').data('indexmodel')][$(e.target).parent().find('.colaborador').data('campomodel')] = ui.item.id;
                        scope.$apply();
                    },
                    search: function(e,ui){

                    }
                });
            });
        }
    }
});

app.directive('autocompleteCentroCusto',function(){
    return {
        restrict: "A",
        scope: "=",
        link: function(scope,element){
            element.on("focus", function (event) {
                console.log($())
                $(this).autocomplete({
                    source: "api/retornaCentroCustoAautocomplete?idEmpresa=" + $(".empresa").val(),
                    minLength: 3,
                    select: function(e,ui){
                        $('#id_centro_custo').val(ui.item.id);
//                        scope.dados.funcionario[$(e.target).parent().find('.colaborador').data('indexmodel')][$(e.target).parent().find('.colaborador').data('campomodel')] = ui.item.id;
//                        scope.$apply();
                    },
                    search: function(e,ui){

                    }
                });
            });
        }
    }
});

app.directive('autocompleteGenerico',function(){
    return {
        restrict: "A",
        scope: {
            "tabelaComplete" : "=",
            "colunaComplete" : "=",
            "dbComplete" : "=",
            "obj" : "=",
            "dados" : "="
        },
        link: function(scope,element){
            element.on("focus", function (event) {
                $(this).autocomplete({
                    source: "api/retornaAutocomplete?db=" + scope.dbComplete + "&tabela=" + scope.tabelaComplete + "&coluna=" + scope.colunaComplete,
                    minLength: 3,
                    select: function(e,ui){
                        scope.dados[scope.obj].id = ui.item.id;
                        scope.$apply();
                    },
                    search: function(e,ui){

                    }
                });
            });
        }
    }
});

app.directive('autocompleteCidade',function(){
    return {
        restrict: "A",
        scope: {
            "tabelaComplete": "=",
            "colunaComplete": "=",
            "dbComplete"    : "=",
            "obj"           : "=",
            "dados"         : "=",
            "indexC"        : "="
        },
        link: function(scope,element){
            //scope.$apply();
            

            element.on("focus", function (event) {
                var indexItem = $(element).data('indexmodel');
                $(this).autocomplete({
                    source: "api/retornaAutocompleteCidade?db=" + scope.dbComplete + "&tabela=" + scope.tabelaComplete + "&coluna=" + scope.colunaComplete,
                    minLength: 3,
                    select: function(e,ui){
                        scope.dados.endereco[indexItem].estado = ui.item.dataJson.estado_sigla;
                    },
                    search: function(e,ui){

                    }
                });
            });
        }
    }
});


app.directive('permissaoAdmin',function(){
    return{
        restrict: "E",
        templateUrl: "pages/admin/permissao/permissao.html",
        scope: '='
    };
});

app.directive('containerArquivo',function(){
    return{
        restrict: "E",
        templateUrl: "pages/admin/arquivo.html",
        scope: '=',
        replatce: true
    };
});

app.directive('documento',function(){
    return{
        restrict: "E",
        templateUrl: "pages/directives/documento-directive.html",
        scope: '='
    };
});

app.directive('empresaCentroCusto',function(){
    return {
        restrict: "A",
        scope: {
            "centroCusto" : "="
        },
        link: function(scope,element){
            element.on("change", function (event) {
                $.post('api/retornaCc',{empresa: $(element).val()},
                    function(data){
                        scope.centroCusto = data;
                        scope.$apply();
                        console.log(scope);
                    },'json'
                );
            });
        }
    };
});

app.directive('empresaCcEstabelecimento',function(){
    return {
        restrict: "A",
        scope: {
            "estabelecimento" : "=",
             "centroCusto" : "="
        },
        link: function(scope,element){
            element.on("change", function (event) {
                $.post('api/retornaCc',{empresa: $(element).val()},
                    function(data){
                        scope.centroCusto = data;
                        scope.$apply();
                        console.log(scope);
                    },'json'
                );
                $.post('api/retornaEstabelecimento',{empresa:  $(element).val()},
                    function(data){
                       scope.estabelecimento = data;
                       scope.$apply();
                       console.log(data);
                    },'json'
                );
            });
        }
    };
});

app.directive('menuLateral',function(){
    return {
        restrict: "E",
        scope: "=",
        templateUrl: "pages/sistemas/menu-lateral.html"
    };
});

app.directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished', element.data('emit'),element.data('campo'),element.data('index'));
                });
            }
        }
    }
});

app.directive('estrelaFavorito', function (LogFavoritos) {
    return {
        restrict: "E",
        scope: "=",
        replace: true,
        templateUrl: "pages/directives/estrela-favorito.html",
        link: function (scope, element, attr) {
             $(element).find('a').click(function(){
                 if ($(this).find('i').hasClass('fa-star-o')) {
                    LogFavoritos.logfav(1);
                 }else{
                    LogFavoritos.logfav(-1);
                 }
                 return false;
            });
        }
    }
});

app.directive('dropzone', function () {
    return function (scope, element, attrs) {
        var config, dropzone;
        config = scope[attrs.dropzone];

        dropzone = new Dropzone(element[0], config.options);
        angular.forEach(config.eventHandlers, function (handler, event) {
          dropzone.on(event, handler);
        });

        scope.$on('changeIdItem', function(event, idItem) {
            dropzone.on("processing", function(file) {
                this.options.url = 'api/upload/arquivos/' + $("#id-orcamento-print").val();
            });
        });
    };
});


app.directive('favoritoSistema', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.click(function(e){
                var favorito = "";
                var btClick  = "";

                if($(e.target).hasClass('fa') || $(e.target).hasClass('btn-absolut') || $(e.target).hasClass('label')){
                    btClick  = $(e.target);
                    
                    favorito = ($(e.target).parent().hasClass('label-warning')) ? 1 : 0;
                    
                    $.post('api/favoritoSistema',{'idSistema' : $(e.currentTarget).data('idsistema'),'favorito' : favorito},function(data){
                        if(data.status == 'ok'){
                            if(favorito == 1){
                                scope.sistemas[$(e.currentTarget).data('indexsis')].favorito = 0;
                                btClick.parent().removeClass('label-warning').addClass('label-default');
                            }
                            else{
                                scope.sistemas[$(e.currentTarget).data('indexsis')].favorito = 1;
                                btClick.parent().removeClass('label-default').addClass('label-warning');
                            }
                            scope.$apply();
                        }
                    },'json');
                }
                else{
                    console.log('link');
                }
                e.preventDefault();
            });
        }
    }
});

app.directive('buscaCep', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            $(element).blur(function(e){
                var cep = jQuery.trim($(element).val().replace(/[-_]/g,''));
                if(cep != ''){
                    carregando();
                    $.get('https://api.postmon.com.br/v1/cep/' + cep,function(data){
                        fechaCarregando();
                        if(data){
                            var paiCep = $(element).parent().parent().parent().parent();

                            var endereco = paiCep.find('.cep_endereco');
                            if(endereco.data('indexmodel') === undefined){
                                scope.dados[endereco.data('obj')][endereco.data('campomodel')] = data.logradouro;
                            }
                            else{
                                scope.dados[endereco.data('obj')][endereco.data('indexmodel')][endereco.data('campomodel')] = data.logradouro;    
                            }
                            

                            var bairro = paiCep.find('.cep_bairro');
                            if(bairro.data('indexmodel') === undefined){
                                scope.dados[bairro.data('obj')][bairro.data('campomodel')] = data.bairro;
                            }
                            else{
                                scope.dados[bairro.data('obj')][bairro.data('indexmodel')][bairro.data('campomodel')] = data.bairro;    
                            }                            

                            var cidade = paiCep.find('.cep_cidade');
                            if(cidade.data('indexmodel') === undefined ){
                                scope.dados[cidade.data('obj')][cidade.data('campomodel')] = data.cidade;
                            }
                            else{
                                scope.dados[cidade.data('obj')][cidade.data('indexmodel')][cidade.data('campomodel')] = data.cidade;    
                            }                            

                            var estado = paiCep.find('.cep_estado');

                            if(estado.data('indexmodel') === undefined){
                                scope.dados[estado.data('obj')][estado.data('campomodel')] = data.estado;
                            }
                            else{
                                scope.dados[estado.data('obj')][estado.data('indexmodel')][estado.data('campomodel')] = data.estado;    
                            }

                            bairro.val(data.bairro);
                            cidade.val(data.cidade);
                            endereco.val(data.logradouro);
                            estado.val(data.estado);

                            scope.$apply();
                        }
                    },'json').fail(function(){
                        fechaCarregando();
                        alerta("CEP não encontrado");
                    });    
                }                
            });
        }
    };
});

app.directive('passwordConfirm', ['$parse', function ($parse) {
 return {
    restrict: 'A',
    scope: {
      matchTarget: '=',
    },
    require: 'ngModel',
    link: function link(scope, elem, attrs, ctrl) {
      var validator = function (value) {
        ctrl.$setValidity('match', value === scope.matchTarget || scope.matchTarget == '');
        return value;
      };

      ctrl.$parsers.unshift(validator);
      ctrl.$formatters.push(validator);

      scope.$watch('matchTarget', function(newval, oldval) {
        validator(ctrl.$viewValue);
      });
    }
  };
}]);

app.directive('botaoAtivo', function () {
    return {
        restrict: "A",
        scope: "=",
        replace: true,
        templateUrl: "pages/admin/orcamento/origem.html",
        link: function (scope,element,attr){
            console.log(element);
            $(element).click(function(){
                console.log("teste");
            })
        }
    };
});

app.directive('ckEditor', function() {
  return {
    require: '?ngModel',
    link: function(scope, elm, attr, ngModel) {
      var ck = CKEDITOR.replace(elm[0]);

      console.log(ngModel);

      if (!ngModel) return;

      ck.on('instanceReady', function() {
        ck.setData(ngModel.$viewValue);
      });

      function updateModel() {
          scope.$apply(function() {
              ngModel.$setViewValue(ck.getData());
              CKEDITOR.instances.conteudo.getData();
              CKEDITOR.instances.conteudo.updateElement();
          });
      }

      ck.on('change', updateModel);
      ck.on('key', updateModel);
      ck.on('dataReady', updateModel);

      ngModel.$render = function(value) {
        ck.setData(ngModel.$viewValue);
      };
    }
  };
});

app.directive('imageCrop',function($timeout){
    return {
        restrict: 'A',
        scope: "=",
        link: function(scope,element,attr){
            $timeout(function(){
                $(element).cropper({
                    aspectRatio: scope.ratio,
                    preview: '.img-preview',
                    crop: function(e) {
                        console.log(e.detail.x);
                        console.log(e.detail.y);
                        console.log(e.detail.width);
                        console.log(e.detail.height);
                        console.log(e.detail.rotate);
                        console.log(e.detail.scaleX);
                        console.log(e.detail.scaleY);
                      }
                  });
            },2000);
            
        }
    }
});


/* Diretivas especificas do site */

app.directive('orcamentoCliente', function () {
    return {
        restrict: "E",
        scope: "=",
        replace: true,
        templateUrl: "pages/admin/orcamento/cliente.html",
        link: function (scope,element,attr){
            formWizard();
            //inputSelect();
        }
    };
});

app.directive('orcamentoOrigem', function () {
    return {
        restrict: "E",
        scope: "=",
        replace: true,
        templateUrl: "pages/admin/orcamento/origem.html",
        link: function (scope,element,attr){
            //inputSelect();
        }
    };
});

app.directive('orcamentoDestino', function () {
    return {
        restrict: "E",
        scope: "=",
        replace: true,
        templateUrl: "pages/admin/orcamento/destino.html",
        link: function (scope,element,attr){
            
        }
    };
});

app.directive('itemOrcamento', function () {
    return {
        restrict: "E",
        scope: "=",
        replace: true,
        templateUrl: "pages/admin/orcamento/item_orcamento.html",
        link: function(){
            //inputSelect();
        }
    };
});

app.directive('embalagem', function () {
    return {
        restrict: "E",
        scope: "=",
        replace: true,
        templateUrl: "pages/admin/orcamento/embalagem.html",
        link: function(){
            //inputSelect();
        }
    };
});

app.directive('cobranca', function () {
    return {
        restrict: "E",
        scope: "=",
        replace: true,
        templateUrl: "pages/admin/orcamento/cobranca.html",
        link: function(){
            //inputSelect();
            formWizard();
        }
    };
});

app.directive('orcamento', function () {
    return {
        restrict: "E",
        scope: "=",
        replace: true,
        templateUrl: "pages/admin/orcamento/orcamento.html",
        link: function(){
            //inputSelect();
        }
    };
});

app.directive('cadastroSimples', function () {
    return {
        restrict: "E",
        scope: "=",
        replace: true,
        templateUrl: "pages/admin/cadastro/cadastro-simples.html",
        link: function(scope,element,attr){
            //inputSelect();
        }
    };
});

app.directive('cadastroItemOrcamento', function () {
    return {
        restrict: "E",
        scope: "=",
        replace: true,
        templateUrl: "pages/admin/cadastro/item_orcamento.html",
        link: function(scope,element,attr){
            formWizard();
            //inputSelect();
        }
    };
});