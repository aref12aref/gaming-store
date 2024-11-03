import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import "./editStyle.css";
import axios from "axios";
import Cookie from "cookie-universal";
import { BASE_URL, blogs_URL, cat_URL, pro_URL } from "../../../AxiosAPIs";

export default function EditCategory() {
    const [categoryData, setCategoryData] = useState({});
    const [products, setProducts] = useState([]);

    const cookie = Cookie();
    const { id } = useParams();

    const token = cookie.get("Bearer");
    const refreshToken = cookie.get("refresh");

    useEffect(() => {
        axios
            .get(`${BASE_URL}/${cat_URL}/${id}`)
            .then((data) => {
                console.log(data);
                setCategoryData(data.data.data);
            })
            .catch((error) => {
                console.log(error);
            });

        axios
            .get(`${BASE_URL}/${pro_URL}`)
            .then((data) => {
                console.log(data);
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

    let showCategoryProducts = "";
    if (categoryData.products) {
        showCategoryProducts = categoryData.products.map((product, index) => {
            return (
                <p>
                    product {index} : {product.title}
                </p>
            );
        });
    }

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
            await axios.patch(
                `${BASE_URL}/${cat_URL}/${categoryData._id}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        refreshToken: refreshToken,
                    },
                }
            );
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <h1>Edit Category</h1>
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
                    <label className="create-label">title</label>
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
                    <label className="create-label">Products</label>
                    <h7>products:</h7>
                    {categoryData.products && showCategoryProducts}
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
                    <label className="create-label">Avatar</label>
                </div>
                <div>
                    <img
                        src={
                            categoryData.avatar === "uploads/product.png"
                                ? `http://localhost:4000/api/${categoryData.avatar}`
                                : `http://localhost:4000/api/uploads/categories/${categoryData.avatar}`
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
