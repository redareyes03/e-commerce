import Link from "next/link";
import { FaHeart } from 'react-icons/fa';
import { Discount2 } from 'tabler-icons-react';
import { Text, Card } from '@nextui-org/react'
import { useState, useEffect } from "react";
// import { BsCartPlusFill } from 'react-icons/bs'


function Product({ producto }) {

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!window.localStorage.getItem("likes")) {
      window.localStorage.setItem("likes", []);
    }
    const isThisItemLiked = [...JSON.parse(window.localStorage.getItem('likes'))].find(item => item.id === producto.id)
    setLiked(isThisItemLiked ? true : false)
  }, []);



  return (
    <Card shadow>
      <Card.Header className="absoulte top-1 px-4">
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-4 items-center">
            <Text h3 size={24} weight="bold">{producto.nombre}</Text>
            {producto.descuento != 0 && <Discount2 size={32} className="stroke-red-500" />}
          </div>

          <FaHeart
            size={30}
            className={"fill-slate-300 cursor-pointer transition delay-50 " + (liked ? "fill-red-400" : "hover:fill-red-400")}
            onClick={() => {
              setLiked(!liked);
              if (liked === false) {
                window.localStorage.setItem('likes', JSON.stringify([...JSON.parse(window.localStorage.getItem('likes') || '[]'), producto]));
              }
              else {
                window.localStorage.setItem('likes', JSON.stringify(JSON.parse(window.localStorage.getItem('likes') || '[]').filter(({ id }) => id !== producto.id)));
              }

            }} />
        </div>
      </Card.Header>
      <Card.Body css={{ p: 0 }}>
        <Card.Image src={producto.imagen} alt={producto.nombre} width="100%" height="250px" />
      </Card.Body>
      <Card.Footer className="bg-cyan-100">
        <div className="flex items-center justify-between w-full ">

          <div className="flex gap-4">
            <span className={"font-bold text-xl " + (producto.descuento != 0 && "line-through text-gray-500 ")}>
              ${producto.precio}
            </span>
            {producto.descuento != 0 &&
              <span className="text-red-500 font-bold text-xl">
                ${producto.precio - (producto.precio * producto.descuento / 100)}
              </span>
            }
          </div>


          <Link passHref href={"/productos/" + producto.slug} >
            <a
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded  text-center transition-colors delay-100">
              Ver producto
            </a>
          </Link>
        </div>
      </Card.Footer>
    </Card>
  )

}


export default Product;