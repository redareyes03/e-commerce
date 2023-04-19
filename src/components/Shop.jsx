import Product from "./Product";


function Shop({ productos }) {

  return (
    <>

      <div className="my-4 max-w-screen-sm lg:max-w-screen-xl mx-auto">
        <h2 className="text-center text-2xl mb-8">Productos</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:gap-8">
          {
            productos.map((producto, index) => (
              <Product producto={producto} key={producto.id} />
            ))
          }
        </div>

      </div>


    </>
  )
}



export default Shop;