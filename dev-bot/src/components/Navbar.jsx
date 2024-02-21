import { Link } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";

function Navbar() {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar;