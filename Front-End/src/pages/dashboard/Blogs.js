import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookie from "cookie-universal";
import { BASE_URL, blogs_URL } from "../../AxiosAPIs";

export default function Blogs() {
    //products state
    const [blogs, setBlogs] = useState([]);

    const cookie = Cookie();
    const token = cookie.get("Bearer");
    const refreshToken = cookie.get("refresh");

    useEffect(() => {
        axios.get(`${BASE_URL}/${blogs_URL}`).then((data) => {
            setBlogs(data.data.data);
        });
    }, []);

    async function handleDeleteBlog(blog) {
        try {
            axios
                .delete(`${BASE_URL}/${blogs_URL}/${blog._id}`, {
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
                    const filteredBlogs = blogs.filter(
                        (b) => b._id !== blog._id
                    );
                    setBlogs(filteredBlogs);
                });
        } catch (err) {
            console.log(err);
        }
    }

    const blogsShow = blogs.map((item, index) => {
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.content}</td>
                <td>
                    <img
                        src={
                            item.avatar === "uploads/blog.png"
                                ? `${BASE_URL}/${item.avatar}`
                                : `${BASE_URL}/uploads/blogs/${item.avatar}`
                        }
                        alt=""
                        className="blogs-img"
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
                                className="products-icon"
                                icon={faPenToSquare}
                            />
                        </Link>

                        <FontAwesomeIcon
                            cursor={"pointer"}
                            className="products-img"
                            color="red"
                            icon={faTrash}
                            onClick={() => handleDeleteBlog(item)}
                        />
                    </div>
                </td>
            </tr>
        );
    });

    return (
        <div className="bg-w p-2 w-100">
            <div className="d-flex align-items-center justify-content-between">
                <h1>Blogs Page</h1>
                <Link
                    className="btn btn-warning products-add-button"
                    to={"add"}
                >
                    Add Blog
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
                        <th>Title</th>
                        <th>content</th>
                        <th>image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {blogsShow.length === 0 && (
                        <tr>
                            <td colSpan={12} className="text-center">
                                Loading...
                            </td>
                        </tr>
                    )}
                    {blogsShow}
                </tbody>
            </Table>
        </div>
    );
}
