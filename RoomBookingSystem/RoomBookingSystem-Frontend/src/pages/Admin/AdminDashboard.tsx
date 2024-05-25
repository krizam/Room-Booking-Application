import "../../css/AdminDashboard.css";
import {FaUserCog} from "react-icons/fa";

import {Link, useLocation} from "react-router-dom";
import {BiSolidCategoryAlt} from "react-icons/bi";
import {FaBowlFood} from "react-icons/fa6";
import {GoHomeFill} from "react-icons/go";

import AdminSidebar from "./AdminSidebar.tsx";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";



function AdminDashboard(){

    // Fetching data from API
    const{data:userData} = useQuery({
        queryKey:["GETCUSTOMERDATA"],
        queryFn(){
            return axios.get("http://localhost:8080/register/getAll")
        }
    })

    // //Display user details
    // const [user, setUser] = useState({
    //
    // })
    // useEffect(() => {
    //     const data: any = JSON.parse(localStorage.getItem("userDetails"));
    //     setUser(data);
    // }, [localStorage.getItem("userDetails")]);

    return(
        <>
            <div className={"admin-dashboard-page"}>
                <div className={"dashboard-left"} >
                    <AdminSidebar />
                </div>

                <div className={"dashboard-right"}>
                    <header className={"dashboard-header"}>
                        <h1>Dashboard</h1>
                    </header>

                    <div className={"dashboard-main-content"}>
                        <div className={"d-main-content"}>
                            <div className={"dashboard-cards-container"}>
                                <Link to={"/CustomerPage"}>
                                    <div className={"dashboard-cards"}>
                                        <div className={"d-card=left"}>
                                            <h2>Customers</h2>
                                            <h3>{userData?.data.length}</h3>
                                        </div>
                                        <span><FaUserCog style={{fontSize:"4vw",marginBottom:"-3px"}}/></span>
                                    </div>
                                </Link>
                                <Link to={"/ManageCategory"}>
                                    <div className={"dashboard-cards"}>
                                        <div className={"d-card=left"}>
                                            <h2>Categories</h2>
                                            {/*<h3>{categoryData?.data.length}</h3>*/}
                                        </div>
                                        <span><BiSolidCategoryAlt style={{fontSize:"4vw",marginBottom:"-3px"}}/></span>
                                    </div>
                                </Link>
                                <Link to={"/ManageRoom"}>
                                    <div className={"dashboard-cards"}>
                                        <div className={"d-card=left"}>
                                            <h2>Rooms</h2>
                                            {/*<h3>{itemData?.data.length}</h3>*/}
                                        </div>
                                        <span><FaBowlFood style={{fontSize:"3.8vw",marginBottom:"-3px"}}/></span>
                                    </div>
                                </Link>
                                <Link to={"/"}>
                                    <div className={"dashboard-cards"}>
                                        <div className={"d-card=left"}>
                                            <h2>Go to</h2>
                                            <h3 style={{marginTop:"-0.6rem"}}>Home</h3>
                                        </div>
                                        <span><GoHomeFill style={{fontSize:"3.8vw",marginBottom:"-3px"}}/></span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>

    )
}

export default AdminDashboard

