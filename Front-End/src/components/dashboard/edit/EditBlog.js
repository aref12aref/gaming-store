import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import "./editStyle.css";
import axios from "axios";
import Cookie from "cookie-universal";
import { BASE_URL, blogs_URL } from "../../../AxiosAPIs";

export default function EditBlog() {
    const [newBlogData, setNewBlogData] = useState({});
    const cookie = Cookie();
    const { id } = useParams();

    const token = cookie.get("Bearer");
    const refreshToken = cookie.get("refresh");

    useEffect(() => {
        axios
            .get(`${BASE_URL}/${blogs_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    refreshToken: refreshToken,
                },
            })
            .then((data) => {
                setNewBlogData(data.data.data);
            })
            .catch((err) => console.log(err));
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        const data = new FormData();

        data.append("title", newBlogData.title);
        data.append("content", newBlogData.content);

        if (newBlogData.avatar != null) {
            data.append("avatar", newBlogData.avatar);
        }

        try {
            await axios.patch(`${BASE_URL}/${blogs_URL}/${id}`, data, {
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
            <h1>Edit Blog</h1>
            <Form className="createForm" onSubmit={(e) => handleSubmit(e)}>
                <div className="create-container">
                    <input
                        type="text"
                        placeholder="Enter Title..."
                        value={newBlogData.title}
                        onChange={(e) =>
                            setNewBlogData({
                                ...newBlogData,
                                title: e.target.value,
                            })
                        }
                        className="create-input"
                        required
                        minLength="0"
                    />
                    <label htmlFor="name" className="create-label">
                        title
                    </label>
                </div>

                <div className="create-container">
                    <textarea
                        placeholder="Enter Content..."
                        value={newBlogData.content}
                        onChange={(e) =>
                            setNewBlogData({
                                ...newBlogData,
                                content: e.target.value,
                            })
                        }
                        required
                        className="create-input"
                        style={{ height: "350px" }}
                    ></textarea>
                    <label className="create-label">Content</label>
                </div>

                <div className="create-container">
                    <input
                        type="file"
                        onChange={(e) =>
                            setNewBlogData({
                                ...newBlogData,
                                avatar: e.target.files[0],
                            })
                        }
                        placeholder="Enter Avatar..."
                        className="create-input"
                    />
                    <label htmlFor="password" className="create-label">
                        Avatar
                    </label>
                </div>
                <div>
                    <img
                        src={
                            newBlogData.avatar === "uploads/product.png"
                                ? `http://localhost:4000/api/${newBlogData.avatar}`
                                : `http://localhost:4000/api/uploads/blogs/${newBlogData.avatar}`
                        }
                        alt=""
                        width={"200px"}
                    />
                </div>

                <button type="submit" className="create-button">
                    Update
                </button>
            </Form>
        </div>
    );
}
