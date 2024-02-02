var nome = $("#usunome");
var nomecompleto = $("#usunomecompleto");
var cpf = $("#usucpf");
var email = $("#usuemail");
var celular = $("#usucelular");
var empresa = $("#fk_empresa").val(empresa).prop('disabled', true);
var idEmpresa = $("#pk_empresa").val(id).prop('disabled', true);
var listaDados = [];
var salvo = 0;

//mascara de formatacao para numero de celular.
$(document).ready(function(){
    var celularInput = $("#usucelular")
    celularInput.on('input', function () {
        var numero = $(this).val()
    
        var numeroLimpo = numero.replace(/[^\d]/g, '')
    
        if (numeroLimpo.length <= 2) {
            $(this).val('(' + numeroLimpo);
        } else if (numeroLimpo.length <= 3) {
            $(this).val('(' + numeroLimpo.substring(0, 2) + ') ' + numeroLimpo.substring(2));
        } else if (numeroLimpo.length <= 7) {
            $(this).val('(' + numeroLimpo.substring(0, 2) + ') ' + numeroLimpo.substring(2, 3) + ' ' + numeroLimpo.substring(3));
        } else {
            $(this).val('(' + numeroLimpo.substring(0, 2) + ') ' + numeroLimpo.substring(2, 3) + ' ' + numeroLimpo.substring(3, 7) + '-' + numeroLimpo.substring(7));
        }
    })
})

$(document).ready(function(){
    var cpf = $("#usucpf");
    cpf.on('input', function () {
        var numero = $(this).val()
    
        var numeroLimpo = numero.replace(/[^\d]/g, '');
    
         // Aplica a formatação 123.456.789-10
         if (numeroLimpo.length <= 3) {
            $(this).val(numeroLimpo);
        } else if (numeroLimpo.length <= 6) {
            $(this).val(numeroLimpo.substring(0, 3) + '.' + numeroLimpo.substring(3));
        } else if (numeroLimpo.length <= 9) {
            $(this).val(numeroLimpo.substring(0, 3) + '.' + numeroLimpo.substring(3, 6) + '.' + numeroLimpo.substring(6));
        } else {
            $(this).val(numeroLimpo.substring(0, 3) + '.' + numeroLimpo.substring(3, 6) + '.' + numeroLimpo.substring(6, 9) + '-' + numeroLimpo.substring(9));
        }
    })
})

function toggleForm() {
    $("#usunome").val('');
    $("#usunomecompleto").val('');
    $("#usucpf").val('');
    $("#usuemail").val('');
    $("#usucelular").val('');
}

function salvaDados() {
    salvo = 0
    var elemento = [nome, nomecompleto, cpf, email, celular]
    if (elemento[2].val()) {
        var res = elemento[2].val().replace(/[^\d]/g, '');
        $(`.cpfOculto`).html(res)
        if (!/^\d{11}$/.test(res)) {
            elemento[2].click(function () {
                $(this).val('')
                elemento[2].css({ 'border': '' })
            })
            elemento[2].css({ 'border': '1px solid red' })
            $("#usucpf").val('CPF Inválido!');
            return;
        }
    }

    if (elemento[3].val()) {
        var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(elemento[3].val())) {
            elemento[3].click(function () {
                $(this).val('')
                elemento[3].css({ 'border': '' })
            })
            elemento[3].css({ 'border': '1px solid red' })
            $("#usuemail").val('Email Inválido!');
            return;
        }
    }

    if (elemento[4].val()) {
        var numero = elemento[4].val().replace(/[^\d]/g, '');
        var regexCelular = /^(\d{2})?\d{8,9}$/;
        if (!regexCelular.test(numero)) {
            elemento[4].click(function () {
                $(this).val('')
                elemento[4].css({ 'border': '' })
            })
            elemento[4].css({ 'border': '1px solid red' })
            $("#usucelular").val('Celular Inválido');
            return;
        }
    }


    var dadosPreenchidos = true;
    for (let i = 0; i < elemento.length; i++) {
        if (elemento[i].val() === '') {
            dadosPreenchidos = false
            elemento[i].css({ 'border': '1px solid red' })
            elemento[i].click(() => {
                elemento[i].css({ 'border': '' })
            })
        } else {
            elemento[i].css({ 'border': '' })
        }
    }
    salvandoDados(dadosPreenchidos)
}

function salvandoDados(dadosPreenchidos) {
    salvo++
    if (dadosPreenchidos && salvo === 1) {
        listaDados = []
        var elemento = [nome, nomecompleto, cpf, email, celular, empresa, idEmpresa]
        for (let i = 0; i < elemento.length; i++) {
            listaDados.push(elemento[i].val())
        }
        localStorage.setItem('dados', JSON.stringify(listaDados));
        enviaUsuario(localStorage.getItem('dados'))
    }
}


function enviaUsuario() {
    /*$.ajax({
      type: 'post',
      url: apiAddress + '/usuario',
      data: {
        'usunome':listaDados[0],
        'usunomecompleto':listaDados[1],
        'usucpf':$(`.cpfOculto`).html(),
        'usuemail':listaDados[3],
        'usutelefone':null,
        'usucelular':listaDados[4],
        'fk_grupousuario':4,
        'usuativo':1,
        'fk_empresa':listaDados[6],
      },
      dataType: 'JSON',
    }).done(function(data){
      alert('Cadastrado Com Sucesso!')
      toggleForm()
    })*/

    alert('Cadastrado Com Sucesso!')
    toggleForm()
  }