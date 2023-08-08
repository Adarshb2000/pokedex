import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Header from './Header'
import Home from './Home'
import Footer from './Footer'
import Pokedex from './Pokedex'
import Legendaries from './Legendaries'
import ErrorPage from './ErrorPage'

const Wrapper = () => {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Wrapper />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/pokedex',
        element: <Pokedex />,
      },
      {
        path: '/legendaries',
        element: <Legendaries />,
      },
    ],
    errorElement: <ErrorPage />,
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
