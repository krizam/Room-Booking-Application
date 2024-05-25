import React, { useState, useEffect } from "react";
import "../../css/OurRoom.css";
import RoomCard from "./roomCard.tsx";
import Navbar from "./roomNavbar.tsx";
import HomeNavbar from "../homepage/HomeNavbar.tsx";
import {Link, useLocation} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface RoomItem {
    category: {
        name: string;
    };
}

const OurRoom: React.FC = () => {
    const location = useLocation();
    const currentLocation = location.pathname;

    const { data: Room2 } = useQuery({
        queryKey: ["GET_ROOM_DATA"],
        queryFn() {
            return axios.get<RoomItem[]>("http://localhost:8080/room/findAll");
        },
    });

    const [roomData, setRoomData] = useState<RoomItem[]>([]);
    const [roomList, setRoomList] = useState<string[]>([]);

    useEffect(() => {
        if (Room2?.data) {
            setRoomData(Room2.data);

            const uniqueCategories = [
                ...new Set(
                    Room2.data.map((curElem) => curElem?.category?.name || "Uncategorized")
                ),
                "All",
            ];
            setRoomList(uniqueCategories);
        }
    }, [Room2?.data]);

    const filterRoom = (category: string) => {
        if (category === "All") {
            setRoomData(Room2?.data || []);
            return;
        }

        const updatedList = Room2?.data?.filter((curElem) => {
            return curElem?.category?.name === category;
        }) || [];

        setRoomData(updatedList);
    };

    return (
        <>
            <div className={"room-page-div"}>
                <HomeNavbar activePage={currentLocation} />
                <div className={"check-out-container"}>
                    <h2>Book Our</h2>
                    <h1>ROOMS</h1>

                    <div className={"booked"}>
                        <button className={"bookbtn"}><Link to={"/allbook"}>Bookings</Link></button>
                    </div>

                </div>

                <div className={"room-contents"}>
                    <Navbar filterRoom={filterRoom} roomList={roomList} />
                    <RoomCard roomData={roomData} />
                </div>
            </div>
        </>
    );
};

export default OurRoom;