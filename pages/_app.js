// import '../styles/globals.css'
import '../src/styles/main.css'
import '../src/styles/modifier.css'
import { NextUIProvider } from '@nextui-org/react'
import store from '../src/redux/store'
import { Provider } from 'react-redux'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe("pk_test_51KZ1kfCTTOORhkZPkGeRs8LAo6hqaY3PJ91iPDZfNqoPorE0dNnWSm748TTgrvL2IYvfrYHGIAsCJqPR7LNViOl800bowNbqbK")


function MyApp({ Component, pageProps }) {

  const options = {
    clientSecret: "sk_test_51KZ1kfCTTOORhkZPQkMmoKPiXB3u7OeEbvquppLjznqpHr4eDjql0Aa1hiuat6sDs92yDBRmy0U0oIkvfaHlNmAU00QfJuf4Pv"
  }


  return (
    <Provider store={store}>
        <NextUIProvider>
          <Elements stripe={stripePromise}  >
            <Component {...pageProps} />
          </Elements>
        </NextUIProvider>
    </Provider>
  )
}


export default MyApp
