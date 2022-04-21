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
        .query(
          "select nombre, usuario, estatus, admin from mdvargas.usuarios"
        );
    })
    .then(function (result) {
      console.log(result);

      if (result.recordset.length != 0 ) {
        res.send({"codigo": 111, "mensaje": result.recordset});
      } else {
        res.send({"codigo": 000, "mensaje": "Usuarios no encontrados"});
      }
    })
    .catch(function (error) {
      console.log("Error: ", error);
    });
});

module.exports = router;
