import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Home = () => {
  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className='flex flex-col items-center gap-4'
    >
      <h1 className='font-black'>fElsefor</h1>
      <p>La solución para tus necesidades de hardware</p>

      {/* TODO: elegir producto aleatorio */}
      <Link to='/shop' className='px-4 py-1 text-2xl font-bold text-white border-2 rounded-full hover:bg-eerie-800 bg-eerie-900 border-felse'>Mira nuestros productos</Link>
    </motion.div>
  )
}

export default Home
