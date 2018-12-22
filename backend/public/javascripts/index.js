const $tableUsers = $("#table-users");

$.ajax("/api/users").done(function(data) { //.done es un callback la cual yo accedo con la informacion que me devuelve el endpoint
    buildTableUsers(data); // llamamos la informacion del servidor para poder crear la tabla
});


function createTable() {    
    let header = '<tr><th>Nombre</th><th>Apellido</th><th>Teléfono</th><th>DNI</th><th>Email</th><th></th><th></th></tr>';
    $tableUsers.append(header);    
}

function buildTableUsers(users) { //renderizamos la tabla cada vez que agregamos un usuario nuevo
    for (let i = 0; i < users.length; i++) {
      $tableUsers.append(`
          <tr class="fila-usuario" data-id=${users[i].id}>
              <td>${users[i].name}</td>
              <td>${users[i].lastName}</td>
              <td>${users[i].telephone}</td>
              <td>${users[i].dni}</td>
              <td>${users[i].email}</td>
              <td><button class="btn edit">Editar</button></td>
              <td><button class="btn delete" >Borrar</button></td>
          </tr>
      `);
    }
  }

$(document).on("click", ".btn.delete", function() {
    const self = $(this)
    const id = self
    .parent()
    .parent()
    .data("id") //aqui agarrá el ID

    $.ajax(`/api/users/${id}`, { //primeo nos aseguramos que el servidor elimino el usuario
         method: "delete"
    })
    .done(() => { // segundo lo eliminamos del browser.
        $(this).parent().parent().remove();
    })
    .fail(function (){
        alert('algo explotó')
    })
})

$(document).on("click", "#btn-new-user", function (){
    location.href = ("/users/new")
})


$(document).on("click", ".btn.edit", function(){
   const id = $(this)
  .parent()
  .parent()
  .data("id");
location.href = `/users/edit?id=${id}`;
});


$('#form-container button').click(function (){
    const search = $('#form-container input').val();

    $.ajax('/api/users?search=' + search)
    .done(function (data) {
        $('table tr.fila-usuario').remove();
        buildTableUsers(data);
    })
})
createTable()

