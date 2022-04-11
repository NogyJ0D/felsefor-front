import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { login, signup } from '../features/userSlice'

const Login = () => {
  const [openPage, setOpenPage] = useState(0)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register: registerLogin, handleSubmit: handleSubmitLogin } = useForm()
  const { register: registerSignup, handleSubmit: handleSubmitSignup } = useForm()

  useEffect(() => {
    if (user.logged) return navigate('/')
  }, [user.logged])

  const onLogin = async ({ email, password }) => {
    dispatch(login({ email, password }))
      .then(res => {
        // if (res.meta.requestStatus === 'fulfilled') return navigate('/')
      })
  }
  const onSignup = (data) => {
    dispatch(signup(data))
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className='min-h-screen p-4 bg-eerie-700'
    >
      <AnimatePresence>
        {
          (
            openPage === 0 &&
              <motion.div
                key='base'
                initial={{ opacity: 0, position: 'sticky' }}
                animate={{ opacity: 1, position: 'sticky' }}
                exit={{ opacity: 0, position: 'sticky', transition: { duration: 0.5 } }}
                className='flex flex-col items-center h-screen'
              >
                <img
                  src='/src/images/FelseFor.png'
                  alt='fElseFor logo'
                />
                <p className='mt-16 text-4xl font-bold text-center'>
                  Encuentra los mejores
                  <br />
                  componentes para ti
                </p>
                <div className='flex gap-2 mt-4 text-2xl '>
                  <button
                    onClick={() => setOpenPage(1)}
                    className='py-1 pl-4 pr-2 border-2 rounded-l-full hover:bg-eerie-800 bg-eerie-900 border-felse'
                  >
                    <b>&lt;</b> Inicia sesión
                  </button>
                  <button
                    onClick={() => setOpenPage(2)}
                    className='py-1 pl-2 pr-4 border-2 rounded-r-full hover:bg-eerie-800 bg-eerie-900 border-felse'
                  >
                    Regístrate <b>&gt;</b>
                  </button>
                </div>
                <Link to='/' className='absolute p-2 font-bold rounded-full bottom-10 bg-eerie-900'>inicio</Link>
              </motion.div>
          ) ||
          (
            openPage === 1 &&
              <motion.div
                key='login'
                initial={{ opacity: 0, position: 'sticky', x: 100 }}
                animate={{ opacity: 1, position: 'sticky', x: 0 }}
                exit={{ x: 100, opacity: 0, position: 'sticky', transition: { duration: 0.5 } }}
                transition={{ bounce: false, delay: 0.5, duration: 0.5 }}
                className='flex flex-col items-center w-full h-full'
              >
                <button
                  onClick={() => setOpenPage(0)}
                  className='absolute bottom-0 p-2 font-bold rounded-full right-10 bg-eerie-800'
                >
                  volver <b>&gt;</b>
                </button>
                <h2 className='mt-16 font-bold'>Iniciar</h2>
                <form onSubmit={handleSubmitLogin(onLogin)} className='flex flex-col items-center w-full text-2xl'>
                  <label className='mt-8 font-semibold text-felse'>Email</label>
                  <input
                    className='w-5/6 p-2 border-l-8 outline-none bg-eerie-900 focus:bg-eerie-800 rounded-xl border-for'
                    type='email'
                    required
                    {...registerLogin('email', { required: true })}
                  />
                  <label className='mt-8 font-semibold text-felse'>Contraseña</label>
                  <input
                    type='password'
                    className='w-5/6 p-2 border-l-8 outline-none bg-eerie-900 focus:bg-eerie-800 rounded-xl border-for'
                    required
                    {...registerLogin('password', { required: true })}
                  />
                  {
                    user.error &&
                      <p className='px-2 py-1 mt-2 text-2xl font-semibold text-red-500 rounded-lg bg-white/5'>
                        {user.message}
                      </p>
                  }
                  <button
                    className='px-4 py-1 mt-8 font-bold border-2 rounded-full hover:bg-eerie-800 bg-eerie-900 border-felse'
                  >Entrar
                  </button>
                </form>
              </motion.div>
          ) ||
          (
            openPage === 2 &&
              <motion.div
                key='signup'
                initial={{ opacity: 0, position: 'sticky', x: -100 }}
                animate={{ opacity: 1, position: 'sticky', x: 0 }}
                exit={{ x: -100, opacity: 0, position: 'sticky', transition: { duration: 0.5 } }}
                transition={{ bounce: false, delay: 0.5, duration: 0.5 }}
                className='flex flex-col items-center w-full h-full'
              >
                <button
                  onClick={() => setOpenPage(0)}
                  className='absolute bottom-0 p-2 font-bold rounded-full bg-eerie-800 left-10'
                >
                  <b>&lt;</b> volver
                </button>
                <h2 className='mt-16 font-bold'>Iniciar</h2>
                <form onSubmit={handleSubmitSignup(onSignup)} className='flex flex-col items-center w-full text-2xl'>

                  <label className='mt-8 font-semibold text-felse'>Nombre de usuario</label>
                  <input
                    className='w-5/6 p-2 border-l-8 outline-none bg-eerie-900 focus:bg-eerie-800 rounded-xl border-for'
                    type='text'
                    required
                    {...registerSignup('username', {
                      required: {
                        value: true,
                        message: ''
                      }
                    })}
                  />

                  <label className='mt-8 font-semibold text-felse'>Email</label>
                  <input
                    className='w-5/6 p-2 border-l-8 outline-none bg-eerie-900 focus:bg-eerie-800 rounded-xl border-for'
                    type='email'
                    required
                    {...registerSignup('email', {
                      required: {
                        value: true,
                        message: ''
                      }
                    })}
                  />

                  <label className='mt-8 font-semibold text-felse'>Contraseña</label>
                  <input
                    type='password'
                    className='w-5/6 p-2 border-l-8 outline-none bg-eerie-900 focus:bg-eerie-800 rounded-xl border-for'
                    required
                    {...registerSignup('password', {
                      required: {
                        value: true,
                        message: ''
                      }
                    })}
                  />

                  <label className='mt-8 font-semibold text-felse'>Nombre</label>
                  <input
                    className='w-5/6 p-2 border-l-8 outline-none bg-eerie-900 focus:bg-eerie-800 rounded-xl border-for'
                    type='text'
                    required
                    {...registerSignup('firstname', {
                      required: {
                        value: true,
                        message: ''
                      }
                    })}
                  />

                  <label className='mt-8 font-semibold text-felse'>Apellido</label>
                  <input
                    type='text'
                    className='w-5/6 p-2 border-l-8 outline-none bg-eerie-900 focus:bg-eerie-800 rounded-xl border-for'
                    required
                    {...registerSignup('lastname', {
                      required: {
                        value: true,
                        message: ''
                      }
                    })}
                  />

                  <label className='mt-8 font-semibold text-felse'>Foto de perfil</label>
                  <input
                    type='file'
                    className='w-5/6 file:text-white file:p-2 file:border-l-8 file:bg-eerie-900 file:focus:bg-eerie-800 file:rounded-xl file:border-for'
                    {...registerSignup('logo')}
                  />

                  <div className='flex flex-col items-center py-2 mt-8 border border-black bg-eerie-900/30 rounded-3xl'>
                    <p className='text-3xl font-semibold text-for'>Residencia</p>

                    <label className='mt-4 font-semibold text-felse'>País</label>
                    <select
                      className='w-5/6 p-2 py-2 border-l-8 outline-none bg-eerie-900 focus:bg-eerie-800 rounded-xl border-for'
                      required
                      {...registerSignup('country', {
                        required: {
                          value: true,
                          message: ''
                        }
                      })}
                    >
                      <option value='AR'>Argentina</option>
                    </select>

                    <label className='mt-8 font-semibold text-felse'>Estado/Provincia</label>
                    <input
                      type='text'
                      className='w-5/6 p-2 border-l-8 outline-none bg-eerie-900 focus:bg-eerie-800 rounded-xl border-for'
                      required
                      {...registerSignup('state', {
                        required: {
                          value: true,
                          message: ''
                        }
                      })}
                    />

                    <label className='mt-8 font-semibold text-felse'>Ciudad</label>
                    <input
                      type='text'
                      className='w-5/6 p-2 border-l-8 outline-none bg-eerie-900 focus:bg-eerie-800 rounded-xl border-for'
                      required
                      {...registerSignup('city', {
                        required: {
                          value: true,
                          message: ''
                        }
                      })}
                    />

                    <label className='mt-8 font-semibold text-felse'>Código postal</label>
                    <input
                      type='text'
                      className='w-5/6 p-2 border-l-8 outline-none bg-eerie-900 focus:bg-eerie-800 rounded-xl border-for'
                      required
                      {...registerSignup('postal_code', {
                        required: {
                          value: true,
                          message: ''
                        }
                      })}
                    />

                    <label className='mt-8 font-semibold text-felse'>Dirección</label>
                    <input
                      type='text'
                      className='w-5/6 p-2 border-l-8 outline-none bg-eerie-900 focus:bg-eerie-800 rounded-xl border-for'
                      required
                      {...registerSignup('line1', {
                        required: {
                          value: true,
                          message: ''
                        }
                      })}
                    />

                  </div>

                  {
                    user.error &&
                      <p className='px-2 py-1 mt-2 text-2xl font-semibold text-red-500 rounded-lg bg-white/5'>
                        {user.message}
                      </p>
                  }

                  <button
                    className='px-4 py-1 mt-8 font-bold border-2 rounded-full hover:bg-eerie-800 bg-eerie-900 border-felse'
                  >Entrar
                  </button>
                </form>
              </motion.div>
          )
        }
      </AnimatePresence>
    </motion.main>
  )
}

export default Login
