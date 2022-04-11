import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useEffect, useState } from 'react'
import { post } from '../api'
import PaymentForm from '../components/PaymentForm'
import { stripePK } from '../config'

const Checkout = () => {
  const stripe = loadStripe(stripePK)
  const [clientSecret, setClientSecret] = useState('')

  useEffect(() => {
    post('/payments/intent', {
      amount: 10000
    })
      .then(({ data }) => setClientSecret(data.clientSecret))
  }, [])

  const appearance = {
    theme: 'night',
    variables: {
      colorPrimary: '#F98009',
      colorBackground: '#363636',
      borderRadius: '10px'
    },
    labels: 'floating'
  }

  return (
    <div>
      {
        clientSecret &&
          <Elements stripe={stripe} options={{ clientSecret, appearance }}>
            <PaymentForm />
          </Elements>
      }
    </div>
  )
}

export default Checkout
