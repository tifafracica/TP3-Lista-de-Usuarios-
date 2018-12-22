//recuperar el parametro id de la URL
const urlParams = new URLSearchParams(window.location.search); // esto me permite recuperar todos los parametros que vienen en la URL
const id = urlParams.get("id");

// rcuperar ls nodos con qjuery de mi html
const $name = $('input[name="nombre"]');
const $lastName = $('input[name="apellido"]');
const $telephone = $('input[name="telefono"]');
const $dni = $('input[name="dni"]');
const $email = $('input[name="email"]');

//le pido al servidor la infor del usuario con ese id
$.ajax(`/api/users/${id}`).done(function(user) {
    $name.val(user.name);
    $lastName.val(user.lastName);
    $telephone.val(user.telephone);
    $dni.val(user.dni);
    $email.val(user.email);
});

function esValidaLaInformacion (user) {
    const validarNumero = /^\d+$/; //solo numeros
    const validarEmail = /^(([^<>()\[\]\\.,;:\s@“]+(\.[^<>()\[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
    if(user.name.length > 30 || user.lastName.length > 30){
        $('.modal').modal({
            fadeDuration: 250,
            fadeDelay: 0.80,        
        }),
        $("#insertar-texto").text("no puede tener mas de 30 letras");
        return false;
    };
    if (validarNumero.test(user.dni) === false || validarNumero.test(user.telephone) === false) {
        $('.modal').modal({
            fadeDuration: 250,
            fadeDelay: 0.80,        
        }),
        $("#insertar-texto").text("el campo debe ser numerico");
        return false;
    };
    if (validarEmail.test(user.email) === false) {
        $('.modal').modal({
            fadeDuration: 250,
            fadeDelay: 0.80,        
        }),
        $("#insertar-texto").text("el mail no esta bien escrito");
        return false;
    }
    return true;
    
}

$(document).on("click", "#save-button", function (){
    
    let editUser = {
        name: $name.val(),
        lastName: $lastName.val(),
        telephone: $telephone.val(),
        dni: $dni.val(),
        email: $email.val()
    }

    if(!esValidaLaInformacion(editUser)){
        return
    }

    $.ajax(`http://localhost:3000/api/users/${id}`, {
        method: 'PUT',
        data: editUser
    })
    .done(function () {
        $('.modal').modal({
            fadeDuration: 250,
            fadeDelay: 0.80,   
            closeClass: 'icon-remove'     
        }),
        $("#insertar-texto").text("Usuario Editado");
           
        
    })
    .fail(function(err){
        $('.modal').modal({
            fadeDuration: 250,
            fadeDelay: 0.80,        
        }),
        $("#insertar-texto").text("todo salió muy mal " + err);
    })
})

$(document).on("click", "#btn-atras", function (){
    location.href = ("/users")
})

$(document).on("click", ".icon-remove", function (){
    location.href = ("/users")
})

