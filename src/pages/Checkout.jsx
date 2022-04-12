import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { post } from '../api'
import PaymentForm from '../components/PaymentForm'
// import { stripePK } from '../config'

const Checkout = () => {
  const promise = loadStripe('pk_test_51KifweI1XgjcsrLOZMzZ9X9QAdCbMkOVyYQJ7Ju3pTQwLdOagU8phWIntq6MSoc3vubNM7eZep1yKGF7Rq2yLIEs00H0b8h7ha')
  const [clientSecret, setClientSecret] = useState('')
  const user = useSelector(state => state.user)
  const navigate = useNavigate()
  const { state } = useLocation()

  useEffect(() => {
    if ((!user.loading && !user.logged) || !state) return navigate('/')
  }, [user.logged])

  useEffect(() => {
    post('/payments/create-intent', {
      amount: state.amount,
      customerId: user.customerId
    })
      .then(({ data }) => setClientSecret(data.clientSecret))
    console.log(clientSecret)
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
      <p className='font-bold text-center text-6xl'>fElseFor</p>
      <p className='text-2xl'>Vas a pagar: ${state?.amount?.toString().slice(0, -2)} USD</p>
      {
        clientSecret &&
          <Elements stripe={promise} options={{ clientSecret, appearance }}>
            <PaymentForm clientSecret={clientSecret} />
          </Elements>
      }
    </div>
  )
}

export default Checkout
