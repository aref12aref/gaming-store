import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookie from "cookie-universal";
import { BASE_URL, pro_URL } from "../../AxiosAPIs";

export default function Products() {
    //products state
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

    async function handleDeleteProduct(product) {
        try {
            axios
                .delete(`${BASE_URL}/${pro_URL}/${product._id}`, {
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

                    const filteredProducts = products.filter(
                        (p) => p._id !== product._id
                    );
                    setProducts(filteredProducts);
                });
        } catch (err) {
            console.log(err);
        }
    }

    const productsShow = products.map((item, index) => {
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td>
                    <img
                        src={
                            item.avatar === "uploads/product.png"
                                ? `${BASE_URL}/${item.avatar}`
                                : `${BASE_URL}/uploads/products/${item.avatar}`
                        }
                        alt=""
                        className="products-img"
                    />
                </td>
                <td>{item.category.title}</td>
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
                            className="products-icon"
                            color="red"
                            icon={faTrash}
                            onClick={() => handleDeleteProduct(item)}
                        />
                    </div>
                </td>
            </tr>
        );
    });

    return (
        <div className="bg-w p-2 w-100">
            <div className="d-flex align-items-center justify-content-between">
                <h1>Products Page</h1>
                <Link
                    className="btn btn-warning products-add-button"
                    to={"add"}
                >
                    Add Product
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
                        <th>Description</th>
                        <th>Price</th>
                        <th>image</th>
                        <th>category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length === 0 && (
                        <tr>
                            <td colSpan={12} className="text-center">
                                Loading...
                            </td>
                        </tr>
                    )}
                    {productsShow}
                </tbody>
            </Table>
        </div>
    );
}
