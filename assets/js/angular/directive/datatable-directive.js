app.directive('dtTable',function($http){
    return {
        restrict: 'A',
        score: '=',
        link: function (scope, element, attrs, ctrl) {
            scope.vetItens = [];
            scope.itensBusca = {};

            angular.forEach($("input[type='text'],input[type='hidden'],select"),function(el,i){
                if($(el).data().enviaform){
                    var auxItem = {};
                    auxItem[$(el).attr('name')] = $(el).val();
                    scope.vetItens.push(auxItem);
                }
            });

            scope.itensBusca["itens"] = scope.vetItens;

            scope.table = $(element).dataTable( {
                "ajax": {
                    url : scope.urlDataTable,
                    error : function(data){
                        console.log('error',data);
                    },
                    type: "POST",
                    "data": function(d){
                        var insereBusca = false;
                        scope.vetItens = new Array();
                        
                        angular.forEach($("input[type='text'],input[type='hidden'],select,input[type='checkbox']"),function(el,i){
                            insereBusca = false;
                            
                            if($(el).data().enviaform){
                                insereBusca = true;
                                if(($(el).attr('type') == 'checkbox' && !$(el).is(":checked"))){
                                    insereBusca = false;
                                }
                            }

                            if(insereBusca){
                                var auxItem = {};
                                auxItem[$(el).attr('name')] = $(el).val();
                                scope.vetItens.push(auxItem);
                            }
                        });

                        scope.itensBusca["itens"] = scope.vetItens;

                        d.itensBusca = scope.itensBusca;
                        d.tabela = scope.tabelaView;
                        d.db = scope.db;
                        d.colunasBusca = scope.colunasBusca;

                        if (typeof scope.admin !== 'undefined' || scope.admin !== null) {
                            d.admin = scope.admin;
                        }

                        if (typeof scope.modoBusca !== 'undefined' || scope.modoBusca !== null) {
                            d.modoBusca = scope.modoBusca;
                        }

                        if (typeof scope.url !== 'undefined' || scope.url !== null) {
                            d.url = scope.url;
                        }

                        if (typeof scope.busca != 'undefined') {
                            if(scope.busca.length > 0){
                                for(var i=0;i<scope.busca.length;i++){
                                    d[scope.busca[i].nome] = scope.busca[i].valor;
                                }
                            }
                        }

                        d.campoAutor = (typeof scope.campoAutor != 'undefined') ? scope.campoAutor : "autor_id";                        
                    }
                },
                "processing": true,
                "serverSide": true,
                "columns": scope.columns,
                "language": {
                    "url": "js/idioma/portugues.json"
                },
                "responsive": true,
                "success": function(data){
                },
                "error": function (xhr, error, thrown) {
                    console.log(xhr, error, thrown);
                },
                "columnDefs": scope.columDefs,
                "order": scope.order,
                "pageLength": 100,
                "dom": '<“H”lfrp>t<“F”ip>'
            });

            /*
            * Clique nas linhas
            */

            if(scope.customClick === undefined){
                $('#dados tbody').on( 'click', 'tr td:not(:last-child)', function (e) {
                	console.log($(e.currentTarget).hasClass("sorting_1"),$(e.target));
                    if(!$(e.currentTarget).hasClass("sorting_1")){
                        $('#dados tbody tr.selected').toggleClass('selected');
                            $(this).parent().toggleClass('selected');
                            var trAtual = $(this).parent();

                            scope.idItemDt = $(e.currentTarget).parent().attr('id');

                            scope.resetVar();
                            scope.$apply();

                            if($(e.currentTarget).parent().hasClass('selected')){
                               var tabela = scope.tabelaView
                               if(scope.tabelaViewJoins){
                                  tabela = scope.tabelaViewJoins;
                               }

                               $http({
                                   method : 'POST',
                                   //url : 'admin/getItemTable',
                                   url : "api/impressao/" + $(e.currentTarget).parent().attr('id') + "/id/" + tabela + "/" + scope.db + "/" + scope.pasta + "/" + scope.pagina + "/false",
                                   data : $.param({ idItem: $(e.currentTarget).parent().attr('id'), tabela: scope.tabelaView, campo: "id", db : scope.db }),
                                   headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
                               })
                               .success(function(data) {
                                    $("#cont-detalhes").addClass('show');
                                    $("#cont-detalhes").removeClass('hidden');

                                    $("#conteudo-dialog").html(data);

                                   scope.dados.ferias = data;
                                   scope.dadosInsert = data;
                               });
                            }
                            else{
                               scope.resetVar();
                               scope.$apply();
                            }
                    }
                } );
            }
            else{
                console.log(scope.tdClick);
                $('#dados tbody').on( 'click', scope.tdClick, scope.customClick);
            }

            if(scope.clickBotao !== undefined){
                $("#dados tbody").on('click','tr td:last-child span',scope.clickBotao);
            }
        }
    };
});



