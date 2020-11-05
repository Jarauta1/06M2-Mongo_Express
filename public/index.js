let mensajeResultado = ""

fetch('/api/mesas').then(function(res) {
    return res.json();
}).then(function(data) {

    for (let i = 0; i < data.length; i++) {

        mensajeResultado += `
    <h1>${data[i].material}</h1>
    <p>${data[i].color}</p>
    <p>${data[i].tamanyo}</p>
    <p>${data[i].patas}</p>
    `
    }
    document.getElementById('resultado').innerHTML = mensajeResultado;
})

function addProducto() {

    let material = document.getElementById("material").value
    let color = document.getElementById("color").value
    let tamanyo = document.getElementById("tamaño").value
    let patas = document.getElementById("patas").value

    let mesaNueva = {
        material,
        color,
        tamanyo,
        patas,
    }

    fetch("/api/anyadir", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(mesaNueva),
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {

            for (let i = 0; i < data.length; i++) {

                mensajeResultado += `
            <h1>${data[i].material}</h1>
            <p>${data[i].color}</p>
            <p>${data[i].tamanyo}</p>
            <p>${data[i].patas}</p>
            `
            }
            document.getElementById('resultado').innerHTML = mensajeResultado;

        });
}