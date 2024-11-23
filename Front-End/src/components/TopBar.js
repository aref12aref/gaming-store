import { Link } from "react-router-dom";
import "./barsStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAddressCard,
    faCartShopping,
    faHouse,
    faPhone,
    faRightFromBracket,
    faTableCellsLarge,
    faTableColumns,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import Cookie from "cookie-universal";
import Dropdown from "react-bootstrap/Dropdown";

export default function TopBar() {
    //cookie
    const cookie = Cookie();
    const currentUser = cookie.get("user");

    function handleLogout() {
        cookie.remove("Bearer");
        cookie.remove("user");
        window.location.pathname = "/";
    }

    return (
        <nav className="topBar">
            <div className="left-topBar">
                <img
                    src={require("../Assets/gameStoreLogo.avif")}
                    alt="logo"
                    className="left-topbar-img"
                />
                <div className="nav-list-item">
                    <Link to={"/home"} className="nav-list-link">
                        <FontAwesomeIcon icon={faHouse} />
                    </Link>
                    <Link to={"/home"} className="nav-list-link">
                        Home
                    </Link>
                </div>
            </div>
            <div className="right-topBar">
                <ul className="nav-list">
                    <li className="nav-list-item">
                        <Link to={"/categories"} className="nav-list-link">
                            <FontAwesomeIcon icon={faTableCellsLarge} />
                        </Link>

                        <Link to={"/categories"} className="nav-list-link">
                            Categories
                        </Link>
                    </li>

                    {currentUser ? (
                        currentUser.role === "ADMIN" ||
                        currentUser.role === "MANAGER" ? (
                            <>
                                <li className="nav-list-item">
                                    <Link
                                        to={"/dashboard"}
                                        className="nav-list-link"
                                    >
                                        <FontAwesomeIcon
                                            icon={faTableColumns}
                                        />
                                    </Link>

                                    <Link
                                        to={"/dashboard"}
                                        className="nav-list-link"
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                                <li
                                    className="nav-list-item-logout"
                                    onClick={handleLogout}
                                >
                                    <Link to={"/"} className="nav-list-link">
                                        <FontAwesomeIcon
                                            icon={faRightFromBracket}
                                        />
                                    </Link>
                                    <Link to={"/"} className="nav-list-link">
                                        Logout
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-list-item">
                                    <Link
                                        to={"/contactus"}
                                        className="nav-list-link"
                                    >
                                        <FontAwesomeIcon icon={faPhone} />
                                    </Link>

                                    <Link
                                        to={"/contactus"}
                                        className="nav-list-link"
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                                <li className="nav-list-item">
                                    <Link
                                        to={"/cart"}
                                        className="nav-list-link"
                                    >
                                        <FontAwesomeIcon
                                            icon={faCartShopping}
                                        />
                                    </Link>

                                    <Link
                                        to={"/cart"}
                                        className="nav-list-link cartStyle"
                                        num={
                                            currentUser.cart != null &&
                                            currentUser.cart.products != null
                                                ? currentUser.cart.products
                                                      .length
                                                : 0
                                        }
                                    >
                                        Cart
                                    </Link>
                                </li>

                                <li className="nav-list-item">
                                    <FontAwesomeIcon icon={faUser} />

                                    <Dropdown>
                                        <Dropdown.Toggle
                                            variant="success"
                                            id="dropdown-basic"
                                            className="nav-list-link"
                                            style={{
                                                background: "transparent",
                                                color: "black",
                                                border: "none",
                                            }}
                                        >
                                            {currentUser.username}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item>
                                                <Link
                                                    to={"/account"}
                                                    style={{
                                                        textDecoration: "none",
                                                        color: "black",
                                                    }}
                                                >
                                                    My Account
                                                </Link>
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                onClick={handleLogout}
                                                style={{
                                                    backgroundColor: "red",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faRightFromBracket}
                                                />
                                                Logout
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </li>
                            </>
                        )
                    ) : (
                        <>
                            <li className="nav-list-item">
                                <Link
                                    to={"/register"}
                                    className="nav-list-link"
                                >
                                    <FontAwesomeIcon icon={faAddressCard} />
                                </Link>

                                <Link
                                    to={"/register"}
                                    className="nav-list-link"
                                >
                                    Register
                                </Link>
                            </li>

                            <li className="nav-list-item">
                                <Link to={"/login"} className="nav-list-link">
                                    <FontAwesomeIcon icon={faAddressCard} />
                                </Link>

                                <Link to={"/login"} className="nav-list-link">
                                    Login
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}
