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
        .input("usuario", sql.VarChar, req.body.usuario)
        .query(
          "delete from mdvargas.usuarios where usuario = @usuario"
        );
    })
    .then(function (result) {
      console.log(result);

      if (result.rowsAffected[0] !== 0) {
        res.send({"codigo": 111, mensaje: "Usuario eliminado"});
      } else {
        res.send({"codigo": 000, mensaje: "Usuario no encontrado"});
      }
    })
    .catch(function (error) {
      console.log("Error: ", error);
    });
});

module.exports = router;
