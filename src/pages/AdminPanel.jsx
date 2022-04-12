import { useEffect } from 'react'
import { BsPlusCircle } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const AdminPanel = () => {
  const user = useSelector(state => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user.loading && !user.logged && user.role < 3) return navigate('/')
  }, [user.logged])

  return (
    <div className='flex flex-col items-center p-4 gap-4 font-bold text-white border-2 rounded-3xl text-2xl bg-eerie-900 border-felse'>
      <Link to='/create-product' className='flex items-center gap-4 px-2 font-bold text-white border-2 rounded-full hover:bg-eerie-800 bg-eerie-900 border-felse'><BsPlusCircle />Crear nuevo producto</Link>
      <Link to='/create-category' className='flex items-center gap-4 px-2 font-bold text-white border-2 rounded-full hover:bg-eerie-800 bg-eerie-900 border-felse'><BsPlusCircle />Crear nueva categoría</Link>
    </div>
  )
}

export default AdminPanel
