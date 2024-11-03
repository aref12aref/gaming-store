import axios from "axios";
import { Form } from "react-bootstrap";
import Cookie from "cookie-universal";
import "./CreateStyle.css";
import { useEffect, useState } from "react";
import { BASE_URL, cat_URL, pro_URL } from "../../../AxiosAPIs";

export default function CreateProduct() {
    const [productData, setProductData] = useState({
        title: "",
        price: 0,
        description: "",
        category: "",
        avatar: null,
    });
    const [categories, setCategories] = useState([]);

    const cookie = Cookie();

    const token = cookie.get("Bearer");
    const refreshToken = cookie.get("refresh");

    useEffect(() => {
        axios
            .get(`${BASE_URL}/${cat_URL}`)
            .then((data) => {
                setCategories(data.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const showCategories = categories.map((category) => {
        return <option value={category._id}>{category.title}</option>;
    });

    async function handleSubmit(e) {
        e.preventDefault();

        const data = new FormData();

        data.append("title", productData.title);
        data.append("price", productData.price);
        data.append("content", productData.description);

        if (productData.avatar != null) {
            data.append("avatar", productData.avatar);
        }

        if (productData.category !== "") {
            data.append("avatar", productData.categories);
        }

        try {
            await axios.post(`${BASE_URL}/${pro_URL}`, data, {
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
            <h1>Create New Product</h1>
            <Form className="createForm" onSubmit={(e) => handleSubmit(e)}>
                <div className="create-container">
                    <input
                        type="text"
                        placeholder="Enter Title..."
                        value={productData.title}
                        onChange={(e) =>
                            setProductData({
                                ...productData,
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
                    <input
                        type="number"
                        placeholder="Enter Price..."
                        value={productData.price}
                        onChange={(e) =>
                            setProductData({
                                ...productData,
                                price: e.target.value,
                            })
                        }
                        className="create-input"
                        required
                        minLength="0"
                    />
                    <label htmlFor="name" className="create-label">
                        Price
                    </label>
                </div>

                <div className="create-container">
                    <textarea
                        placeholder="Enter Content..."
                        value={productData.description}
                        onChange={(e) =>
                            setProductData({
                                ...productData,
                                description: e.target.value,
                            })
                        }
                        required
                        className="create-input"
                        style={{ height: "350px" }}
                    ></textarea>
                    <label className="create-label">description</label>
                </div>

                <div className="create-container">
                    <select
                        onSelect={(e) => {
                            setProductData({
                                ...productData,
                                category: e.target.selected,
                            });
                        }}
                        className="create-input"
                    >
                        {showCategories}
                    </select>
                    <label htmlFor="password" className="create-label">
                        Category
                    </label>
                </div>

                <div className="create-container">
                    <input
                        type="file"
                        onChange={(e) =>
                            setProductData({
                                ...productData,
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
