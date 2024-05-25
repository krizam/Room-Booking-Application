import "../../css/adminSidebar.css";
import {MdSpaceDashboard} from "react-icons/md";
import { BiSolidCategoryAlt} from "react-icons/bi";
import {TiHome} from "react-icons/ti";
import {IoMdLogOut} from "react-icons/io";
import {FaBowlFood} from "react-icons/fa6";
import {Link} from "react-router-dom"
import React from "react";
import {TbBrandBooking} from "react-icons/tb";
import {FaUserCog} from "react-icons/fa";



interface AdminSidebarProps {
    activePage: string;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activePage }) => {

    const handleLogout = () => {
        // Clear user authentication state from localStorage
        localStorage.removeItem("userDetails");
        // Redirect the user to the login page or any other desired page
        window.location.href = "/"; // Change to your login page route
    };
    return(
        <>
            <div className={"admin-sidebar"}>
                <div className={"sidebar-brand"}>
                    <h1> <span><TiHome style={{fontSize:"2.1rem", marginBottom:"-4px", color:"black"}} /></span>Room Booking</h1>
                </div>

                <div className={"sidebar-options"}>
                    <ul className={"sidebar-list"}>
                        <Link to={"/AdminDashboard"}>
                            <li className={`sidebar-list-item ${activePage === "/AdminDashboard" ? "active" : ""}`}>
                                <span><MdSpaceDashboard style={{fontSize:"18px",marginBottom:"-3px"}}/></span>
                                <a>Dashboard</a>
                            </li>
                        </Link>
                        <Link to={"/CustomerPage"}>
                            <li className={`sidebar-list-item ${activePage === "/" ? "active" : ""}`}>
                                <span><FaUserCog style={{fontSize:"18px",marginBottom:"-3px"}}/></span>
                                <a>Customers</a>
                            </li>
                        </Link>

                        <Link to={"/ManageCategory"}>
                            <li className={`sidebar-list-item ${activePage === "/ManageCategory" ? "active" : ""}`}>
                                <span><BiSolidCategoryAlt style={{fontSize:"18px",marginBottom:"-3px"}}/></span>
                                <a>Manage Category</a>
                            </li>
                        </Link>

                        <Link to={"/ManageRoom"}>
                            <li className={`sidebar-list-item ${activePage === "/ManageRoom" ? "active" : ""}`}>
                                <span><FaBowlFood style={{fontSize:"18px",marginBottom:"-3px"}}/></span>
                                <a>Manage rooms</a>
                            </li>
                        </Link>

                        <Link to={"/ManageBooking"}>
                            <li className={`sidebar-list-item ${activePage === "/ManageBooking" ? "active" : ""}`}>
                                <span><TbBrandBooking style={{fontSize:"20px",marginBottom:"-3px"}}/></span>
                                <a>Manage Booking</a>
                            </li>
                        </Link>
                    </ul>
                </div>



                <div className={"sidebar-btn"}>
                    <button onClick={handleLogout} type={"button"}><span ><IoMdLogOut style={{fontSize:"1.3rem" ,marginBottom:"-3px",marginRight:"3px"}}/></span>Log Out</button>
                </div>
            </div>
        </>
    )
}

export default AdminSidebar