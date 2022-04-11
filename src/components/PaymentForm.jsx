import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useState } from 'react'

const PaymentForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const [loaded, setLoaded] = useState(false)

  const onPayment = async e => {
    e.preventDefault()

    const response = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000'
      }
    })
    console.log(response)
  }

  return (
    <>
      {
        stripe
          ? (
            <form onSubmit={onPayment}>
              <PaymentElement onReady={() => setLoaded(true)} />
              {
                loaded
                  ? (
                    <button>Pagar</button>
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
