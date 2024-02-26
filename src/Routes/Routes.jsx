import { createBrowserRouter } from "react-router-dom"
import HeaderSidebar from "../Components/Header&Sidebar/HeaderSidebar"
import AmbuCards from "../Components/Pages/AmbuCards"
import AmbulanceDetails from "../Components/Pages/AmbulanceDetails/AmbulanceDetails"
import Login from "../Components/Pages/Login"
import Doctors from "../Components/Pages/DoctorsRoute/Doctors"
import GetRoomId from "../videoChat/Home/GetRoomId"
import Room from "../videoChat/Room/Room"
import MyRequest from "../Components/Pages/myRequests/MyRequest"
import DoctorRequests from "../Components/Pages/DoctorRequest/DoctorRequests"
import Visits from "../Components/Pages/totalVisits/Visits"
import AddNewDoc from "../Components/Pages/adminRoutes/AddNewDoc"
import MyBookings from "../Components/Pages/MyBookings"
import AddNewDriver from "../Components/Pages/AddNewDriver"
import AllUsers from "../Components/Pages/AllUsers"
import AllAmbulance from "../Components/Pages/AllAmbulance"
import AdminRoute from "../Hooks/AdminRoute"
import PrivateRoute from "../Hooks/PrivateRoute"
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
                element: <PrivateRoute><AmbulanceDetails /></PrivateRoute>
            },
            {
                path: "/medic-guide",
                element: <PrivateRoute><Doctors /></PrivateRoute>
            },
            {
                path: "/chat-room",
                element: <PrivateRoute><GetRoomId></GetRoomId></PrivateRoute>
            },
            {
                path: "/room/:roomId",
                element: <Room></Room>
            },
            {
                path: "/my-requests",
                element: <PrivateRoute><MyRequest /></PrivateRoute>
            },
            {
                path: "/requests",
                element: <PrivateRoute><DoctorRequests></DoctorRequests></PrivateRoute>
            },
            {
                path: "/total-visits",
                element: <PrivateRoute><AdminRoute><Visits /></AdminRoute></PrivateRoute>
            },
            {
                path: "/add-new-doc",
                element: <PrivateRoute><AdminRoute><AddNewDoc></AddNewDoc></AdminRoute></PrivateRoute>
            },
            {
                path: "/my-Bookings",
                element: <PrivateRoute><MyBookings></MyBookings></PrivateRoute>
            },
            {
                path: "/add-new-ambulance",
                element: <PrivateRoute><AddNewDriver></AddNewDriver></PrivateRoute>
            },
            {
                path: "/all-users",
                element: <PrivateRoute><AllUsers></AllUsers></PrivateRoute>
            },
            {
                path: "/all-ambulance",
                element: <PrivateRoute><AllAmbulance></AllAmbulance></PrivateRoute>
            }
        ]

    },
    {
        path: "/login",
        element: <Login></Login>
    }
])

