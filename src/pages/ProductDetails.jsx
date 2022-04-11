import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { URL } from '../config'
import { getProductById } from '../features/productsSlice'

const ProductDetails = () => {
  const { productId } = useParams()
  const { selectedProduct: product } = useSelector(state => state.products)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProductById(productId))
  }, [])

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
            <img src={URL + product.logoUrl} className='border border-for' alt={product.name} />
            <p>{product.description}</p>
            <button>Agregar al carrito</button>
          </div>
      }
    </>
  )
}

export default ProductDetails
