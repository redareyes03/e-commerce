import Logo from "./Logo";
import Link from "next/link";
import { FaRegHeart, FaMinus } from 'react-icons/fa'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { BiSearchAlt, BiChevronRight } from 'react-icons/bi'
import { MdPassword } from 'react-icons/md'
import { Avatar, Tooltip, Button, Modal, Text, Input, Checkbox } from "@nextui-org/react";
import { connect } from "react-redux";
import { useState } from 'react'
import { mapDispatchToProps, mapStateToProps } from '../containers/menu'
import { Mail } from "tabler-icons-react";



function Menu({ handleFilter, isLogged, loginUser, logoutUser, toggleModal, modalState}) {

    return (
        <div className="px-8 py-4 bg-gray-50">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-12 w-1/4">
                    <Link href={"/"} passHref >
                        <a>
                            <Logo />
                        </a>
                    </Link>
                    <nav className="gap-6 hidden lg:flex">
                        <Link passHref href="/">
                            <a className="text-gray-500 hover:text-gray-600" onClick={() => handleFilter('all')}>
                                Todos
                            </a>
                        </Link>
                        <Link passHref href="/">
                            <a className="text-gray-500 hover:text-gray-600" onClick={() => handleFilter('hombre')}>
                                Hombre
                            </a>
                        </Link>
                        <Link passHref href="/">
                            <a className="text-gray-500 hover:text-gray-600" onClick={() => handleFilter('mujer')}>
                                Mujer
                            </a>
                        </Link>
                    </nav>
                </div>

                <NavSearch mobile={false} setFilter={handleFilter} />

                <div className="w-1/4 flex justify-end items-center pr-4 gap-8">
                    <Tooltip placement="bottom" content={<LikesTooltip />} >
                        <FaRegHeart size={26} />
                    </Tooltip>
                    <Tooltip placement="bottomEnd" content={<CartTooltip />}>
                        <AiOutlineShoppingCart size={32} />
                    </Tooltip>

                    {
                        isLogged
                            ?
                            <Tooltip placement="bottomEnd" content={<UserTooltip logoutUser={logoutUser} />} >
                                <Avatar className="cursor-pointer" rounded src={"/logo.png"} size="md" />
                            </Tooltip>
                            :
                            <>
                                <Avatar className="cursor-pointer" rounded src={"/user.png"} size="md" onClick={() => toggleModal(true)} />
                                <Modal
                                    closeButton
                                    aria-labelledby="modal-title"
                                    open={modalState}
                                    onClose={() => toggleModal(false)}
                                    className="mx-4"
                                >
                                    <Modal.Header>
                                        <Text id="modal-title" size={18}>Iniciar Sesión</Text>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Input
                                            clearable
                                            bordered
                                            fullWidth
                                            color="primary"
                                            size="lg"
                                            placeholder="Email"
                                            contentLeft={<Mail className="stroke-gray-400" />}
                                            aria-label="Email"
                                            className="inputs"
                                        />
                                        <Input
                                            clearable
                                            bordered
                                            fullWidth
                                            color="primary"
                                            size="lg"
                                            placeholder="Password"
                                            contentLeft={<MdPassword className="fill-gray-400" />}
                                            aria-label="Password"
                                            className="inputs"
                                        />
                                        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                                            <Checkbox value="remember" aria-label="Rembember">
                                                <Text size={16}>Recordarme</Text>
                                            </Checkbox>
                                            <Link href={"/"} >
                                                <Button color={"secondary"} size="sm" flat onClick={() => toggleModal(false)}>
                                                    Olvide la contraseña
                                                    <BiChevronRight size={24} />
                                                </Button>
                                            </Link>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer className="flex lg:justify-end justify-center">
                                        <Button auto flat color="error" onPress={() => toggleModal(false)}>
                                            Cerrar
                                        </Button>
                                        <Button auto onClick={() => {
                                            // Validar usuarios en la bd
                                            loginUser()                                            
                                            toggleModal(false)

                                        }}>
                                            Ingresar
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </>
                    }

                </div>

            </div>

            <NavSearch mobile={true} />
        </div>
    )
}

function NavSearch({ mobile, setFilter }) {
    return (
        <div className={"relative " + (mobile ? "lg:hidden w-full mt-4" : "hidden lg:flex w-1/3")}>
            <input type="text" placeholder="Search for products"
                className="w-full rounded-sm border border-gray-300 bg-transparent placeholder-gray-400 focus:ring-0 focus:outline-none focus:border-gray-400 pr-14"
                onChange={({ target }) => {
                    if (target.value.length > 0) {
                        setFilter(target.value.trim())
                    }
                    else {
                        setFilter('all')
                    }
                }}

            />
            <BiSearchAlt size={28} className="fill-gray-300 absolute right-[calc(1rem)] top-[calc(50%)] -translate-y-1/2" />
        </div>
    )
}

function UserTooltip({ logoutUser }) {
    return (
        <div className="p-2">
            <h4>Usuario</h4>

            <Button className="bg-gray-100 mb-2" >
                <Link href="/" passHref>
                    <a className="text-gray-700">
                        Mi cuenta
                    </a>
                </Link>
                <BiChevronRight size={24} className="fill-gray-300" />
            </Button>

            <Button color={"error"} onClick={() => logoutUser()}>Salir</Button>

        </div>
    )
}

function LikesTooltip() {

    if (!window.localStorage.getItem('likes')) {
        window.localStorage.setItem('likes', JSON.stringify([]));
    }
    return (
        <div className="p-2">
            <h4>Likes</h4>
            {
                (JSON.parse(window.localStorage.getItem('likes'))).length > 0 ?
                    JSON.parse(window.localStorage.getItem('likes')).map(producto => (
                        <Link href={"/productos/" + producto.slug} key={producto.id}>
                            <a className="flex items-center mb-3 gap-3" >
                                <Avatar rounded src={producto.imagen} size="md" />
                                <div className="flex-1">
                                    <span className="text-gray-700 font-bold">{producto.nombre}</span>
                                </div>
                            </a>
                        </Link>
                    ))
                    :
                    <div className="text-gray-700">No hay likes</div>
            }

        </div>
    )
}

function CartTooltip() {

    if (!window.localStorage.getItem('carrito')) {
        window.localStorage.setItem('carrito', JSON.stringify([]));
    }

    window.localStorage.getItem('carrito') || window.localStorage.setItem('carrito', JSON.stringify([]));

    const [cart, setCart] = useState(JSON.parse(window.localStorage.getItem('carrito')));
    const [total, setTotal] = useState(cart.reduce((acc, item) => {
        if (item.descuento != 0) return acc + (item.precio - (item.precio * item.descuento / 100)) * item.compra;
        return acc + item.precio * item.compra;
    }, 0));

    return (
        <div className="p-2">
            <h4>Carrito</h4>
            {
                (cart).length > 0
                    ?
                    <div>
                        {cart.map(producto => (
                            <div className="flex items-center justify-between gap-6 mb-3" key={Math.random() * producto.id}>

                                <Link passHref href={"/productos/" + producto.slug}>
                                    <a>
                                        <div className="flex items-center gap-3">
                                            <Avatar rounded src={producto.imagen} size="md" />
                                            <span className="text-gray-700 font-bold">{producto.compra}</span>
                                            <span className="text-gray-700 font-bold">{producto.nombre}</span>
                                        </div>
                                    </a>
                                </Link>

                                <Button color={"error"} rounded auto icon={<FaMinus />} size="xs"
                                    onClick={() => {
                                        setCart(cart.filter(item => item.id !== producto.id));
                                        setTotal(total - (producto.precio * producto.compra));
                                        window.localStorage.setItem('carrito', JSON.stringify(cart.filter(item => item.id !== producto.id)));
                                    }}
                                />

                            </div>
                        ))}
                        <div className="flex justify-between items-center mb-3 mt-6">
                            <span className="text-gray-700 font-bold">Total:</span>
                            <span className="text-gray-700 font-bold">${total}</span>
                        </div>
                        <Link passHref href={"/carrito"}>
                            <Button color={"success"} size="md">Ir a comprar</Button>
                        </Link>
                    </div>
                    :
                    <div className="text-gray-700 w-24">Carrito Vacío</div>

            }
        </div>
    )
}


export default connect(mapStateToProps, mapDispatchToProps)(Menu);