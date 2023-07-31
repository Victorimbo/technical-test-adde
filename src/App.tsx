import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './pages/HomePage';
import DetailsPage from './pages/Details';

const router = createBrowserRouter([
  {
    element: <HomePage />,
    path: "/"
  },
  {
    element: <DetailsPage />,
    path: "/details/:id"
  },
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
