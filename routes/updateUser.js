var express = require("express");
var router = express.Router();
var sql = require("mssql");

router.post("/", function (req, res) {
  // console.log("---->>> Entrada: ", req.body);

  var config = {
    user: "user",
    password: "password",
    server: "0.0.0.0",
    database: "database",
    options: {
      trustServerCertificate: true,
    },
  };

  var queryString = "update mdvargas.usuarios set";

  sql
    .connect(config)
    .then(function (pool) {
      let www = pool.request();
      www.input("usuarioBusqueda", sql.VarChar, req.body.usuarioBusqueda);

      if ("nombre" in req.body) {
        // console.log("Validación nombre: ", req.body);
        queryString += " nombre = @nombre";
        www.input("nombre", sql.VarChar, req.body.nombre);
      }
      if ("usuario" in req.body) {
        // console.log("Validación usuario");
        if ("nombre" in req.body) {
          // console.log("Agrega coma al nombre");
          queryString += ",";
        }
        queryString += " usuario = @usuario";
        www.input("usuario", sql.VarChar, req.body.usuario);
      }
      if ("contrasenia" in req.body) {
        // console.log("Validación contraseña");
        if ("usuario" in req.body) {
          // console.log("Agrega coma al usuario");
          queryString += ",";
        }
        queryString += " contrasenia = @contrasenia";
        www.input("contrasenia", sql.VarChar, req.body.contrasenia);
      }
      if ("estatus" in req.body) {
        // este no requiere concatenación con variable anterior ya que solo se utiliza en la desactivación de usuario
        queryString += " estatus = @estatus";
        www.input("estatus", sql.VarChar, req.body.estatus);
      }
      if ("sesion" in req.body) {
        // este no requiere concatenación con variable anterior ya que solo se utiliza en la desactivación de usuario
        queryString += " sesion = @sesion";
        www.input("sesion", sql.VarChar, req.body.sesion);
      }
      if ("admin" in req.body) {
        if ("contrasenia" in req.body) {
          queryString += ",";
        }
        queryString += " admin = @admin";
        www.input("admin", sql.VarChar, req.body.admin);
      }

      queryString = queryString + " where usuario = @usuarioBusqueda";

      // console.log("----->>>> La query: ", queryString);

      www.query(queryString);

      return www;
    })
    .then(function (result) {
      console.log(result);

      if (result.rowsAffected != 0) {
        res.send({ codigo: 111, mensaje: "Usuario actualizado" });
      } else {
        res.send({ codigo: 000, mensaje: "Usuario no encontrado" });
      }
    })
    .catch(function (error) {
      console.log("Error: ", error);
    });
});

module.exports = router;
