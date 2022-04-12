import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { URL } from '../config'
import { addItemToCart } from '../features/cartsSlice'
import { getProductById } from '../features/productsSlice'

const ProductDetails = () => {
  const { productId } = useParams()
  const user = useSelector(state => state.user)
  const { selectedProduct: product } = useSelector(state => state.products)
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()

  useEffect(() => {
    dispatch(getProductById(productId))
  }, [])

  const onSubmit = async ({ quantity }) => {
    const data = {
      itemId: productId,
      quantity: quantity,
      itemPrice: product.unitPrice,
      itemName: product.name,
      itemLogo: product.logoUrl
    }
    await dispatch(addItemToCart({ cartId: user.cartId, data }))
    await dispatch(getProductById(productId))
  }

  return (
    <>
      {
        !product &&
          <p>Cargando...</p>
      }
      {
        product &&
          <div className='flex flex-col items-center w-5/6 gap-2 p-4 text-xl text-white border-felse bg-eerie-700'>
            <h2 className='text-3xl font-bold underline'>{product.name}</h2>
            <img src={URL + product.logoUrl} className='border bg-white/50 border-for' alt={product.name} />
            <p>{product.description}</p>
            <p>Precio: ${product.unitPrice} USD</p>
            <p>Cantidad: {product.totalAmount}</p>
            <ul>
              <li>Categorías:</li>
              {
              product.categories.map(i => {
                return (
                  <li key={i._id}>{i.name}</li>
                )
              })
              }
            </ul>

            {
              product.active && product.totalAmount > 0 && user.role > 0 &&
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 border rounded-xl p-2 bg-eerie-800/50 border-felse'>
                  <label htmlFor='amount'>Cantidad:</label>
                  <input type='number' className='p-2 border-l-8 outline-none bg-eerie-900 focus:bg-eerie-800 rounded-xl border-for' id='amount' min='1' defaultValue='1' required max={product.totalAmount} {...register('quantity', { min: 1, max: product.totalAmount, required: true })} />
                  <button className='border-2 border-felse bg-eerie-900 hover:bg-eerie-700 p-2 rounded-xl'>Agregar al carro</button>
                </form>
            }
            {
            (!product.active || product.totalAmount === 0) &&
              <button disabled className='border-2 border-felse bg-eerie-700 p-2 rounded-xl'>No disponible para compra</button>
            }
            {
              user.role === 0 &&
                <button disabled className='border-2 border-felse bg-eerie-700 p-2 rounded-xl'>Verifica tu email para comprar</button>
            }
          </div>
      }
    </>
  )
}

export default ProductDetails
