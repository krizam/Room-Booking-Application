import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../../css/HomeNavbar.css";
import UserProfileView from "../UserProfileView/UserProfileView";
import {FaCircleUser} from "react-icons/fa6";

interface Props {
    showLogin: () => void;
}

const HomeNavbar: React.FC<Props> = ({ showLogin }) => {
    const [userProfileVisible, setUserProfileVisible] = useState(false); // State to manage the visibility of the user profile

    const toggleUserProfile = () => {
        setUserProfileVisible(!userProfileVisible);
    };

    const user = localStorage.getItem("userDetails");

    return (
        <>
            <div className={"wrapper"}>
                <div className={"nav-logo"}>
                    <img className={"logo"} src={"src/assets/image/logo-modified.png"} width={"80px"} />
                </div>
                <div className={"nav-options"}>
                    <ul>
                        <Link to={"/"}><a>Home</a></Link>
                        <Link to={"/Description"}><a>Room Description</a></Link>
                        <Link to={"/OurRoom"}><a>Room Booking</a></Link> {/* Update the link to point to the correct route */}
                         {/* Update the link to point to the correct route */}
                    </ul>
                </div>
                <div className={"login-btn"}>
                    {!user && (
                        <button className={"head-btn"} onClick={showLogin}>Login</button>
                    )}
                </div>

                {user && (
                    <span className={"fullnamedisplay"} onClick={toggleUserProfile}>
                        <FaCircleUser style={{ fontSize: "2.5rem", marginRight: "20px" }} />
                    </span>
                )}
            </div>

            {userProfileVisible && <UserProfileView />}
        </>
    );
}

export default HomeNavbar;