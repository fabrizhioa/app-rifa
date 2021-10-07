var selectPoint = '';
const db =  firebase.firestore();
function viewForm() {
    document.getElementById('infoBox').style.display = 'none';
    document.getElementById('formBox').style.display = 'grid';
    document.getElementById('numberBox').style.display = 'block';
    chargeNumbers();
}

function viewInfo() {
    document.getElementById('infoBox').style.display = 'block';
    document.getElementById('formBox').style.display = 'none';
    document.getElementById('numberBox').style.display = 'none';
    document.getElementById('numberContentBox').innerHTML = "";
    selectNumber('return')
}

function selectNumber(action) {
    selector = document.getElementById('selectNum')
    if (selectPoint != '') {
        selectPoint.style.background = "darkgrey"
    }
    if (action != 'return') {
        if (selector.value != '') {
            selectPoint = document.querySelector('.number[numact="num' + selector.value + '"]')
            selectPoint.style.background = "cornflowerblue"
        }
    }
}

async function chargeNumbers() {
    let cont = new Array(100);
    let nums = await db.collection('numeros').get()
    nums.forEach(num => {
        let datos = num.data()
        cont[num.id] = datos.numeroPagado
    });
    let max = 100
    for (let int = 1; int <= max; int++) {
        if (cont[int] == 1) {
            document.getElementById('numberContentBox').insertAdjacentHTML('beforeend', '<div class="number tramite">' + int + '</div>')
        }else if(cont[int] == 2){
            document.getElementById('numberContentBox').insertAdjacentHTML('beforeend', '<div class="number vendido">' + int + '</div>')
        } else {
            document.getElementById('numberContentBox').insertAdjacentHTML('beforeend', '<div class="number" numact="num' + int + '">' + int + '</div>')
            document.getElementById('selectNum').insertAdjacentHTML('beforeend', '<option value="' + int + '">' + int + '</option>')
        }
    }
}


async function submitNum() {
    if(document.getElementById('inputName').value == '' || document.getElementById('inputPhone').value == '' || document.getElementById('inputAddress').value == '' || document.getElementById('selectNum').value == ''){
        return;
    }
    if(document.getElementById('inputReferenceId').value == '' || document.getElementById('inputReferenceName').value == ''){
        return;
    }
    let db = firebase.firestore();
    const response = await db.collection('numeros').doc(document.getElementById('selectNum').value).set({
        'nombre':document.getElementById('inputName').value,
        'telefono':document.getElementById('inputPhone').value,
        'direccion':document.getElementById('inputAddress').value,
        'numeroComprado':document.getElementById('selectNum').value,
        'numeroPagado':1,
        'referencia': document.getElementById('inputReferenceId').value,
        'referenciaName': document.getElementById('inputReferenceName').value
    })
    if(response === undefined){
        document.getElementById('responseCard').style.display = "grid"
        document.getElementById('titleCardFloat').textContent = "COMPLETADO"
        document.getElementById('textCardFloat').textContent = "Ya adquiriste el numero"
    }else{
        document.getElementById('responseCard').style.display = "grid"
        document.getElementById('titleCardFloat').textContent = "ERROR"
        document.getElementById('textCardFloat').textContent = " El numero ya fue adquirido por otra persona."
    }
}

function refreshPage(){
    document.getElementById('card-float').styles.display = 'none'
}