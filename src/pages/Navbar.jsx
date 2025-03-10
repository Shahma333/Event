import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../Redux/authSlice";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import logo from "../assets/logo.png";

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const token = localStorage.getItem("access_token"); // ✅ Check if token exists

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("access_token"); // ✅ Remove token on logout
        localStorage.removeItem("user"); // ✅ Remove user details
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <img src={logo} alt="Logo" className="navbar-logo" />
                <h1 className="navbar-title">Smart Event Organizer</h1>
            </div>
            
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>

            <div className="navbar-right">
                {user && token ? ( // ✅ Ensure both user exists & token is valid
                    <button onClick={handleLogout} className="navbar-button">Logout</button>
                ) : (
                    <button onClick={() => navigate("/login")} className="navbar-button">Login</button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
