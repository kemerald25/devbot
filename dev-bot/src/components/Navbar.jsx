import { Link } from "react-router-dom";
import logo from '../assets/react.svg'

function Navbar() {
    return (
        <>
            <nav>
                <img className="logo" src={logo} />
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