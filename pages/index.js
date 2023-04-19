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

  
  return (
    <>
     <h1>Hola mundo 22</h1>
    </>
  )
}


export async function getStaticProps(context) {

  const productos = await require('../src/lib/productos.js').get()
  return {
    props: {
      productos,
      revalidate_token: process.env.REVALIDATE_TOKEN
    },
  }
}

export default connect(mapStateToProps)(Home)