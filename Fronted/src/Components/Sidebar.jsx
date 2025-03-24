import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaTasks, FaBookmark, FaCheckCircle, FaTimesCircle, FaBars, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const Sidebar = () => {
    const [dropmenu, setDropmenu] = useState(false);
    const [userName, setUserName] = useState("Guest");
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUserName(decoded.username || "Guest");
            } catch (error) {
                console.error("Invalid Token:", error);
                setUserName("Guest");
            }
        }
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);
    const Profile = () => setDropmenu(!dropmenu);
    const handleNavigation = (path) => {
        navigate(path);
        setDropmenu(false);
        setIsOpen(false);
    };

    return (
        <>
            {/* Burger Icon */}
            <button
                className="lg:hidden fixed top-2.5 left-3 z-50 p-2 bg-gray-700 text-white rounded-full shadow-lg"
                onClick={toggleMenu}
            >
                {isOpen ? <FaTimes size={12} /> : <FaBars size={12} />}
            </button>
            <div className={`fixed top-1.5 left-0.5 z-40 h-full w-[70%] sm:w-[50%] md:w-[40%] lg:w-[23vw] bg-gray-400 rounded-[8px] p-4 border-2 border-gray-600 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:relative lg:h-[98vh]`}>
                <h2 className="text-lg font-bold">Menu bar</h2>
                <button onClick={Profile} className="w-full text-left">
                    <div className="flex items-center gap-2 mt-3">
                        <FaUser size={20} color="black" />
                        <p className="font-semibold">{userName}</p>
                    </div>
                </button>
                <hr className="my-2" />
                {dropmenu && (
                    <div className="absolute flex flex-col items-start w-[12vw] min-w-[150px] max-w-[250px] bg-gray-700 rounded-lg shadow-lg z-50 md:w-[10vw] lg:w-[8vw]">
                        <button onClick={() => handleNavigation('profile')} className="px-3 py-2 text-white hover:text-gray-400">View Profile</button>
                        <button onClick={() => handleNavigation('changepassword')} className="px-3 py-2 text-white hover:text-gray-400">Change Password</button>
                        <button onClick={() => handleNavigation('/')} className="px-3 py-2 text-white hover:text-gray-400">Log Out</button>
                    </div>
                )}
                <div className='mt-4 leading-9'>
                    <button onClick={() => handleNavigation('/home')} className="flex items-center gap-2 hover:text-gray-600">  <FaTasks /><h3>All Task</h3></button>
                    <button onClick={() => handleNavigation('important')} className="flex items-center gap-2 hover:text-gray-600">   <FaBookmark /><h3>Important Task</h3></button>
                    <button onClick={() => handleNavigation('completed')} className="flex items-center gap-2 hover:text-gray-600">   <FaCheckCircle /><h3>Completed Task</h3></button>
                    <button onClick={() => handleNavigation('incomplete')} className="flex items-center gap-2 hover:text-gray-600">   <FaTimesCircle /><h3>Incomplete Task</h3></button>
                </div>
            </div>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
                    onClick={toggleMenu}
                />
            )}
        </>
    );
};

export default Sidebar;
