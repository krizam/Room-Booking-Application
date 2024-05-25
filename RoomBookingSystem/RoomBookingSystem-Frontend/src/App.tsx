import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./pages/homepage/HomePage.tsx";
import HomeNavbar from "./pages/homepage/HomeNavbar.tsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.tsx";
import AdminSidebar from "./pages/Admin/AdminSidebar.tsx";
import UserProfileView from "./pages/UserProfileView/UserProfileView.tsx";
import CustomerPage from "./pages/Admin/CustomerPage.tsx";
import ManageCategory from "./pages/Admin/ManageCategory.tsx";
import ManageRoom from "./pages/Admin/ManageRoom.tsx";
import OurRoom from "./pages/RoomPage/OurRoom.tsx";
import EditCategory from "./pages/Admin/EditCategory.tsx";
import EditRoom from "./pages/Admin/EditRoom.tsx";
import Booking from "./pages/BookingPage/Booking.tsx";
import ManageBooking from "./pages/Admin/ManageBooking.tsx";
import RoomDescription from "./pages/Description/RoomDescription.tsx";
import AllBookings from "./pages/BookingPage/AllBookings.tsx";



const queryClient = new QueryClient();
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
        <QueryClientProvider client={queryClient}>
        <RouterProvider router={createBrowserRouter([
            {path:"/",element:<HomePage/>},
            {path:"/navbar",element:<HomeNavbar/>},
            {path:"/AdminDashboard",element:<AdminDashboard/>},
            {path:"/AdminSidebar",element:<AdminSidebar/>},
            {path: "/UserProfileView", element: <UserProfileView/>},
            {path: "/CustomerPage", element: <CustomerPage/>},
            {path: "/ManageCategory", element: <ManageCategory/>},
            {path: "/edit/:pk_id", element: <EditCategory/>},
            {path: "/editRoom/:pk_id", element: <EditRoom/>},
            {path: "/ManageRoom", element: <ManageRoom/>},
            {path: "/OurRoom", element: <OurRoom/>},
            {path: "/book", element: <Booking/>},
            {path: "/ManageBooking", element: <ManageBooking/>},
            {path: "/Description", element: <RoomDescription/>},
            {path: "/allbook", element: <AllBookings/>},

            ])}/>
        </QueryClientProvider>
    </>
  )
}

export default App
