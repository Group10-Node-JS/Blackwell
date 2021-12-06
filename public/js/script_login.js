//Código de validação do CPF

function _cpf(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '')
  if (cpf == '') return false
  if (
    cpf.length != 11 ||
    cpf == '00000000000' ||
    cpf == '11111111111' ||
    cpf == '22222222222' ||
    cpf == '33333333333' ||
    cpf == '44444444444' ||
    cpf == '55555555555' ||
    cpf == '66666666666' ||
    cpf == '77777777777' ||
    cpf == '88888888888' ||
    cpf == '99999999999'
  )
    return false
  add = 0
  for (i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i)
  rev = 11 - (add % 11)
  if (rev == 10 || rev == 11) rev = 0
  if (rev != parseInt(cpf.charAt(9))) return false
  add = 0
  for (i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i)
  rev = 11 - (add % 11)
  if (rev == 10 || rev == 11) rev = 0
  if (rev != parseInt(cpf.charAt(10))) return false
  return true
}
function validarCPF(el) {
  if (!_cpf(el.value)) {
    alert('CPF inválido!' + el.value)
    // apaga o valor
    el.value = ''
  }
}

//Código de validação dos campos do login
$('#formContato').submit(function () {
  var usuario = $('#usuario')
  var email = $('#email')
  var cpf = $('#cpf')
  var erro = $('.alert')
  var campo = $('#campo-erro')

  console.log(usuario.val())

  //para esconder o campo que está mostrando o erro. Removendo o elemento da tela sempre que tentar submeter o formulário.
  erro.addClass('d-none')
  $('.is-invalid').removeClass('.is-invalid')

  //se o usuário não preencher o formulário corretamente, aparecerá um alerta abaixo do button enviar/limpar que informará o erro.
  //valida o campo usuario
  if (usuario.val() == '') {
    erro.removeClass('d-none')
    campo.html('usuario') //nome do campo que não foi preenchido
    usuario.focus()
    usuario.addClass('is-invalid')
    return false
  }

  //valida o campo email
  if (email.val() == '') {
    erro.removeClass('d-none')
    campo.html('email') //nome do campo que não foi preenchido
    email.focus()
    email.addClass('is-invalid')
    console.log('validando o email')
    console.log(email.val())
    return false
  }

  //valida cpf
  if (cpf.val() == '') {
    erro.removeClass('d-none')
    campo.html('cpf') //nome do campo que não foi preenchido
    cpf.focus()
    cpf.addClass('is-invalid')
    return false
  }

  return true
})
