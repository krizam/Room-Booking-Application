import React from "react";

interface NavbarProps {
    filterRoom: (category: string) => void;
    roomList: string[];
}

const Navbar: React.FC<NavbarProps> = ({ filterRoom, roomList }) => {

    // console.log(roomList)
    return (
        <>
            <nav className="room-navbar">
                <h2>Categories</h2>
                <div className="room-btn-group">
                    {roomList.map((curElem) => (
                        <button
                            key={curElem}
                            className="room-btn-group__Room"
                            onClick={() => filterRoom(curElem)}>
                            {curElem}
                        </button>
                    ))}
                </div>
            </nav>
        </>
    );
};

export default Navbar;