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

$('#btn-save').click(function (){
    let newname = $('#name-input').val();
    let newLastName = $('#last-name-input').val();
    let newTelephone = $('#telephone-input').val();
    let newDni = $('#dni-input').val();
    let newEmail =  $('#email-input').val();

    let newUser = {
        name: newname,
        lastName: newLastName,
        telephone: newTelephone,
        dni: newDni,
        email: newEmail
    }

    if(!esValidaLaInformacion(newUser)){
        return;
    }

    $.ajax('http://localhost:3000/api/users', {
        method: 'POST',
        data: newUser
    })
    .done(function (){
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