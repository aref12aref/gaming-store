import axios from "axios";
import { Form } from "react-bootstrap";
import Cookie from "cookie-universal";
import "./CreateStyle.css";
import { useState } from "react";
import { BASE_URL, blogs_URL } from "../../../AxiosAPIs";

export default function CreateBlog() {
    const [blogData, setBlogData] = useState({
        title: "",
        content: "",
        avatar: null,
    });
    const cookie = Cookie();

    const token = cookie.get("Bearer");
    const refreshToken = cookie.get("refresh");

    async function handleSubmit(e) {
        e.preventDefault();

        const data = new FormData();

        data.append("title", blogData.title);
        data.append("content", blogData.content);

        if (blogData.avatar != null) {
            data.append("avatar", blogData.avatar);
        }

        try {
            await axios.post(`${BASE_URL}/${blogs_URL}`, data, {
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
            <h1>Create New Blog</h1>
            <Form className="createForm" onSubmit={(e) => handleSubmit(e)}>
                <div className="create-container">
                    <input
                        type="text"
                        placeholder="Enter Title..."
                        value={blogData.title}
                        onChange={(e) =>
                            setBlogData({
                                ...blogData,
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
                        value={blogData.content}
                        onChange={(e) =>
                            setBlogData({
                                ...blogData,
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
                            setBlogData({
                                ...blogData,
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

                <button type="submit" className="create-button">
                    Create
                </button>
            </Form>
        </div>
    );
}
