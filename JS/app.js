const stockProductos = [
    { id: 1, nombre: "Jordan Low", precio: 30000, cantidad: 3, descripcion: 'Nike Jordan Low Menta', talle: '40', img: '../img/jordan-menta.jpg', añadir: false },
    { id: 2, nombre: "Jordan 4 Retro", precio: 40000, cantidad: 1, descripcion: 'Jordan 4 Retro Black Cat', talle: '40', img: '../img/jordan-blackcat.png', añadir: false },
    { id: 3, nombre: "Adidas Yeezy", precio: 23000, cantidad: 1, descripcion: 'Adidas Yeezy 350 gris con naranja', talle: '40', img: '../img/adidas-yeezy.png', añadir: false },
    { id: 4, nombre: "Nike 720", precio: 25000, cantidad: 1, descripcion: 'Nike Air Max 720-818 blanca, negra y dorada', talle: '40', img: '../img/nike-720-818.png', añadir: false },
    { id: 5, nombre: "Puma RS-X", precio: 25000, cantidad: 1, descripcion: 'Puma RSX blanca, azul y rojo', talle: '40', img: '../img/puma-rsx.jpg', añadir: false },
    { id: 6, nombre: "Jordan Low", precio: 30000, cantidad: 1, descripcion: 'Nike Jordan Low Menta', talle: '41', img: '../img/jordan-menta.jpg', añadir: false },
    { id: 7, nombre: "Jordan 4 Retro", precio: 40000, cantidad: 1, descripcion: 'Jordan 4 Retro Black Cat', talle: '41', img: '../img/jordan-blackcat.png', añadir: false },
    { id: 8, nombre: "Adidas Yeezy", precio: 23000, cantidad: 1, descripcion: 'Adidas Yeezy 350 gris con naranja', talle: '41', img: '../img/adidas-yeezy.png', añadir: false },
    { id: 9, nombre: "Nike 720", precio: 25000, cantidad: 1, descripcion: 'Nike Air Max 720-818 blanca, negra y dorada', talle: '41', img: '../img/nike-720-818.png', añadir: false },
    { id: 10, nombre: "Puma RS-X", precio: 25000, cantidad: 1, descripcion: 'Puma RSX blanca, azul y rojo', talle: '41', img: '../img/puma-rsx.jpg', añadir: false },
    { id: 11, nombre: "Jordan Low", precio: 30000, cantidad: 1, descripcion: 'Nike Jordan Low Menta', talle: '42', img: '../img/jordan-menta.jpg', añadir: false },
    { id: 12, nombre: "Jordan 4 Retro", precio: 40000, cantidad: 1, descripcion: 'Jordan 4 Retro Black Cat', talle: '42', img: '../img/jordan-blackcat.png', añadir: false },
    { id: 13, nombre: "Adidas Yeezy", precio: 23000, cantidad: 1, descripcion: 'Adidas Yeezy 350 gris con naranja', talle: '42', img: '../img/adidas-yeezy.png', añadir: false },
    { id: 14, nombre: "Nike 720", precio: 25000, cantidad: 1, descripcion: 'Nike Air Max 720-818 blanca, negra y dorada', talle: '42', img: '../img/nike-720-818.png', añadir: false },
    { id: 15, nombre: "Puma RS-X", precio: 25000, cantidad: 1, descripcion: 'Puma RSX blanca, azul y rojo', talle: '42', img: '../img/puma-rsx.jpg', añadir: false },
];

const contenedorProductos = document.getElementById('contenedor-productos')


const contenedorCarrito = document.getElementById('carrito-contenedor')

const botonVaciar = document.getElementById('vaciar-carrito')

const contadorCarrito = document.getElementById('contadorCarrito')


const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')

let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    localStorage.removeItem('carrito');
    actualizarCarrito()
})



stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img class="imgTienda" src=${producto.img} alt= "">
    <h3>${producto.nombre}</h3>
    <p>${producto.descripcion}</p>
    <p>Talle: ${producto.talle}</p>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="botonAgregar">Agregar <i class="fas fa-shopping-cart"></i></button>
    `
    contenedorProductos.appendChild(div)


    const boton = document.getElementById(`agregar${producto.id}`)


    boton.addEventListener('click', () => {

        agregarAlCarrito(producto.id)
        //
    })
})


const agregarAlCarrito = (prodId) => {


    const existe = carrito.some (prod => prod.id === prodId) 

    if (existe){ 
        const prod = carrito.map (prod => { 

            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else { 
        const item = stockProductos.find((prod) => prod.id === prodId)
        carrito.push(item)
    }
    actualizarCarrito() 
}


const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item) 

    carrito.splice(indice, 1);
    actualizarCarrito() 
    console.log(carrito)
}

const actualizarCarrito = () => {

    contenedorCarrito.innerHTML = "" 
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)
        
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })

    contadorCarrito.innerText = carrito.length ;
    console.log(carrito);
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0);
}