let placas=[];

get();

function imprimir(){
    var html="";
    for (let i = 0; i < placas.length; i++) {
        let tipo="Aceptado"
        if (placas[i].tipo==0){
            tipo="No Aceptado"
        }
        var html2=`<tr>
        <td id="tbusuario">${placas[i].id}</td>
        <td id="tbusuario">${placas[i].nombre}</td>
        <td id="tbaciertos">${tipo}</td>
        <td id="tbaciertos"><button onclick="Delete(${placas[i].id})">Eliminar</button></td>
        </tr>`
        html=html+html2;
    }
    var divjugador=document.getElementById('tabla');
    divjugador.innerHTML=html;
}

async function get() {
    console.log("GET")

    fetch('/api/placas/all', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {placas=data; imprimir()})
}

async function post() {
    let nombre = document.getElementById("nombre").value;
    var selected = document.getElementById("tipo");
    var tipo = selected.options[selected.selectedIndex].value;
    
    data={
        'placa':nombre,
        'tipo':tipo
    }
    console.log("POST", data)
    fetch('/api/placas/store', {
        headers: {
            'Content-type': 'application/json'
          },
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(resultado => get())
}

async function Delete(id){
    data={
        'id':id,
    }
    console.log("DELETE", data)
    fetch('/api/placas/delete', {
        headers: {
            'Content-type': 'application/json'
          },
        method: 'DELETE',
        body: JSON.stringify(data)
    })
    .then(response => get())
}
