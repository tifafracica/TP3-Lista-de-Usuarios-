const express = require("express");
const router = express.Router();
let contador = 4;

const users = [
    {
      id: 1,
      name: "Ada",
      lastName: "Lovelace",
      telephone: "1234567890",
      dni: 456789,
      email: "contacto@gmail.com"
    },
    {
      id: 2,
      name: "Grace",
      lastName: "Hopper",
      telephone: "087654321",
      dni: 456789,
      email: "contacto@hotmail.com"
    },
    {
      id: 3,
      name: "Pepito",
      lastName: "De Los Palotes",
      telephone: "087655644",
      dni: 43562728,
      email: "contacto@hotmail.com"
    }
];

 

router.get("/users", (req, res) => {    
  //para acceder a los query param usamos req.query
  let search = req.query.search;
  
  if (search && search.length > 0) {
    let usersFiltrados = [];
    search = search.toLowerCase();

    for (let i = 0; i < users.length; i++) {
      const nombre = users[i].name.toLowerCase();
      const apellido = users[i].lastName.toLowerCase();

      if (nombre.indexOf(search) >= 0 || apellido.indexOf(search) >= 0){
        usersFiltrados.push(users[i]);
      }
    }
    return res.json(usersFiltrados);
  }
    res.json(users)
});


router.delete("/users/:id", (req, res) => { 
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id == userId);
  
  users.splice(userIndex, 1);
  console.log(users)
  res.json(users); // es el estado actual de Users 
  
});

router.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id)
  const user =  users.find(user => user.id === userId)
  res.json(user);

});

function esValidaLaInformacion (user) {
  const validarNumero = /^\d+$/; //solo numeros
  const validarEmail = /^(([^<>()\[\]\\.,;:\s@“]+(\.[^<>()\[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      
  if(user.name.length > 30 || user.lastName.length > 30){
      return false;
  };
  if (validarNumero.test(user.dni) === false){  
      return false;
  };
  if(validarNumero.test(user.telephone) === false) {
    return false;
  };
  if (validarEmail.test(user.email) === false) {
      return false;
  };
  return true;  // aqui los campos son todoa validos.
}

router.put("/users/:id", (req, res) => {
  const idUser = parseInt(req.params.id)
  const editUser = req.body;

  //buscamos el usuario que queremos editar
  const myUser = users.find(u => u.id === idUser)
  
  // validamos la informacion editada
  if (!esValidaLaInformacion(editUser)) {
    return res.status(418).end("algo hiciste mal")
  }
  
  //editamos las propiedades
  myUser.name = req.body.name || myUser.name;
  myUser.lastName = req.body.lastName || myUser.lastName;
  myUser.telephone = req.body.telephone || myUser.telephone;
  myUser.dni = req.body.dni || myUser.dni;
  myUser.email = req.body.email || myUser.email; 
  console.log(users)
  res.json(users)
});



router.post('/users', function (req, res) { // aqui agregamos Usuarios
  const newUser = req.body; //traemos la informacion 

  // validamos la informacion agregada
  if (!esValidaLaInformacion(newUser)) {
    return res.status(418).end("algo hiciste mal")
  }

  newUser.id = contador++;
  // agrego el usuario al array global
  users.push(newUser);
  console.log(users)
  // le respondemos con el array de objetos
  res.json(newUser);
});


module.exports = router;