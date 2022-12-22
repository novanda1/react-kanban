import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import NoMatch from './pages/NotMatch'
import Root from './pages/Root'

function App() {
  /**
   * We can separate the router as our application grow.
   */
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          path: '/v1',
          element: <Home />,
        },
        { path: '*', element: <NoMatch /> },
      ],
    },
  ])
  return <RouterProvider router={router} />
}

export default App
