let db = firebase.firestore();

window.onload = async () => {
    var nums = await db.collection('numeros').get();
    nums.forEach(num => {
        let data = num.data()
        if(data.numeroPagado == 1){
            document.getElementById('vistaPagos').insertAdjacentHTML('beforeend', `
        <div class="list-group">
            <div class="id-list-group">
                <h2>${num.id}</h2>
            </div>
            <div class="data-list-group">
                <p>NOMBRE: ${data.nombre}</p>
                <p>TELEFONO: ${data.telefono}</p>
                <p>REFERENCIA: ${data.referencia}</p>
                <p>TITULAR: ${data.referenciaName}</p>
            </div>
            <div class="buttons-list-group">
                <button type="button" class="btn" onclick="confirmar('${num.id}')">Confirmar</button>
                <button type="button" class="btn btnRojo" onclick="restaurar('${num.id}')">Borrar</button>
            </div>
        </div>`)
        }
    });
}

async function confirmar(num){
    var num = await db.collection('numeros').doc(num).update({numeroPagado: 2})
    if(num === undefined){
        location.reload();
    }
}

async function restaurar(num){
    var num = await db.collection('numeros').doc(num).delete()
    if(num === undefined){
        location.reload();
    }
}