import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'

const PaymentForm = ({ clientSecret }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [loaded, setLoaded] = useState(false)

  const onPayment = async e => {
    e.preventDefault()

    const response = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardNumberElement)
      }
    })
    console.log(response)
    return <Navigate state={{ clientSecret }} to='/checkout/success' />
  }

  return (
    <>
      {
        stripe
          ? (
            <form id='payment-form' onSubmit={onPayment} className='text-xl items-center w-full font-semibold'>
              <CardNumberElement options={{ style: { base: { color: '#f5f5f5', fontSize: '24px' } } }} className='bg-eerie-700 px-2 py-1 rounded-lg mb-2 border-felse border-2 text-white text-2xl' onReady={() => setLoaded(true)} />
              <CardCvcElement options={{ style: { base: { color: '#f5f5f5', fontSize: '24px' } } }} className='bg-eerie-700 px-2 py-1 rounded-lg mb-2 border-felse border-2 text-white text-2xl' />
              <CardExpiryElement options={{ style: { base: { color: '#f5f5f5', fontSize: '24px' } } }} className='bg-eerie-700 px-2 py-1 rounded-lg mb-2 border-felse border-2 text-white text-2xl' />
              {
                loaded
                  ? (
                    <button className='border-2 border-felse text-white bg-black text-2xl w-full text-center px-2 py-1 rounded-full'>Pagar</button>
                    )
                  : (
                    <p>Cargando</p>
                    )
                }
            </form>
            )
          : (
            <p>Cargando</p>
            )
      }
    </>
  )
}

export default PaymentForm
