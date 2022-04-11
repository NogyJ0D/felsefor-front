import { NavLink, Outlet } from 'react-router-dom'
import FootNav from '../components/FootNav'
import { motion } from 'framer-motion'

const HomeLayout = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className='flex flex-col h-screen bg-whitesmoke-700'
    >

      <header className='hidden w-full sm:flex bg-eerie-900'>
        <nav className='flex px-8 text-2xl'>
          <NavLink className='px-2 py-1 hover:bg-eerie-700' to='/'>fElseFor</NavLink>
        </nav>
      </header>

      <main className='flex flex-col items-center h-full pb-16 mt-8 text-black'>
        <Outlet />
      </main>

      <footer className='fixed bottom-0 w-full sm:hidden'>
        <FootNav />
      </footer>

    </motion.div>
  )
}

export default HomeLayout
