import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router"
import { useState } from "react";
import { Container, Loading, Popover, Text } from '@nextui-org/react'
import Menu from "../../src/components/Menu.jsx";
import Alert from "../../src/components/Alert.jsx";
import { mapStateToProps, mapDispatchToProps } from '../../src/containers/login'
import { connect } from "react-redux";

function VistaProducto({ producto, isLogged, toggleModal }) {
    const { isFallback } = useRouter()
    const [cantidad, setCantidad] = useState(1);
    const [addToCart, setAddToCart] = useState(false);
    const [alert, setAlert] = useState(false);

    if (isFallback) {
        return <Loading size="md" className="h-screen w-screen justify-center">Cargando...</Loading>
    }
    else {
        return (
            <>
                <Head>
                    <title>{producto.nombre}</title>
                    <meta name="description" content="Bienvenido a Shopix" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <Menu />


                <Container className="mt-8">
                    <main className="lg:max-w-6xl md:max-w-md sm:max-w-sm max-w-xs mx-auto ">
                        <h1 className="text-5xl mb-6">{producto.nombre}</h1>
                        <div className="lg:flex md:gap-40">
                            <Image src={producto.imagen} alt={producto.nombre} width={600} height={600} className="object-contain" />
                            <div className="w-full">
                                <div className="flex gap-4">
                                    <span className={"font-bold text-3xl " + (producto.descuento != 0 && "line-through text-gray-500 ")}>
                                        ${producto.precio}
                                    </span>
                                    {producto.descuento != 0 &&
                                        <span className="text-red-500 font-bold text-3xl">
                                            ${producto.precio - (producto.precio * producto.descuento / 100)}
                                        </span>
                                    }
                                </div>
                                <p className="text-xl mb-4">{producto.descripcion}</p>
                                {producto.cantidad > 0
                                    ?
                                    <>
                                        <p className="text-xl mb-4">Disponibles: {producto.cantidad}</p>
                                        <div className="flex align-center gap-4 mb-6">
                                            <button onClick={() => !(cantidad <= 0) && setCantidad(--cantidad)} className="text-2xl bg-slate-100  border border-slate-300 text-gray-600 rounded-lg px-4">-</button>
                                            <input type="number" placeholder="Cantidad" onChange={({ target }) => setCantidad(Number(target.value))} value={cantidad}
                                                className={"px-3 py-2 bg-white border border-slate-400 rounded-md text-sm shadow-sm placeholder-slate-400" + ((cantidad <= 0 || cantidad > producto.cantidad) && " border-2 border-pink-500")}
                                                required min={0} max={producto.cantidad} />
                                            <button onClick={() => !(cantidad >= producto.cantidad) && setCantidad(++cantidad)} className="text-2xl bg-slate-100  border border-slate-300 text-gray-600 rounded-lg px-4">+</button>
                                        </div>
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 rounded"
                                            onClick={() => {
                                                if (isLogged) {

                                                    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
                                                    const existInCart = carrito.findIndex(item => item.id === producto.id)
                                                    if (cantidad > 0 && cantidad <= Number(producto.cantidad)) {
                                                        if (existInCart !== -1 && cantidad + carrito[existInCart].compra > Number(producto.cantidad)) {
                                                            setAddToCart(false)
                                                            setAlert(true)
                                                            return
                                                        }

                                                        setAlert(false)

                                                        if (existInCart !== -1) {
                                                            carrito[existInCart].compra += cantidad
                                                            localStorage.setItem("carrito", JSON.stringify(carrito))
                                                        }
                                                        else {
                                                            carrito.push({ ...producto, compra: cantidad })
                                                            localStorage.setItem("carrito", JSON.stringify(carrito))
                                                        }

                                                        setAddToCart(true)
                                                    }   
                                                }
                                                else{
                                                    toggleModal(true)
                                                }
                                            }}>
                                            Agregar al carrito
                                        </button>

                                    </>
                                    :
                                    <p className="text-xl bg-red-400 text-white py-2 px-5 text-center rounded-full my-4" >Producto agotado</p>
                                }
                            </div>

                        </div>

                        {addToCart &&
                            <Alert type={"success"} body="Producto agregado al carrito!" />
                        }

                        {alert &&
                            <Alert type={"warning"} body="No se puede agregar más de lo disponible al carrito!" />
                        }


                    </main>
                </Container>

            </>
        )

    }


}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true
    }
}

export async function getStaticProps({ params }) {

    const productos = await require('../../src/lib/productos.js').get()
    const producto = productos.find(producto => producto.slug === params.slug)


    return {
        props: {
            producto
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(VistaProducto);