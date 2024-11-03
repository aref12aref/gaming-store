import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookie from "cookie-universal";
import { BASE_URL, cat_URL } from "../../AxiosAPIs";

export default function Categories() {
    const [categories, setCategories] = useState([]);

    const cookie = Cookie();
    const token = cookie.get("Bearer");
    const refreshToken = cookie.get("refresh");

    useEffect(() => {
        axios
            .get(`${BASE_URL}/${cat_URL}`)
            .then((data) => setCategories(data.data.data));
    }, []);

    async function handleDeleteCategory(category) {
        try {
            axios
                .delete(`${BASE_URL}/${cat_URL}/${category._id}`, {
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

                    const filteredCategories = categories.filter(
                        (c) => c._id !== category._id
                    );
                    setCategories(filteredCategories);
                });
        } catch (err) {
            console.log(err);
        }
    }

    //get all categories

    const categoriesShow = categories.map((item, index) => {
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>
                    <img
                        src={
                            item.avatar === "uploads/product.png"
                                ? `${BASE_URL}/${item.avatar}`
                                : `${BASE_URL}/uploads/categories/${item.avatar}`
                        }
                        alt=""
                        width={"80px"}
                    />
                </td>
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
                                cursor={"pointer"}
                                fontSize={"19px"}
                                icon={faPenToSquare}
                            />
                        </Link>

                        <FontAwesomeIcon
                            cursor={"pointer"}
                            fontSize={"19px"}
                            color="red"
                            icon={faTrash}
                            onClick={() => handleDeleteCategory(item)}
                        />
                    </div>
                </td>
            </tr>
        );
    });

    return (
        <div className="bg-w p-2 w-100">
            <div className="d-flex align-items-center justify-content-between">
                <h1>Categories Page</h1>
                <Link
                    className="btn btn-warning"
                    to={"/dashboard/category/add"}
                >
                    Add Category
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
                        <th>title</th>
                        <th>image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.length === 0 && (
                        <tr>
                            <td colSpan={12} className="text-center">
                                Loading...
                            </td>
                        </tr>
                    )}
                    {categoriesShow}
                </tbody>
            </Table>
        </div>
    );
}
