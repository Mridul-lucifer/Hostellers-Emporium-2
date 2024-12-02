import React from 'react'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import LoginPage from './Components/LoginPage'
import Signup from './Components/Signup'
import HomePage from './Components/HomePage'
import Header from './Components/Header'
import Footer from './Components/Footer'
// import SellProduct from './Components/SellProduct'
import Sell from './Components/sell/sell'
// import BuyProduct from './Components/BuyProduct'
import Buy from './Components/Buy/Buy'
// import YourProducts from './Components/YourProducts'
import YourProducts from './Components/YourProducts/YourProducts'
import UpdateProfile from './Components/UpdateProfile'
import ChangePassword from './Components/ChangePassword'
import DeleteProfile from './Components/DeleteProfile'
import Query from './Components/Query'
import YourBoughtProducts from './Components/YourBoughtProducts'
import ChatingRoom from './Components/ChatingRoom'
export default function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element :<LoginPage/>
    },
    {
      path:"/Login",
      element :<LoginPage/>
    },
    {
      path:"/Signup",
      element : <Signup/>
    },
    {
      path:"/Home",
      element : <><Header/><HomePage/><Footer/></>
    },
    {
      path:"/UpdateProfile",
      element: <><Header/><UpdateProfile/><Footer/></>
    },
    {
      path : "/SellProduct",
      element : <><Header/><Sell/><Footer/></>
    },
    {
      path : "/BuyProducts",
      element : <><Header/><Buy/><Footer/></>
    },
    {
      path : "/YourProducts",
      element : <><Header/><YourProducts/><Footer/></>
    },
    {
      path : "/ChangePassword",
      element : <><Header/><ChangePassword/><Footer/></>
    },
    {
      path : "/DeleteProfile",
      element : <><Header/><DeleteProfile/><Footer/></>
    },
    {
      path:"/Query",
      element:<><Header/><Query/><Footer/></>
    },
    {
      path: "/YourBoughtProducts",
      element:<><Header/><YourBoughtProducts/><Footer/></>
    },
    {
      path:"/ChatingRoom",
      element:<><Header/><ChatingRoom/><Footer/></>
    }
  ])
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}