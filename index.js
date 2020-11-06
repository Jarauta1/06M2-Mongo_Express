const express = require("express");
const mongodb = require("mongodb");
const app = express();
let MongoClient = mongodb.MongoClient;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

let db;
MongoClient.connect("mongodb://localhost:27017", function(err, client) {
    if (err !== null) {
        console.log(err)
    } else {
        db = client.db("tienda")
    }
})

app.get("/api/mesas", function(req, res) {
    db.collection("tienda").find().toArray(function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {
            res.send(datos)
        }
    })
})

app.post("/api/anyadir", function(req, res) {

    let mesa = {
        tamanyo: req.body.tamanyo,
        color: req.body.color,
        material: req.body.material,
        patas: req.body.patas,
    }

    db.collection("tienda").insertOne(mesa, function(err, datos) {
        if (err !== null) {
            console.log(err),
                res.send({ mensaje: "Ha habido un error." + err })
        } else {
            res.send(datos)
        }
    })

})

app.put("/api/modificar/:color", function(req, res) {

    let colorModificar = req.params.color



    db.collection("tienda").updateMany({ color: colorModificar }, { $set: { color: "Granate" } }, (function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {
            res.send(datos)
        }
    }))
})

app.delete("/api/borrar/:patas", function(req, res) {

    let patasModificar = parseInt(req.params.patas)

    db.collection("tienda").deleteMany({ patas: patasModificar }, (function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {
            res.send(datos)
        }
    }))
})


app.listen(3000);