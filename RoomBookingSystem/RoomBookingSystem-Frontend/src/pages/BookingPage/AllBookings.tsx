import "../../css/ManageBooking.css";
import { useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const AllBookings = () => {
    const location = useLocation();
    const currentLocation = location.pathname;

    const [search, setSearch] = useState('');

    // Fetching data from API
    const { data: bookings, refetch } = useQuery({
        queryKey: ["GETBOOKINGDATA"],
        queryFn() {
            return axios.get("http://localhost:8080/booking/getAll")
        }
    })

    // Searching data
    const filteredData = bookings?.data.filter((booking) =>
        booking.id.toString().includes(search.toLowerCase()) || // Include ID
        booking.fullName.toLowerCase().includes(search.toLowerCase()) ||
        booking.email.toLowerCase().includes(search.toLowerCase())
    );

    // Dynamically calculate the number of bookings
    const bookingLength = filteredData ? filteredData.length : 0;


    return (
        <>
            <div className={"customer-page"}>
                <div className={"customer-page-right"}>
                    <header className={"customer-page-header"}>
                        <h1>Bookings</h1>
                        <div className={"search-wrapper2"} style={{ width: "16rem" }}>
                            <span><FaSearch /></span>
                            <input type={"search"} placeholder={"Search Bookings"} value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                    </header>
                    <div className={"customer-page-main"}>
                        <div className={"no-of-customer"}>
                            <h2>No. of Bookings: {bookingLength}</h2>
                        </div>
                        <table className={"customer-table"}>
                            <thead>
                            <tr>
                                <th className={"id-box3"}>ID</th>
                                <th className={"name-box3"}>Full Name</th>
                                <th className={"email-box2"}>Email</th>
                                <th className={"email-box2"}>Start Date</th>
                                <th className={"email-box2"}>End Date</th>
                                <th className={"email-box2"}>Room Id</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredData?.map((booking) => (
                                <tr key={booking?.id}>
                                    <td>{booking?.id}</td>
                                    <td>{booking?.fullName}</td>
                                    <td>{booking?.email}</td>
                                    <td>{booking?.startDate}</td>
                                    <td>{booking?.endDate}</td>
                                    <td>{booking?.room?.id}</td>
                                    <td>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllBookings;
