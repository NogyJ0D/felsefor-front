import { useEffect } from 'react'
import { BsDashCircle, BsPlusCircle } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { URL } from '../config'
import { reduceItemFromCart } from '../features/cartsSlice'

const UserCart = () => {
  const cart = useSelector(state => state.carts)
  const user = useSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!user.loading && !user.logged) return navigate('/')
  }, [user.logged])

  const reduceItem = (id) => {
    const data = {
      itemId: id,
      quantity: 1
    }
    dispatch(reduceItemFromCart({ cartId: cart.id, data }))
  }

  return (
    <div className='flex flex-col gap-2 items-center'>
      <h2>Mi carrito</h2>
      <p>Total de productos: {cart.products.length}</p>
      {
        cart.products.length > 0 &&
          cart.products.map(prod => {
            return (
              <div className='border-2 border-felse text-white w-1/2 flex flex-col px-3 gap-1 bg-eerie-700' key={prod.itemId}>
                <img src={URL + prod.itemLogo} className='w-full' alt={prod.itemName} />
                <p>
                  Nombre: {prod.itemName}
                </p>
                <p className='flex gap-2 items-center'>
                  Cantidad: {prod.quantity}
                  <BsDashCircle className='cursor-pointer' onClick={() => reduceItem(prod.itemId)} />
                </p>
                <p>
                  Precio unitario: ${prod.itemPrice} USD
                </p>
                <p>
                  Precio total: ${parseInt(prod.itemPrice) * parseInt(prod.quantity)} USD
                </p>
              </div>
            )
          })
      }
      {
        cart.products.length > 0 &&
          <>
            <p>Precio final: ${cart.totalPrice} USD</p>
            <Link to='/checkout' state={{ amount: (parseInt(cart.totalPrice) * 100) }} className='flex items-center gap-4 px-3 py-1 font-bold text-white border-2 rounded-full hover:bg-eerie-800 bg-eerie-900 border-felse text-3xl'>Comprar</Link>
          </>
      }
    </div>
  )
}

export default UserCart
