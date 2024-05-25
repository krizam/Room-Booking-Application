import { useEffect } from "react";
import "../../css/RoomDescription.css";
import HomeNavbar from "../homepage/HomeNavbar.tsx";
import { useLocation } from "react-router-dom";

const RoomDescription: React.FC = () => {
    const location = useLocation();
    const currentLocation = location.pathname;

    useEffect(() => {
        document.body.style.overflowY = "auto"; // Enable vertical scrolling
    }, []);

    return (
        <>
            <div className="room-page-div">
                <HomeNavbar activePage={currentLocation} />
                <div className="room-container">
                    <div className="room-item">
                        <div className="room-details">
                            <h3>Single Bed</h3>
                            <p>Capacity: 1 person(One Bed)</p>
                            <p>Price: Rs.1000/night</p>
                        </div>
                        <img className="room-image" src="src/assets/image/img_4.png" alt="Single Bed" />
                    </div>
                    <div className="room-item-2">
                        <div className="room-details">
                            <h3>Double Bed</h3>
                            <p>Capacity: 2 person(Two Beds)</p>
                            <p>Price: Rs.2000/night</p>
                        </div>
                        <img className="room-image-2" src="src/assets/image/img_3.png" alt="Double Bed" />
                    </div>
                    <div className="room-item-3">
                        <div className="room-details">
                            <h3>Dormitory Bed</h3>
                            <p>Capacity: 4-6 person(4-5 Beds)</p>
                            <p>Price: Rs.3000/night</p>
                        </div>
                        <img className="room-image-3" src="src/assets/image/img_2.png" alt="Dormitory Bed" />
                    </div>
                    <div className="room-item-4">
                        <div className="room-details">
                            <h3>Premium Bed</h3>
                            <p>Capacity: 2 person(One Big Bed)</p>
                            <p>Price: Rs.4000/night</p>
                        </div>
                        <img className="room-image-4" src="src/assets/image/img_1.png" alt="Premium Bed" />
                    </div>
                    {/* Add more room items as needed */}
                </div>
            </div>
        </>
    );
};

export default RoomDescription;
