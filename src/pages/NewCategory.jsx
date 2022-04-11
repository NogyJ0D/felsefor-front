import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { createCategory } from '../features/categoriesSlice'

const NewProduct = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    if (!user.loading && !user.logged && user.role < 3) return navigate('/')
  }, [user.logged])

  const onSubmit = data => {
    dispatch(createCategory(data))
      .then(res => {
        console.log(res)
        // if (res.meta.requestStatus === 'fulfilled') return navigate('/')
        reset()
      })
  }

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className='flex flex-col w-5/6 gap-4 p-4 font-semibold text-white border-4 rounded-xl border-felse bg-eerie-700'
    >
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>

        <label className='' htmlFor='name'>Nombre de la categoría</label>
        <input className='p-2 border-l-8 outline-none bg-eerie-900 focus:bg-eerie-800 rounded-xl border-for' type='text' required id='name' {...register('name', { required: true })} />

        <label className='' htmlFor='description'>Descripción</label>
        <textarea className='p-2 border-l-8 outline-none bg-eerie-900 focus:bg-eerie-800 rounded-xl border-for' required id='description' {...register('description', { required: true })} />

        <button>Crear</button>
      </form>
    </motion.div>
  )
}

export default NewProduct
