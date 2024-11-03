import { useState } from "react";
import { Form } from "react-bootstrap";
import "./CreateStyle.css";
import axios from "axios";
import Cookie from "cookie-universal";
import { BASE_URL, users_URL } from "../../../AxiosAPIs";

export default function CreateUser() {
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
        role: "Select Role (default: USER)",
    });
    const cookie = Cookie();

    const token = cookie.get("Bearer");
    const refreshToken = cookie.get("refresh");

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await axios.post(`${BASE_URL}/${users_URL}`, userData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    refreshToken: refreshToken,
                },
            });
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <h1>Create New User</h1>
            <Form className="createForm" onSubmit={(e) => handleSubmit(e)}>
                <div className="create-container">
                    <input
                        type="text"
                        placeholder="Enter Name..."
                        value={userData.username}
                        onChange={(e) =>
                            setUserData({
                                ...userData,
                                username: e.target.value,
                            })
                        }
                        className="create-input"
                        required
                        minLength="0"
                    />
                    <label htmlFor="name" className="create-label">
                        name
                    </label>
                </div>

                <div className="create-container">
                    <input
                        type="email"
                        placeholder="Enter Email..."
                        value={userData.email}
                        onChange={(e) =>
                            setUserData({ ...userData, email: e.target.value })
                        }
                        className="create-input"
                        required
                    />
                    <label htmlFor="email" className="create-label">
                        Email
                    </label>
                </div>

                <div className="create-container">
                    <input
                        type="password"
                        placeholder="Enter Password..."
                        value={userData.password}
                        onChange={(e) =>
                            setUserData({
                                ...userData,
                                password: e.target.value,
                            })
                        }
                        className="create-input"
                        required
                        minLength="6"
                    />
                    <label htmlFor="password" className="create-label">
                        Password
                    </label>
                </div>

                <div className="create-container">
                    <select
                        onSelect={(e) =>
                            setUserData({
                                ...userData,
                                role: e.target.selected,
                            })
                        }
                        className="create-input"
                    >
                        <option disabled value={userData.role}>
                            Select Role (default: USER)
                        </option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="MANAGER">MANAGER</option>
                        <option value="USER">USER</option>
                    </select>
                    <label htmlFor="password" className="create-label">
                        Role
                    </label>
                </div>

                <button type="submit" className="create-button">
                    Create
                </button>
            </Form>
        </div>
    );
}
