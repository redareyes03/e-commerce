import { Avatar, Button, Card, Container, Input, Loading, Modal } from '@nextui-org/react'
import Head from 'next/head'
import React, { useEffect, useRef, useState } from 'react'
import { FaMinus } from 'react-icons/fa'
import Menu from '../src/components/Menu'
import { calculatePrice } from '../src/lib/carrito';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import Link from 'next/link'
import axios from 'axios'


function Carrito() {
  const [cart, setCart] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('carrito')))
  }, [])

  useEffect(() => {
    if (cart.length > 0) {
      const total = cart.reduce((acc, item) => {
        const descuento = Number(item.descuento) / 100 || 0
        return acc + Number([(Number(item.precio) * Number(item.compra)) * (1 - descuento)])
      }, 0)
      setTotal(total)
    }
  }, [cart]);



  

  return (
    <>
      <Head>
        <title>Shopix</title>
        <meta name="description" content="Bienvenido a Shopix" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Menu />

      <main className="mt-8 min-h-screen">
        <Container >

          <h1>Mi carrito</h1>

          {
            cart.length > 0
              ?
              <div className='flex flex-col lg:flex-row justify-center gap-20'>

                <div className='flex flex-col gap-8 lg:w-1/3'>
                  {
                    cart.map((producto) => {
                      return (
                        <div key={producto.id} className="flex flex-col lg:flex-row gap-3 items-center justify-around w-full border-b border-gray-300 shadow-black/25 py-4">
                          <Avatar squared src={producto.imagen} size="xl" />
                          <div className='flex items-center gap-8'>
                            <p className='font-semibold text-xl lg:text-2xl'>{producto.compra} {producto.nombre} </p>
                            <p className='font-bold text-xl lg:text-2xl'>
                              ${calculatePrice(producto.precio, producto.descuento, producto.compra)}
                            </p>
                          </div>
                          <Button color={"error"} rounded auto icon={<FaMinus />} size="xs"
                            onClick={() => {
                              setCart(cart.filter(item => item.id !== producto.id));
                              window.localStorage.setItem('carrito', JSON.stringify(cart.filter(item => item.id !== producto.id)));
                            }}
                          />
                        </div>
                      )
                    })
                  }
                </div>


                <div className='lg:w-1/3'>
                  <Card shadow={false} >
                    <Card.Header>
                      <h3>Resumen de compra</h3>
                    </Card.Header>
                    <Card.Body>
                      <div className='mb-3 flex w-full justify-between'>
                        <span className='font-bold'>
                          Subtotal:
                        </span>
                        <span>
                          ${cart.length > 0 ? cart.reduce((acum, item) =>
                            acum + parseFloat(calculatePrice(item.precio, 0, item.compra)),
                            0
                          ).toFixed(2)
                            : 0
                          }
                        </span>
                      </div>
                      <div className='mb-3 flex w-full justify-between'>
                        <span className='font-bold'>
                          Descuentos:
                        </span>
                        <span>
                          ${cart.length > 0 ? cart.reduce((acc, item) =>
                            item.descuento != 0
                              ? acc + parseFloat(item.precio) * parseFloat(item.descuento) / 100 * item.compra
                              : acc + 0
                            , 0
                          ).toFixed(2)
                            : 0
                          }
                        </span>
                      </div>
                      <div className='mb-3 flex w-full justify-between'>
                        <span className='font-bold'>
                          Total:
                        </span>
                        <span>
                          ${cart.length > 0 ? cart.reduce((acc, item) =>
                            item.descuento != 0
                              ?
                              acc + parseFloat(calculatePrice(item.precio, item.descuento, item.compra))
                              :
                              acc + parseFloat(calculatePrice(item.precio, 0, item.compra))
                            , 0).toFixed(2)
                            : 0
                          }
                        </span>
                      </div>
                    </Card.Body>

                    <Card.Footer>
                      <Button color="success" onClick={() => setVisibleModal(true)} className='w-full lg:w-fit lg:mx-auto'>
                        Comprar
                      </Button>

                      <Modal
                        blur
                        closeButton
                        open={visibleModal}
                        onClose={() => setVisibleModal(false)}
                        width={'500px'}
                        preventClose
                        className="mx-2 cursor-default"
                      >
                        <Modal.Header className='flex flex-col items-start'>
                          <h3>Pago en línea</h3>
                          <p className='text-left'>Para completar tu compra porfavor completa los siguientes datos requeridos</p>
                        </Modal.Header>
                        <Modal.Body>
                          <form>
                            <Input
                              placeholder='Nombre'
                              fullWidth
                              className='inputs mb-4'
                              required
                              clearable
                              aria-label='Nombre'
                            />
                            <Input
                              placeholder='Apellidos'
                              fullWidth
                              className='inputs mb-8'
                              required
                              clearable
                              aria-label='Apellidos'
                            />
                            <h4>Datos bancarios</h4>
                            <CardElement className='mt-4 mb-6' />
                            <Button
                              size="sm"
                              color="success"
                              className='w-full lg:w-fit lg:mx-auto'
                              type='submit'
                              onClick={(e) => {
                                e.preventDefault()
                                setLoading(true)
                                handleSubmit()
                              }
                              }
                            >{
                                (loading && !error) ? <Loading size='sm' type='points' color="white"/> : "Listo"
                              }</Button>
                          </form>
                        </Modal.Body>
                      </Modal>
                    </Card.Footer>
                  </Card>

                </div>

              </div>
              :
              <div className='flex items-center justify-center'>
                <p className='text-4xl text-gray-400'>
                  No hay productos en el carrito
                  <Link passHref href="/">
                    <Button color="secondary" flat className='mx-auto my-6'>
                      Volver al inicio
                    </Button>
                  </Link>
                </p>
              </div>
          }





        </Container>
      </main>


    </>
  )
}

export default Carrito