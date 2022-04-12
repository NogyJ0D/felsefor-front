import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories } from '../features/categoriesSlice'
import { useForm } from 'react-hook-form'
import { getAll } from '../features/productsSlice'
import { BsArrowsAngleContract, BsArrowsAngleExpand } from 'react-icons/bs'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { URL } from '../config'

const Shop = () => {
  const products = useSelector(state => state.products)
  const categories = useSelector(state => state.categories)
  // const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [openFilters, setOpenFilters] = useState(false)

  useEffect(() => {
    dispatch(getAllCategories())
  }, [categories])

  const onSearch = ({ filter, limit }) => {
    dispatch(getAll({ filter, limit }))
  }

  return (
    <motion.div
      className='flex flex-col items-center w-full h-full gap-2'
      initial={{ y: -100 }}
      animate={{ y: 0 }}
    >
      <h2 className='text-3xl font-bold'>Productos</h2>
      <AnimatePresence>
        <motion.div
          animate={openFilters
            ? { height: 220, transition: { bounce: 0 } }
            : { height: 64, transition: { bounce: 0 } }}
          className='flex flex-col w-5/6 gap-4 p-4 font-semibold text-white border-4 rounded-xl border-felse bg-eerie-700'
        >
          <div className='flex items-center justify-between'>
            <label htmlFor='category'>Filtrar por categoría</label>
            <button onClick={() => setOpenFilters(!openFilters)}>{openFilters ? <BsArrowsAngleContract /> : <BsArrowsAngleExpand />}</button>
          </div>
          {
            openFilters &&
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.2 } }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSearch)}
                className='flex flex-col gap-4'
              >

                <select
                  id='category'
                  className='p-2 py-2 border-l-8 outline-none bg-eerie-900 focus:bg-eerie-800 rounded-xl border-for'
                  defaultValue='none'
                  {...register('filter', { required: true })}
                >
                  <option key='none' value='none'>Ninguna</option>
                  {
                categories.categories.map(category => {
                  return (
                    <option value={category._id} key={category._id}>
                      {category.name}
                    </option>
                  )
                })
              }
                </select>
                <div className='flex items-center gap-2'>
                  <label htmlFor='limitNumber'>Ver</label>
                  <select
                    id='limitNumber'
                    defaultValue='10'
                    className='p-2 py-2 border-l-8 outline-none bg-eerie-900 focus:bg-eerie-800 rounded-xl border-for'
                    {...register('limit', { required: true })}
                  >
                    <option value='5'>5</option>
                    <option value='10'>10</option>
                    <option value='15'>15</option>
                    <option value='20'>20</option>
                    <option value='25'>25</option>
                  </select>
                  <label htmlFor='limitNumber'>productos.</label>
                </div>
                <button className='px-2 font-bold text-white border-2 rounded-full hover:bg-eerie-800 bg-eerie-900 border-felse'>Buscar</button>
              </motion.form>
          }
        </motion.div>
      </AnimatePresence>
      {
        products.loading &&
          <p>Cargando</p>
      }
      {
        !products.loading &&
        products.docs.map(item => {
          return (
            <Link className='w-3/4 border-2 h-max flex flex-col gap-2 items-center border-felse bg-eerie-700/50' key={item._id} to={`/products/${item._id}`}>
              <img className='' src={URL + item.logoUrl} alt={item.name} />
              <p className='text-3xl font-semibold'>{item.name}</p>
              <p className='font-semibold text-xl'>${item.unitPrice}</p>
            </Link>
          )
        })
      }
    </motion.div>
  )
}

export default Shop
