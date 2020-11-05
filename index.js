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

    db.collection("tienda").insertOne(tienda, function(err, respuesta) {
        if (err !== null) {
            console.log(err),
                res.send({ mensaje: "Ha habido un error." + err })
        } else {
            db.collection("tienda").find().toArray(function(err, datos) {
                if (err !== null) {
                    console.log(err)
                    res.send({ mensaje: "Error:" + err })
                } else {
                    console.log(datos)
                    res.send(datos)
                }
            })
        }
    })

})


app.listen(3000);