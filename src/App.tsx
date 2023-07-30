import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './pages/HomePage';

const router = createBrowserRouter([
  {
    element: <HomePage />,
    path: "/"
  },
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
