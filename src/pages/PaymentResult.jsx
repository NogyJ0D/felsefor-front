import { useStripe } from '@stripe/react-stripe-js'
import { useState, useEffect } from 'react'

const PaymentResult = () => {
  const stripe = useStripe()
  const [message, setMessage] = useState('')

  useEffect(() => {
    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    )

    stripe.retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }) => {
        switch (paymentIntent) {
          case 'succeeded':
            setMessage('¡Pago completado!')
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
  }, [])

  return (
    <div>
      <p>{message}</p>
    </div>
  )
}

export default PaymentResult
