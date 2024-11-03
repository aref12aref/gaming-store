import axios from "axios";
import Cookie from "cookie-universal";
import { useState } from "react";
import TopBar from "../../components/TopBar";

export default function Cart() {
    const cookie = Cookie();
    const currentUser = cookie.get("user");
    const token = cookie.get("Bearer");
    const refreshToken = cookie.get("refresh");
    const cart = currentUser.cart ? currentUser.cart : null;
    const [cartProducts, setCartProducts] = useState(cart != null ? cart : []);

    async function handleDeleteProduct(product) {
        let newCart = cart;
        newCart = newCart.products.filter((p) => {
            return p._id !== product._id;
        });

        let res = await axios.patch(
            `http://localhost:4000/api/users/${currentUser._id}`,
            newCart,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    refreshToken: refreshToken,
                },
            }
        );

        cookie.set("Bearer", res.data.data.token);
        cookie.set("refresh", res.data.data.refreshToken);
    }

    const showCartProducts =
        cart != null
            ? cart.products.length > 0
                ? cart.products.map((product) => {
                      return (
                          <div>
                              <div>
                                  <img
                                      src={
                                          product.avatar ===
                                          "uploads/product.png"
                                              ? `http://localhost:4000/api/${product.avatar}`
                                              : `http://localhost:4000/api/uploads/products/${product.avatar}`
                                      }
                                      alt=""
                                  />
                                  <h3>{product.title}</h3>
                                  <p>{product.description}</p>
                                  <p>{product.price}</p>
                              </div>
                              <button
                                  onClick={() => handleDeleteProduct(product)}
                              >
                                  Delete
                              </button>
                          </div>
                      );
                  })
                : ""
            : "";

    return (
        <div>
            <TopBar />
            <main>
                {showCartProducts ? (
                    showCartProducts
                ) : (
                    <h1>no products in the cart yet</h1>
                )}
            </main>
        </div>
    );
}
