import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import "./editStyle.css";
import axios from "axios";
import Cookie from "cookie-universal";
import { BASE_URL, users_URL } from "../../../AxiosAPIs";

export default function EditUser() {
    const [newUserData, setNewUserData] = useState({});
    const cookie = Cookie();
    const { id } = useParams();

    const currentUser = cookie.get("user");
    const token = cookie.get("Bearer");
    const refreshToken = cookie.get("refresh");

    useEffect(() => {
        axios
            .get(`${BASE_URL}/${users_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    refreshToken: refreshToken,
                },
            })
            .then((data) => {
                setNewUserData(data.data.data);
            })
            .catch((err) => console.log(err));
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await axios.patch(`${BASE_URL}/${users_URL}/${id}`, newUserData, {
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
            <h1>Edit User</h1>
            <Form className="createForm" onSubmit={(e) => handleSubmit(e)}>
                <div className="create-container">
                    <input
                        type="text"
                        placeholder="Enter Name..."
                        value={newUserData.username}
                        onChange={(e) =>
                            setNewUserData({
                                ...newUserData,
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

                {currentUser._id === id && (
                    <>
                        <div className="create-container">
                            <input
                                type="email"
                                placeholder="Enter Email..."
                                value={newUserData.email}
                                onChange={(e) =>
                                    setNewUserData({
                                        ...newUserData,
                                        email: e.target.value,
                                    })
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
                                onChange={(e) =>
                                    setNewUserData({
                                        ...newUserData,
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
                    </>
                )}

                <div className="create-container">
                    <select
                        onSelect={(e) =>
                            setNewUserData({
                                ...newUserData,
                                role: e.target.selected,
                            })
                        }
                        className="create-input"
                    >
                        <option disabled value={newUserData.role}>
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
                    Update
                </button>
            </Form>
        </div>
    );
}
