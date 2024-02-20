import { createBrowserRouter } from "react-router-dom"
import HeaderSidebar from "../Components/Header&Sidebar/HeaderSidebar"
import AmbuCards from "../Components/Pages/AmbuCards"
import AmbulanceDetails from "../Components/Pages/AmbulanceDetails/AmbulanceDetails"
import Login from "../Components/Pages/Login"
import Doctors from "../Components/Pages/DoctorsRoute/Doctors"
import GetRoomId from "../videoChat/Home/GetRoomId"
import Room from "../videoChat/Room/Room"

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
                element: <Doctors />
            },
            {
                path: "/chat-room",
                element: <GetRoomId></GetRoomId>
            },
            {
                path: "/room/:roomId",
                element: <Room></Room>
            }
        ]

    },
    {
        path: "/login",
        element: <Login></Login>
    }
])

