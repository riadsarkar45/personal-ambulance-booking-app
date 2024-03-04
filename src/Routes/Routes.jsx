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
import Home from "../LandingPage/Home"
import Registration from "../Components/Pages/Registration"
export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home></Home>,

    },
    {
        path: 'dashboard',
        element: <HeaderSidebar></HeaderSidebar>,
        children: [
            {
                path: "/dashboard",
                element: <AmbuCards></AmbuCards>
            },
            {
                path: "/dashboard/see-detail/:id",
                element: <PrivateRoute><AmbulanceDetails /></PrivateRoute>
            },
            {
                path: "/dashboard/medic-guide",
                element: <PrivateRoute><Doctors /></PrivateRoute>
            },
            {
                path: "/dashboard/chat-room",
                element: <PrivateRoute><GetRoomId></GetRoomId></PrivateRoute>
            },
            {
                path: "/dashboard/room/:roomId",
                element: <Room></Room>
            },
            {
                path: "/dashboard/my-requests",
                element: <PrivateRoute><MyRequest /></PrivateRoute>
            },
            {
                path: "/dashboard/requests",
                element: <PrivateRoute><DoctorRequests></DoctorRequests></PrivateRoute>
            },
            {
                path: "/dashboard/total-visits",
                element: <PrivateRoute><AdminRoute><Visits /></AdminRoute></PrivateRoute>
            },
            {
                path: "/dashboard/add-new-doc",
                element: <PrivateRoute><AdminRoute><AddNewDoc></AddNewDoc></AdminRoute></PrivateRoute>
            },
            {
                path: "/dashboard/my-Bookings",
                element: <PrivateRoute><MyBookings></MyBookings></PrivateRoute>
            },
            {
                path: "/dashboard/add-new-ambulance",
                element: <PrivateRoute><AddNewDriver></AddNewDriver></PrivateRoute>
            },
            {
                path: "/dashboard/all-users",
                element: <PrivateRoute><AllUsers></AllUsers></PrivateRoute>
            },
            {
                path: "/dashboard/all-ambulance",
                element: <PrivateRoute><AllAmbulance></AllAmbulance></PrivateRoute>
            }
        ]
    },
    {
        path: "/login",
        element: <Login></Login>
    },
    {
        path: "/register",
        element: <Registration />
    }
])

