var express = require("express");
var router = express.Router();
var sql = require("mssql");

router.post("/", function (req, res) {
  var config = {
    user: "user",
    password: "password",
    server: "0.0.0.0",
    database: "database",
    options: {
      trustServerCertificate: true,
    },
  };

  sql
    .connect(config)
    .then(function (pool) {
      return pool
        .request()
        .input("nombre", sql.VarChar, req.body.nombre)
        .input("usuario", sql.VarChar, req.body.usuario)
        .input("contrasenia", sql.VarChar, req.body.contrasenia)
        .input("admin", sql.VarChar, req.body.admin)
        .query(
          "insert into mdvargas.usuarios (nombre, usuario, contrasenia, estatus, sesion, admin) values (@nombre, @usuario, @contrasenia, 'ACTIVO', 'false', @admin)"
        );
    })
    .then(function (result) {
      // res.send(result.recordset[0]);
      // console.log(result);

      if (result.rowsAffected[0] === 1) {
        res.send({ codigo: 111, mensaje: "Usuario insertado" });
      } else {
        res.send({ codigo: 000, mensaje: "Usuario no encontrado" });
      }
    })
    .catch(function (error) {
      console.log("Error: ", error);
    });
});

module.exports = router;
