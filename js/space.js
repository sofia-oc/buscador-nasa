const NASA = "https://images-api.nasa.gov/search?q=";
const btnBuscar = document.getElementById("btnBuscar");
const contenedor = document.getElementById("contenedor");

let info = [];

// Función para obtener los datos de la API de la NASA
function getDATA(url) {
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            info = data.collection.items;
            console.log(info);
            infoNASA(info);
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

// Función que recibe los datos y los muestra en la página
function infoNASA(array) {
    contenedor.innerHTML = "";

    for (let i = 0; i < array.length; i++) {
        
        const item = array[i];

        // Verifica si el elemento tiene "links" y "data"
        if (item.links && item.data) {
        
            // Desestructuración de datos:
            const {data: [{ title , date_created, description}], links: [{ href }]} = array[i];

            contenedor.innerHTML += ` 
            <div class="col h-100">
                <div class="card">
                    <img src="${href}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">${description}</p>
                    </div>
                    <div class="card-footer">
                        <small class="text-body-secondary">${date_created}</small>
                    </div>
                </div>
            </div>`;

        } else {
            console.log(`El elemento de índice ${i} no tiene datos válidos`, item)
        }
    };
}

document.addEventListener("DOMContentLoaded", function() {
    btnBuscar.addEventListener("click", function(){
        const input = document.getElementById("inputBuscar").value;
        let nasaData = NASA + input;
        getDATA(nasaData);
    });
});