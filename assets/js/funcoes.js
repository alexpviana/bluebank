var interval;
var tempoInterval = 30000;

$(document).ready(function(){
//    if(window.location.hash !== "#/login"){
//        interval = setInterval(verificaLogin,tempoInterval);
//    }
    
    if (!$('#msg_alerta').get(0)) {
        $('body').append('<div id="msg_alerta" title="Aviso"><p class="txt-aviso"></p></div>');
    }
    
    if (!$('#msg_carregando').get(0)) {
        $('body').append('<div id="msg_carregando" title="Carregando"><p>Aguarde, enviando dados...</p></div>');
    }
    
    if (!$('#msg_login').get(0)) {
        $('body').append(
            '<div id="msg_login" title="Login">' + 
                '<div class="container-fluid">' +
                    '<div class="row">' +
                        '<div class="col-xs-12">' +
                            '<form id="form_login" name="form_login">' +
                                '<div class="form-group">' +
                                    '<label for="usuario-login">UsuÃ¡rio</label>' +
                                    '<input type="text" id="usuario-login" name="usuario-login" class="form-control"/>' + 
                                '</div>' + 
                                '<div class="form-group">' +
                                    '<label for="senha-login">Senha</label>' +
                                    '<input type="password" id="senha-login" name="senha-login" class="form-control"/>' + 
                                '</div>' + 
                            '</form>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>'
        );
    }
    
    /*
     * Init dialogs
     */
    
    $("#msg_alerta").dialog({
        resizable : false,
        height : 190,
        modal : true,
        autoOpen : false,
        draggable : false,
        buttons : {
            "Ok" : function() {
                $(this).dialog("close");
            }
        }
    });
    
    $("#msg_carregando").dialog({
        resizable : false,
        height : 130,
        modal : true,
        autoOpen : false,
        draggable : false
    });
    
    $("#msg_login").dialog({
        resizable : false,
        height : 290,
        width: 330,
        modal : true,
        autoOpen : false,
        draggable : false,
        buttons : {
            "Enviar" : function() {
                var dialog = $(this);
                
                if(jQuery.trim($('#usuario-login').val()) === '' || jQuery.trim($('#senha-login').val()) === ''){
                    alerta("Preencha todos os campos");
                }
                else{
                    $.post('login/autenticacao',{"usuario": jQuery.trim($('#usuario-login').val()), "senha": jQuery.trim($('#senha-login').val())},
                        function(data){
                            if(data.status !== 'ok'){
                                alerta(data.msg);
                            }
                            else{
                                dialog.dialog("close");
                                interval = setInterval(verificaLogin,tempoInterval);
                            }
                        },'json'
                    );
                }
            }
        }
    });

    $('.bt-fecha-modal').on('click',function(){
        $("#cont-detalhes").addClass('hidden');
        $("#cont-detalhes").removeClass('show');
        $('#dados tbody tr.selected').toggleClass('selected');
    });
});

function alerta(html){
    $('#msg_alerta .txt-aviso').html(html);
    $("#msg_alerta").dialog('open');
}

alerta("teste");

function alerta_red(msg, redir) {
    $("#msg_alerta").dialog( {
        buttons : {
            "Ok" : function() {
                $(this).dialog("close");
            }
        }
    });
    
    $("#msg_alerta").html(msg);
    $("#msg_alerta").dialog('open');
    $("#msg_alerta").dialog('option', 'buttons', {
        "Ok" : function() {
            window.location = baseUrl + redir;
            $(this).dialog('close');
        }
    });
}

function alerta_reload(msg) {
    $("#msg_alerta").dialog( {
        buttons : {
            "Ok" : function() {
                $(this).dialog("close");
            }
        }
    });
    
    $("#msg_alerta").html(msg);
    $("#msg_alerta").dialog('open');
    $("#msg_alerta").dialog('option', 'buttons', {
        "Ok" : function() {
            window.location.reload();
        }
    });
}

function carregando(){
    $("#msg_carregando").dialog('open');
}

function fechaCarregando(){
    $("#msg_carregando").dialog('close');
}

function alerta_red(msg, redir) {
    $("#msg_alerta").dialog( {
        buttons : {
            "Ok" : function() {
                $(this).dialog("close");
            }
        }
    });
    
    $("#msg_alerta").html(msg);
    $("#msg_alerta").dialog('open');
    $("#msg_alerta").dialog('option', 'buttons', {
        "Ok" : function() {
            window.location = baseUrl + redir;
            $(this).dialog('close');
        }
    });
}

function retornaFormat(n){
    if(n < 10){
        return "0" + n;
    }
    else{
        return n;
    }
}

function verificaLogin(){
    $.get('geral/verificaLogin',function(data){        
        if(window.location.pathname.indexOf('login') == '-1'){
            if(!data.user_id){
                $('#msg_login').dialog('open');
                clearInterval(interval);
            }
        }
    },'json');
}