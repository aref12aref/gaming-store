import { Link, useNavigate } from "react-router-dom";
import TopBar from "../../components/TopBar";
import "./accountStyle.css";
import Dropdown from "react-bootstrap/Dropdown";
import Cookie from "cookie-universal";
import { useState } from "react";
import axios from "axios";
import { BASE_URL, users_URL } from "../../AxiosAPIs";
export default function Account() {
    const cookie = Cookie();
    const currentUser = cookie.get("user");
    const token = cookie.get("Bearer");
    const [showAvatarChange, setShowAvatarChange] = useState(false);
    const [showDetailsChange, setShowDetailsChange] = useState(false);

    function changeAvatarHandler() {
        setShowAvatarChange((s) => !s);
    }

    function changeDetailsHandler() {
        setShowDetailsChange((s) => !s);
    }

    const nav = useNavigate();
    async function getUserData() {
        const res = await axios.get(
            `${BASE_URL}/${users_URL}/${currentUser._id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const user = res.data.data;
        cookie.set("Bearer", user.token);
        cookie.set("user", user);
        nav("/account");
    }

    async function sendNewAvatarHandler(e) {
        e.preventDefault();
        const newAvatar = e.target[0].files[0];
        const imageData = new FormData();
        imageData.append("avatar", newAvatar);
        try {
            await axios.patch(
                `${BASE_URL}/${users_URL}/${currentUser._id}`,
                imageData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            getUserData();
        } catch (err) {
            console.log(err);
        }
    }

    async function sendNewDetailsHandler(e) {
        e.preventDefault();
        const data = {};
        if (e.target[0].value) {
            data.username = e.target[0].value;
        }
        if (e.target[1].value) {
            data.email = e.target[1].value;
        }
        if (e.target[2].value) {
            data.password = e.target[2].value;
        }

        try {
            await axios.patch(
                `${BASE_URL}/${users_URL}/${currentUser._id}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            getUserData();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <TopBar />
            <main className="main-account-page">
                <header className="top-account">
                    <h1>Personal Account</h1>
                    <Link to={"/home"} className="back-link">
                        Home
                    </Link>
                </header>
                <div className="main-account">
                    <div className="main-left">
                        <div className="left">
                            <Dropdown>
                                <Dropdown.Toggle
                                    variant="warning"
                                    id="dropdown-basic"
                                    className="drop"
                                >
                                    Dropdown Button
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item>
                                        Account Activity
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        Download Your Data
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <p>Security</p>
                            <p>Profile and Privacy</p>
                            <p>Account Management</p>
                        </div>

                        <div className="middle">
                            <div className="mid">
                                <h5>Name:</h5>
                                <p>{currentUser.username}</p>
                            </div>
                            <div className="mid">
                                <h5>Email:</h5>
                                <p>{currentUser.email}</p>
                            </div>
                            <div>
                                {!showDetailsChange ? (
                                    <button
                                        style={{
                                            cursor: "pointer",
                                            color: "blue",
                                            backgroundColor: "transparent",
                                            border: "none",
                                        }}
                                        onClick={changeDetailsHandler}
                                    >
                                        Edit
                                    </button>
                                ) : (
                                    <button
                                        style={{
                                            cursor: "pointer",
                                            color: "blue",
                                            backgroundColor: "transparent",
                                            border: "none",
                                        }}
                                        onClick={changeDetailsHandler}
                                    >
                                        Stay The Same
                                    </button>
                                )}
                            </div>
                            {showAvatarChange && (
                                <form onSubmit={(e) => sendNewAvatarHandler(e)}>
                                    <hr />
                                    <input type="file" />
                                    <br />
                                    <br />
                                    <button>Change Profile Photo</button>
                                </form>
                            )}
                            {showDetailsChange && (
                                <form
                                    onSubmit={(e) => sendNewDetailsHandler(e)}
                                >
                                    <input type="text" placeholder="name" />
                                    <br />
                                    <br />
                                    <input type="email" placeholder="email" />
                                    <br />
                                    <br />
                                    <input
                                        type="password"
                                        placeholder="password"
                                    />
                                    <br />
                                    <br />
                                    <button>Change Your Details</button>
                                </form>
                            )}
                        </div>
                    </div>

                    <div className="right">
                        <div className="right-in">
                            <div style={{ textAlign: "center" }}>
                                <img
                                    src={
                                        currentUser.avatar ===
                                        "uploads/profile.png"
                                            ? `${BASE_URL}/${currentUser.avatar}`
                                            : `${BASE_URL}/uploads/users/${currentUser.avatar}`
                                    }
                                    alt=""
                                    style={{
                                        border: "1px solid black",
                                        width: "100%",
                                        height: "100%",
                                    }}
                                />
                            </div>
                            <button
                                style={{
                                    cursor: "pointer",
                                    color: "blue",
                                    backgroundColor: "transparent",
                                    border: "none",
                                }}
                                onClick={changeAvatarHandler}
                            >
                                Edit your profile photo
                            </button>
                        </div>
                        <div className="right-in">
                            <h5>Account Activity</h5>
                            <b>Last sign-in</b>
                            <p>today</p>
                            <br />
                            <b>Password</b>
                            <p>didnt change</p>
                        </div>
                        <div className="right-in">
                            <p>check your account activity for more details</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
