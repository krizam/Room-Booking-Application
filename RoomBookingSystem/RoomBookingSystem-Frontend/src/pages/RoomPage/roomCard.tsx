import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RoomCard = ({ roomData }) => {
    const [user, setUser] = useState({});
    const [bookedRooms, setBookedRooms] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("userDetails"));
        setUser(data);
        fetchBookedRooms();
    }, []);

    const fetchBookedRooms = async () => {
        try {
            const response = await axios.get("http://localhost:8080/booking/getAll"); // Adjust the API endpoint accordingly
            const bookedRoomIds = response.data.map((booking) => booking.room.id);
            setBookedRooms(bookedRoomIds);
        } catch (error) {
            console.error("Error fetching booked rooms:", error);
        }
    };

    const isRoomBooked = (roomId) => {
        return bookedRooms.includes(roomId);
    };

    const renderButton = (roomId, roomPrice) => {
        if (!user || Object.keys(user).length === 0) {
            return (
                <button className="add-to-card-price unbooked-btn" onClick={showLoginAlert}>
                    Login to book
                </button>
            );
        } else if (isRoomBooked(roomId)) {
            return <button className="add-to-card-price booked-btn">Booked</button>;
        } else {
            return (
                <Link to={{ pathname: "/book", state: { roomId, roomPrice } }}>
                    <button className="add-to-card-price unbooked-btn">Book</button>
                </Link>
            );
        }
    };

    const showLoginAlert = () => {
        alert("Please log in to book a room from homepage!!");
    };

    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", overflowY: "scroll", maxHeight: "600px" }}>
            {roomData && roomData.length > 0 ? (
                roomData.map((curElem) => (
                    <div className="room-card-container" key={curElem?.id}>
                        <div className="room-card">
                            <div className="room-card-body">
                                <span className="room-card-author subtle">{curElem?.category?.name}</span>
                                <img
                                    src={curElem?.roomImage || "https://via.placeholder.com/150"} // Placeholder image URL
                                    alt={curElem?.roomName}
                                    className="room-card-media"
                                    style={{ width: "100%", height: "150px", objectFit: "cover" }} // Set fixed size for images
                                />
                                <h2 className="room-card-title">{curElem?.roomName}</h2>
                                <div className="price-addtocart-div">
                                    <h4 className="room-card-price subtle">Rs. {curElem?.roomPrice}</h4>
                                    <span>{renderButton(curElem.id, curElem.roomPrice)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div>No room items available</div>
            )}
        </div>
    );
};

export default RoomCard;
