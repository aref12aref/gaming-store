import axios from "axios";
import Cookie from "cookie-universal";
import TopBar from "../../components/TopBar";
import { useEffect, useState } from "react";
import { BASE_URL, users_URL } from "../../AxiosAPIs";
import "./cartStyle.css";
import { loadStripe } from "@stripe/stripe-js";

export default function Cart() {
    const [user, setUser] = useState({});
    const [cart, setCart] = useState({});
    const cookie = Cookie();
    const currentUser = cookie.get("user");
    const token = cookie.get("Bearer");
    const refreshToken = cookie.get("refresh");

    useEffect(() => {
        axios
            .get(`${BASE_URL}/${users_URL}/${currentUser._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    refreshToken: refreshToken,
                },
            })
            .then((response) => {
                setUser(response.data.data.user);
                setCart(response.data.data.cart);
            });
    }, []);

    async function handleDeleteProduct(product) {
        const data = {
            productID: product._id,
            price: product.price,
        };
        await axios
            .patch(`${BASE_URL}/users/cart/${cart._id}`, data, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    refreshToken: user.refreshToken,
                },
            })
            .then((response) => {
                currentUser.cart = response.data.data;
                cookie.set("user", currentUser);
                setCart(response.data.data);
            })
            .catch((err) => console.log(err));
    }

    async function makePayment() {
        const stripe = await new loadStripe(
            "pk_test_51QJxMOG3ZDdZKSpjxD1GYF9LbJrDNEeeqU7yfm34Tgv5jOEatz4pU3novcCyisphjzdSNhqLUVteBrz4p2IzqNoi00T5ndR1Ig"
        );

        const body = {
            products: cart.products,
        };

        try {
            await axios
                .post(`${BASE_URL}/${users_URL}/create-payment-intent`, body, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                        refreshToken: user.refreshToken,
                    },
                })
                .then((response) => {
                    const result = stripe.redirectToCheckout({
                        sessionId: response.data.data.id,
                    });

                    if (result.error) {
                        console.log(result.error);
                    }
                });
        } catch (err) {
            console.log(err);
        }
    }

    const showCartProducts =
        cart.products != null
            ? cart.products.map((product, index) => {
                  return (
                      <div key={index} className="cart-product-card">
                          <div className="cart-img-cont">
                              <img
                                  src={
                                      product.avatar === "uploads/product.png"
                                          ? `http://localhost:4000/api/${product.avatar}`
                                          : `http://localhost:4000/api/uploads/products/${product.avatar}`
                                  }
                                  alt=""
                              />
                          </div>
                          <div className="cart-det-cont">
                              <h5>{product.title}</h5>
                              <p>{product.description}</p>
                              <p>{product.price}</p>
                          </div>
                          <div>
                              <button
                                  className="btn btn-danger"
                                  onClick={() => handleDeleteProduct(product)}
                              >
                                  Cancel
                              </button>
                          </div>
                      </div>
                  );
              })
            : [];

    return (
        <div>
            <TopBar />
            <main>
                {showCartProducts.length > 0 ? (
                    <div className="cart-products-container">
                        <div className="cart-products">
                            <h1>your order products:</h1>
                            {showCartProducts}
                        </div>
                        <div className="cart-pay">
                            <div className="cart-pay-cont">
                                <h5>order:</h5>
                                <div>
                                    <p>products:</p>
                                    <p>{cart.products.length}</p>
                                </div>
                                <div>
                                    <p>tax:</p>
                                    <p>0</p>
                                </div>
                                <div>
                                    <p>total price:</p>
                                    <p>{cart.price}$</p>
                                </div>

                                <button
                                    onClick={makePayment}
                                    className="btn btn-success"
                                >
                                    Pay {cart.price}$
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <h1>no products in the cart yet</h1>
                )}
            </main>
        </div>
    );
}
