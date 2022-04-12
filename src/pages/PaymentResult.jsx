import { useStripe } from '@stripe/react-stripe-js'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const PaymentResult = () => {
  const stripe = useStripe()
  const [message, setMessage] = useState('')
  const { state } = useLocation()

  useEffect(() => {
    stripe.retrievePaymentIntent(state.clientSecret)
      .then(({ paymentIntent }) => {
        switch (paymentIntent.status) {
          case 'succeeded':
            setMessage('¡Pago completado! Puede volver a la página de inicio.')
            break
          case 'processing':
            setMessage('Tu pago está en proceso.')
            break
          case 'requires_payment_method':
            setMessage('El pago fue rechazado, intente otra vez.')
            break
          default:
            setMessage('Error, intente otra vez')
            break
        }
      })
  }, [stripe])

  return (
    <div>
      <p>{message}</p>
    </div>
  )
}

export default PaymentResult
