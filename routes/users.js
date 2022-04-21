var express = require("express");
var router = express.Router();
var sql = require("mssql");

/* GET users listing. */
router.post("/", function (req, res) {
  // res.send('respond with a resource');

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
        .input("contrasenia", sql.VarChar, req.body.contrasenia)
        .query(
          "select nombre, usuario, estatus, admin from mdvargas.usuarios where usuario = @usuario and contrasenia = @contrasenia"
        );
    })
    .then(function (result) {
      // res.send(result.recordset[0]);
      // console.log(result);

      if (result.recordset.length != 0 ) {
        res.send({"codigo": 111, "mensaje": result.recordset[0]});
      } else {
        res.send({"codigo": 000, "mensaje": "Usuario no encontrado"});
      }
    })
    .catch(function (error) {
      console.log("Error: ", error);
    });
});

module.exports = router;
