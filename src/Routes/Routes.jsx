import { createBrowserRouter } from "react-router-dom"
import HeaderSidebar from "../Components/Header&Sidebar/HeaderSidebar"
import AmbuCards from "../Components/Pages/AmbuCards"
import AmbulanceDetails from "../Components/Pages/AmbulanceDetails/AmbulanceDetails"
import Login from "../Components/Pages/Login"

export const router = createBrowserRouter([
    {
        path: '/',
        element: <HeaderSidebar />,
        children: [
            {
                path: "/",
                element: <AmbuCards />
            },
            {
                path: "/see-detail/:id",
                element: <AmbulanceDetails />
            },
            {
                path: "/medic-guide",
                element: "medic guide"
            }
        ]

    },
    {
        path: "/login",
        element: <Login></Login>
    }
])

