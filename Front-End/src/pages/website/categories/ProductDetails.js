import {
    faCartShopping,
    faDollarSign,
    faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Cookie from "cookie-universal";
import axios from "axios";

export default function ProductDetails(product) {
    product = product.data;
    const [productsAddNumber, setProductsAddNumber] = useState("");

    const cookie = Cookie();
    let currentUser = cookie.get("user") || null;
    const token = cookie.get("Bearer");
    const refreshToken = cookie.get("refresh");

    const [cart, setCart] = useState(
        currentUser ? currentUser.cart.products.length : 0
    );

    async function handleAddToCart() {
        let products = [];
        let productsPrice = 0;
        for (let i = 0; i < Number(productsAddNumber); i++) {
            products.push(product);
            productsPrice += productsAddNumber.price;
        }
        if (token) {
            try {
                await axios
                    .patch(
                        `https://localhost:4000/api/users/${currentUser._id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${currentUser.token}`,
                                refreshToken: refreshToken,
                            },
                        },
                        {
                            cart: {
                                price: productsPrice,
                                products: products,
                            },
                        }
                    )
                    .then((data) => {
                        const newToken = data.data.newAccessToken;
                        if (newToken !== null) {
                            cookie.set("Bearer", newToken);
                        }
                    });
                setCart((prev) => prev + 1);
            } catch (err) {
                console.log(err);
            }
        } else {
            window.alert("you are not registered");
        }
    }

    return (
        <div className="product-container">
            <div className="product-details-top">
                <h1 className="product-title">{product.title}</h1>
                <button
                    onClick={() => window.location.reload()}
                    className="back-button"
                >
                    Go Back
                </button>
            </div>
            <div className="product-details">
                <img
                    src={
                        product.avatar === "uploads/product.png"
                            ? `http://localhost:4000/api/${product.avatar}`
                            : `http://localhost:4000/api/uploads/products/${product.avatar}`
                    }
                    alt={product.title}
                    className="product-image"
                />
                <div>
                    <div className="product-details-text">
                        <h3>{product.price}$</h3>
                        <div className="product-details-det">
                            <ul>
                                <li>Availability: 12</li>
                                <li>Product code: {product._id}</li>
                                <li>
                                    <FontAwesomeIcon
                                        icon={faEye}
                                        style={{
                                            color: "rgba(246, 196, 45, 1)",
                                        }}
                                    />{" "}
                                    Product Views: 1215
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="product-details-inputs">
                        <input
                            type="number"
                            min={"1"}
                            max={"10"}
                            placeholder="how many?"
                            value={productsAddNumber}
                            onChange={(e) =>
                                setProductsAddNumber(e.target.value)
                            }
                        />
                        <button className="productDetails-add-button">
                            <FontAwesomeIcon
                                icon={faCartShopping}
                                onClick={handleAddToCart}
                            />{" "}
                            add to cart
                        </button>
                        <button className="productDetails-buy-button">
                            <FontAwesomeIcon icon={faDollarSign} /> buy now
                        </button>
                    </div>
                </div>
            </div>
            <div style={{ marginTop: "30px" }}>
                <h3>About</h3>
                <p>{product.description}</p>
            </div>
        </div>
    );
}
