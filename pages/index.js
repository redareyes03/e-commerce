import Head from 'next/head'
import Shop from '../src/components/Shop'
import Title from '../src/components/Title'
import Menu from '../src/components/Menu'
import { Container, Pagination } from '@nextui-org/react'
import { mapStateToProps } from '../src/containers/filter'
import { connect } from 'react-redux'
import Banner from '../src/components/Banner'
import { useEffect, useState } from 'react'
import axios from 'axios'


function Home({ productos, currentFilter, revalidate_token }) {

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProductos, setFilteredProductos] = useState(productos);
  const [productsLength, setProductsLength] = useState(productos.length);
  const [productsPerPage, setProductsPerPage] = useState(3);
    
  useEffect(() => {
    if (currentFilter === 'all') {
      setFilteredProductos(productos)
    }
    else {
      setFilteredProductos(productos
        .filter(({ categorias, nombre }) => (categorias.includes(currentFilter.toLowerCase()) || nombre.toLowerCase() === currentFilter.toLowerCase()))
      )
    }
  }, [currentFilter, productos])

  useEffect(() => {
    if (window.innerWidth < 1000) {
      setProductsPerPage(2)
    }
    else {
      setProductsPerPage(3)
    }

    window.addEventListener('resize', e => {
      if (e.target.innerWidth < 1000) {
        setProductsPerPage(2)
      }
      else {
        setProductsPerPage(3)
      }

    })
  }, [])


  useEffect(() => {
    setProductsLength(filteredProductos.length)
  }, [currentFilter, filteredProductos])


  useEffect(() => {
    (async function () {
      const url = new URL(`${window.location.href}/api/revalidate`);
      url.searchParams.append('secret', revalidate_token);
      await axios.get(url)
    })()
  }, [])

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

          <Title />


          {
            productsLength > 0
              ?
              <div className='lg:h-[calc(35rem)]'>
                <Shop productos={filteredProductos.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)} />
                <div className="flex justify-center mt-8" >
                  <Pagination
                    total={Math.ceil(productsLength / productsPerPage)}
                    initialPage={1}
                    onChange={(page) => setCurrentPage(page)}
                  />
                </div>
              </div>
              :
              <div className='lg:h-[calc(35rem)]  flex items-center justify-center'>
                <h3 className='text-gray-400'>No hay resultados</h3>
              </div>
          }

        </Container>
        <Banner />
      </main>
    </>
  )
}


export async function getStaticProps() {

  const productos = await require('../src/lib/productos.js').get()
  return {
    props: {
      productos,
      revalidate_token: process.env.REVALIDATE_TOKEN
    },
  }
}

export default connect(mapStateToProps)(Home)