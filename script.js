//Esta función reliza una carga de más productos en el apartado "productos", botón "Cargar más"
let loadMoreBtn = documento.querySelector('#load-more');
let currentItem = 8

loadMoreBtn.onclick = ()=> {
    let boxes = [...document.querySelectorAll('.box-container .box')];
    for(var i = currentItem; i< currentItem + 4; i++){
        boxes[i].style.display = 'inline-block';
    }

    currentItem +=4;
    if(currentItem >=boxes.length) {
        loadMoreBtn.style.display ='none'
    }
}

//Funciónamiento del carrito
const carrito = documento.getElementById('carrito');
const elementos1 =documento.getElementById('lista-1');
const lista = documento.querySelector('#lista-carrito tbody');
const vaciarcarritoBtn = document.getElementById('vaciar-carrito');

//Cargar evento de carrito
cargarEventListeners();

function cargarEventListeners(){
    elementos1.addEventListener('click',comprarElemento);
    carrito.addEventListener('click', eliminarElemento);

    vaciarcarritoBtn.addEventListener('click', vaciarcarrito);
}

//Funcion para comprar elemento
function comprarElemento(e){
    e.preventDefautl();
    if(e.target.classList.contains('agregar-carrito')){
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

//Función leer
function leerDatosElemento(elemento){
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id: elemento.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoElemento);

}


function insertarCarrito(elemento){
    const row = document.createElement('tr');
    row.innerHTML =`
        <td>
            <img src="${elemento.imagen}" width=100 height=150px>
        <td/>
        <td>    
            ${elemento.titulo}    
        <td/>

        <td>
            ${elemento.precio}
        </td>

        <td>
            <a href="#" class="borrar" data-id="${elemento.id}" >x</a>
        </td>
    `;
    lista.appendChild(row);
}

function eliminarElemento(e){
    e.preventDefautl();
    let elemento,
        elementoId;
    if(e.target.classList.contains('borrar')){
        e.target.parentElement.parentElement.remove();
        elemento = e.target.parentElement.parentElement;
        elementoId = elemento.querySelector('a').getAttribute('data-id');
    }
}

function vaciarcarrito(){
    while(lista.firstChild){
        lista.removeChild(lista.firstChild);
    }
    return false;
}
//FUNCIONES QUE HABILITAN EL CARRITO DE COMPRAS





//////////////////////////////////////////////////////









//SCRIPTS DE PRODUCTOS.HTML
//Función que habilita cambio de categoría en productos.html
function filtrar(categoria) {
  const contenedores = document.querySelectorAll('.box-container.categoria');
  contenedores.forEach(el => {
    if (categoria === 'todos') {
      el.style.display = 'grid';
    } else {
      el.style.display = el.classList.contains(categoria) ? 'grid' : 'none';
    }
  });
}

window.onload = () => filtrar('todos');
