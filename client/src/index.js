import ReactDom from "react-dom/client"
import {RouterProvider , createBrowserRouter} from 'react-router-dom'
import Home from './Views/Home/Home'
import Register from './Views/Register/Register'
import Login from './Views/Login/Login'
import AddContact from './Views/AddContact/AddContact'
import EditContact from './Views/EditContact/EditContact'
import PageNotFound from "./Views/PageNotFound/PageNotFound"
import "./index.css"



const root =ReactDom.createRoot(document.getElementById("root"))
const router = createBrowserRouter([
    {
        path:"/" ,
        element:<Home/> 
    },
    {
        path: "/register",
        element: <Register/>
    },
    {
        path:"/login" ,
        element: <Login/>
    },
    {
        path: '/addcontact',
        element: <AddContact/>
    },
    {
        path:"/editcontact/:id",
        element:<EditContact/>
    },
    {
        path:'*',
        element:<PageNotFound/>

    }
])

root.render(<RouterProvider router={router}/>)