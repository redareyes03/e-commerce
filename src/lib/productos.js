const axios = require('axios')

async function get() {
    const request = await axios.get(process.env.EXCEL_LINK)

    const response = await request.data
    console.log(response)
    return response.split('\r\n')
        .map(producto => producto.split(','))
        .splice(1)
        .map(producto => {
            return {
                id: producto[0],
                nombre: producto[1],
                precio: producto[2],
                descuento: producto[3],
                descripcion: producto[4],
                cantidad: producto[5],
                slug: producto[6],
                imagen: producto[7],
                categorias: producto[8].split(';').map(categoria => categoria.trim())
            }
        })
}

module.exports = {
    get
}