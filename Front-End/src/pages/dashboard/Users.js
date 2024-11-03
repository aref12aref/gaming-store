import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookie from "cookie-universal";
import { BASE_URL, users_URL } from "../../AxiosAPIs";

export default function Users() {
    const [users, setUsers] = useState([]);
    const cookie = Cookie();
    const currentUser = cookie.get("user");
    const token = cookie.get("Bearer");
    const refreshToken = cookie.get("refresh");
    useEffect(() => {
        axios
            .get(
                `${BASE_URL}/${users_URL}`,

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        refreshToken: refreshToken,
                    },
                }
            )
            .then((data) => {
                const newToken = data.data.newAccessToken;
                if (newToken !== null) {
                    cookie.set("Bearer", newToken);
                }
                setUsers(data.data.data);
            });
    }, []);

    async function handleDeleteUser(user) {
        try {
            axios
                .delete(`${BASE_URL}/${users_URL}/${user._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        refreshToken: refreshToken,
                    },
                })
                .then((data) => {
                    const newToken = data.data.newAccessToken;
                    if (newToken !== null) {
                        cookie.set("Bearer", newToken);
                    }
                    const filteredUsers = users.filter(
                        (u) => u._id !== user._id
                    );
                    setUsers(filteredUsers);
                });
        } catch (err) {
            console.log(err);
        }
    }

    const usersShow = users.map((item, index) => {
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>
                    {item.email === currentUser.email
                        ? item.username + " (YOU)"
                        : item.username}
                </td>
                <td>{item.email}</td>
                <td>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Link to={`edit/${item._id}`}>
                            <FontAwesomeIcon
                                fontSize={"19px"}
                                icon={faPenToSquare}
                            />
                        </Link>

                        <FontAwesomeIcon
                            cursor={"pointer"}
                            fontSize={"19px"}
                            color="red"
                            icon={faTrash}
                            onClick={() => handleDeleteUser(item)}
                        />
                    </div>
                </td>
            </tr>
        );
    });

    return (
        <div className="bg-w p-2 w-100">
            <div className="d-flex align-items-center justify-content-between">
                <h1>Users Page</h1>
                <Link className="btn btn-warning" to={"/dashboard/user/add"}>
                    Add User
                </Link>
            </div>

            <Table
                striped
                bordered
                hover
                style={{ textAlign: "center", verticalAlign: "middle" }}
            >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length === 0 && (
                        <tr>
                            <td colSpan={12} className="text-center">
                                Loading...
                            </td>
                        </tr>
                    )}
                    {usersShow}
                </tbody>
            </Table>
        </div>
    );
}
