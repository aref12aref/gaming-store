import axios from "axios";
import { Form } from "react-bootstrap";
import Cookie from "cookie-universal";
import "./CreateStyle.css";
import { useEffect, useState } from "react";
import { BASE_URL, cat_URL, pro_URL } from "../../../AxiosAPIs";

export default function CreateCategory() {
    const [categoryData, setCategoryData] = useState({
        title: "",
        description: "",
        products: [],
        avatar: null,
    });
    const [products, setProducts] = useState([]);

    const cookie = Cookie();

    const token = cookie.get("Bearer");
    const refreshToken = cookie.get("refresh");

    useEffect(() => {
        axios
            .get(`${BASE_URL}/${pro_URL}`)
            .then((data) => {
                setProducts(data.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const filteredProducts = products.filter((product) => {
        return product.category == null;
    });

    const showFilteredProducts = filteredProducts.map((product) => {
        return <option value={product._id}>{product.title}</option>;
    });

    async function handleSubmit(e) {
        e.preventDefault();

        const data = new FormData();

        data.append("title", categoryData.title);
        data.append("content", categoryData.description);

        if (categoryData.avatar != null) {
            data.append("avatar", categoryData.avatar);
        }

        if (categoryData.products.length > 0) {
            data.append("avatar", categoryData.products);
        }

        try {
            await axios.post(`${BASE_URL}/${cat_URL}`, data, {
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
            <h1>Create New Category</h1>
            <Form className="createForm" onSubmit={(e) => handleSubmit(e)}>
                <div className="create-container">
                    <input
                        type="text"
                        placeholder="Enter Title..."
                        value={categoryData.title}
                        onChange={(e) =>
                            setCategoryData({
                                ...categoryData,
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
                    <select
                        onSelect={(e) => {
                            let prod = categoryData.products;
                            prod.push(e.target.selected);
                            setCategoryData({
                                ...categoryData,
                                products: prod,
                            });
                        }}
                        className="create-input"
                    >
                        {showFilteredProducts}
                    </select>
                    <label htmlFor="password" className="create-label">
                        Products
                    </label>
                    {categoryData.products}
                </div>

                <div className="create-container">
                    <textarea
                        placeholder="Enter Content..."
                        value={categoryData.description}
                        onChange={(e) =>
                            setCategoryData({
                                ...categoryData,
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
                    <input
                        type="file"
                        onChange={(e) =>
                            setCategoryData({
                                ...categoryData,
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
