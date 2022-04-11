import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { URL } from '../config'
import { logout } from '../features/userSlice'
import { motion } from 'framer-motion'

const Profile = () => {
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!user.loading && !user.logged) return navigate('/')
  }, [user.logged])

  const onLogout = () => {
    dispatch(logout())
    return navigate('/')
  }

  return (
    <>
      {
      user.logged &&
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
        >
          <p className='absolute left-3 top-3'>Mi Perfil</p>
          <div className='flex flex-col items-center gap-2 mx-auto'>
            <img src={URL + user.profile_pic} alt={user.username} className='w-1/2 mx-auto rounded-3xl' />
            <p className='text-3xl font-bold'>{user.firstname + ' ' + user.lastname}</p>
            <p className='text-2xl font-semibold'>{user.username}</p>
            {
          user.role === 0 &&
            <p className='text-2xl text-center text-red-500'>Debes verificar tu email para proceder con las compras.</p>
        }
          </div>
          <ul className='flex flex-col gap-4 px-4 pt-8 text-2xl font-semibold text-white'>
            <li className='px-2 py-1 rounded-lg bg-eerie-700'>Email: {user.email}</li>
            <li className='px-2 py-1 rounded-lg bg-eerie-700'>País: {user.address.country}</li>
            <li className='px-2 py-1 rounded-lg bg-eerie-700'>Estado/Provincia: {user.address.state}</li>
            <li className='px-2 py-1 rounded-lg bg-eerie-700'>Ciudad: {user.address.city}</li>
            <li className='px-2 py-1 rounded-lg bg-eerie-700'>Dirección: {user.address.line1}</li>
            <li className='px-2 py-1 rounded-lg bg-eerie-700'>Código postal: {user.address.postal_code}</li>
          </ul>
          <button onClick={onLogout} className='absolute px-4 py-1 text-white -translate-x-1/2 border-2 rounded-full bottom-14 left-1/2 hover:bg-eerie-800 bg-eerie-900 border-felse'>Cerrar sesión</button>
        </motion.div>
    }
    </>
  )
}

export default Profile
