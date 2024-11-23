import TopBar from "../../../components/TopBar";
import "./productsStyle.css";
import { Button, Card } from "react-bootstrap";
import ProductDetails from "./ProductDetails.js";
import { useEffect, useRef, useState } from "react";
import Cookie from "cookie-universal";
import FootBar from "../../../components/FootBar.js";
import axios from "axios";
import SkeletonShow from "../../../components/SkeletonShow";
import { BASE_URL, cat_URL, users_URL } from "../../../AxiosAPIs";

export default function DesksSetups() {
    const [desks, setDesks] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const [details, setDetails] = useState({
        title: "",
        description: "",
        price: "",
        image: "",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            axios
                .get(`${BASE_URL}/${cat_URL}/title/desks`)
                .then((data) => {
                    setDesks(data.data.data[0].products);
                })
                .finally(() => {
                    setLoading(false);
                });
        } catch (err) {
            console.log(err);
        }
    }, []);

    const cookie = Cookie();
    let currentUser = cookie.get("user") || null;
    const token = cookie.get("Bearer");
    const refreshToken = cookie.get("refresh");

    const [cart, setCart] = useState(
        currentUser
            ? currentUser.cart
                ? currentUser.cart.products != null
                    ? currentUser.cart.products.length
                    : 0
                : 0
            : 0
    );

    async function handleAddCart(product) {
        if (token) {
            try {
                await axios
                    .patch(
                        `${BASE_URL}/${users_URL}/${currentUser._id}`,
                        {
                            cart: {
                                price: product.price,
                                products: product._id,
                            },
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                refreshToken: refreshToken,
                            },
                        }
                    )
                    .then((data) => {
                        let newUser = currentUser;
                        newUser.cart.products.push(product._id);
                        cookie.set("user", newUser);
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

    const arr = useRef("");
    const [r, setR] = useState(false);

    function arrowHandler() {
        arr.current.style.display = "none";
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }

    window.onscroll = function () {
        let y = window.scrollY;
        if (y > 100) {
            setR((prev) => !prev);
            arr.current.style.display = "block";
        } else {
            arr.current.style.display = "none";
        }
    };

    const desksShow = desks.map((item, index) => {
        return (
            <Card className="card-item" key={index}>
                <Card.Img
                    variant="top"
                    style={{ width: "100%", height: "100%" }}
                    src={
                        item.avatar === "uploads/product.png"
                            ? `${BASE_URL}/${item.avatar}`
                            : `${BASE_URL}/uploads/products/${item.avatar}`
                    }
                    onClick={() => {
                        setShowDetails(true);
                        setDetails({
                            ...details,
                            title: item.title,
                            description: item.description,
                            price: item.price,
                            image: item.imgSrc,
                        });
                    }}
                />
                <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                    <Card.Text>{item.price}$</Card.Text>
                    <Button
                        variant="warning"
                        onClick={() => handleAddCart(item)}
                    >
                        add to cart
                    </Button>
                </Card.Body>
            </Card>
        );
    });

    return (
        <div>
            <TopBar />

            <main className="main-products">
                {showDetails ? (
                    <ProductDetails data={details} />
                ) : (
                    <div>
                        <div>
                            <h1 className="main-title">DESKS & SETUPS</h1>
                        </div>
                        <section style={{ marginTop: "30px" }}>
                            <div>
                                <h3 className="products-title">Desks</h3>
                                <div className="products">
                                    {loading ? (
                                        <SkeletonShow
                                            length="8"
                                            height="300px"
                                            width="18rem"
                                        />
                                    ) : (
                                        desksShow
                                    )}
                                </div>
                            </div>
                        </section>
                    </div>
                )}
            </main>
            <button ref={arr} onClick={arrowHandler} className="arrow-button">
                ^
            </button>
            <FootBar />
        </div>
    );
}
