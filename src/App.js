import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './components/Layout';
import CurrentLocation from './components/CurrentLocation';
import SearchLocation from './components/SearchLocation';
import Out from './components/App';
const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path:"/",
        element:<Out/>
      },
      {
        path: "/CurrentLocation",
        element: <CurrentLocation />,
      },
      {
        path:"/SearchLocation",
        element:<SearchLocation/>,
      },
      {
        path:"/CurrentLocation/SearchLocation",
        element:<SearchLocation/>,
      }
    ],
  },
]);
function App() {
  return (
    <div className="App">
      <div>
        <RouterProvider router={AppRouter}/>
      </div>
    </div>
  );
}

export default App;