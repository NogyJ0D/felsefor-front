import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { createProduct, getAll } from '../features/productsSlice'

const NewProduct = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const { categories } = useSelector(state => state.categories)
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    if (!user.loading && !user.logged && user.role < 3) return navigate('/')
  }, [user.logged])

  const onSubmit = data => {
    dispatch(createProduct(data))
      .then(res => {
        if (res.meta.requestStatus === 'fulfilled') {
          dispatch(getAll({ filter: 'none', limit: 10 }))
          const move = window.confirm('¿Desea revisar la página del producto?')
          move && navigate(`/products/${res.payload._id}`)
          reset()
        }
      })
  }

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className='flex flex-col w-5/6 gap-4 p-4 font-semibold text-white border-4 rounded-xl border-felse bg-eerie-700'
    >
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>

        <label className='' htmlFor='name'>Nombre del producto</label>
        <input className='p-2 border-l-8 outline-none bg-eerie-900 focus:bg-eerie-800 rounded-xl border-for' type='text' required id='name' {...register('name', { required: true })} />

        <label className='' htmlFor='description'>Descripción</label>
        <textarea className='p-2 border-l-8 outline-none bg-eerie-900 focus:bg-eerie-800 rounded-xl border-for' required id='description' {...register('description', { required: true })} />

        <label className='' htmlFor='unitPrice'>Precio unitario (USD, agregar 00 al final)</label>
        <input className='p-2 border-l-8 outline-none bg-eerie-900 focus:bg-eerie-800 rounded-xl border-for' required type='number' min='0' placeholder='100 = 1 usd' id='unitPrice' {...register('unitPrice', { register: true, min: 0 })} />

        <label className='' htmlFor='totalAmount'>Existencia inicial</label>
        <input className='p-2 border-l-8 outline-none bg-eerie-900 focus:bg-eerie-800 rounded-xl border-for' type='number' min='0' id='totalAmount' {...register('totalAmount', { min: 0 })} />

        <label className='' htmlFor='logo'>Imagen del producto</label>
        <input className='cursor-pointer' accept='image/*' type='file' id='logo' {...register('logo')} />

        {
          categories.map(category => {
            return (
              <label
                key={category._id}
                className='flex items-center gap-2 px-2 py-1 border-2 border-felse bg-eerie-900'
              >
                <input
                  type='checkbox'
                  value={category._id}
                  {...register('categories')}
                />
                {category.name}
              </label>
            )
          })
        }

        <button>Crear</button>
      </form>
    </motion.div>
  )
}

export default NewProduct
