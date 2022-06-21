function calculatePrice(unitary, disscounts = 0, quantity) {

    unitary = parseFloat(unitary)
    disscounts = parseFloat(disscounts)
    quantity = parseInt(quantity)


    return [(quantity) * (unitary - unitary * (disscounts / 100))]
}


export {
    calculatePrice
}