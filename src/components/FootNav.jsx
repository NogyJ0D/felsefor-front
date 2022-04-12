import { BiCart, BiMenu, BiUserCircle } from 'react-icons/bi'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { AiOutlineHome } from 'react-icons/ai'
import { BsShop } from 'react-icons/bs'
import { GrUserSettings } from 'react-icons/gr'

const FootNav = () => {
  const [openNav, setOpenNav] = useState(false)
  const user = useSelector(state => state.user)
  const cart = useSelector(state => state.carts)

  return (

    <nav className='relative text-4xl font-semibold text-felse'>
      <div className='absolute bottom-0 z-10 flex items-center justify-center w-full px-8 bg-eerie-900'>
        <button
          onClick={() => setOpenNav(!openNav)}
          className='px-2 py-1 hover:bg-eerie-700'
        >
          <BiMenu />
        </button>
      </div>
      <AnimatePresence>
        {
        openNav && (
          <motion.div
            initial={{ y: -4, opacity: 0 }}
            animate={{ y: -40, opacity: 1 }}
            exit={{ y: -4, opacity: 0 }}
            className='bottom-0 z-0 flex flex-col items-center w-full py-2 text-2xl rounded-t-3xl bg-eerie-700'
          >
            {
              user.logged && user.role >= 3 &&
                <NavLink className='flex items-center gap-2' to='/admin-panel'><GrUserSettings /> Panel de administración</NavLink>
            }
            <NavLink to='/shop' className='flex items-center gap-2'><BsShop /> Productos</NavLink>
            {
              user.logged
                ? (
                  <>
                    <NavLink className='flex items-center gap-2' to='/my-cart'><BiCart /> Mi Carrito ({cart?.products?.length})</NavLink>
                    <NavLink className='flex items-center gap-2' to='/profile'><BiUserCircle /> Mi perfil</NavLink>
                  </>
                  )
                : <NavLink className='flex items-center gap-2' to='/login'><BiUserCircle /> Iniciar sesión</NavLink>
            }
            <NavLink to='/' className='flex items-center gap-2'><AiOutlineHome /> Inicio</NavLink>
          </motion.div>
        )
      }
      </AnimatePresence>
    </nav>
  )
}

export default FootNav
