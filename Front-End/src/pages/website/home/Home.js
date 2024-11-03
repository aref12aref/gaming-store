import { Button, Card, Carousel } from "react-bootstrap";
import TopBar from "../../../components/TopBar";
import "./homeStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
    setupCarouselsData,
    offersCarouselsData,
    advantageItemsData,
} from "./HomeData";
import FootBar from "../../../components/FootBar";
import Blog from "./Blog";
import axios from "axios";
import stringCutter from "../../../helpers/stringCutter";
import SkeletonShow from "../../../components/SkeletonShow";
import { BASE_URL, blogs_URL } from "../../../AxiosAPIs";

export default function Home() {
    const [blogsData, setBlogsData] = useState([]);
    const [showBlog, setShowBlog] = useState(false);
    const [blogDetails, setBlogDetails] = useState({});
    const [r, setR] = useState(false);
    const [loading, setLoading] = useState(true);

    const links = useRef([]);
    const arr = useRef(null);

    useEffect(() => {
        axios
            .get(`${BASE_URL}/${blogs_URL}`)
            .then((response) => {
                setBlogsData(response.data.data);
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setLoading(false);
            });
    }, []);

    function handler() {
        if (links.current[0].style.display === "none") {
            links.current[0].style.display = "block";

            links.current[1].style.display = "block";

            links.current[2].style.display = "block";
        } else {
            links.current[0].style.display = "none";

            links.current[1].style.display = "none";

            links.current[2].style.display = "none";
        }
    }

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
            if (arr.current !== null) {
                arr.current.style.display = "block";
            }
        } else {
            if (arr.current !== null) {
                arr.current.style.display = "none";
            }
        }
    };

    //setup carousel
    const setupCarouselShow = setupCarouselsData.map((item, index) => {
        return (
            <Carousel.Item key={index}>
                <img
                    className="d-block w-100 first-carousel-img"
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    width={"100%"}
                    height={"500px"}
                />
            </Carousel.Item>
        );
    });

    //offers carousel
    const offersCarouselShow = offersCarouselsData.map((item, index) => {
        return (
            <Carousel.Item key={index} className="offer-carousel-item">
                <img
                    className="d-block w-100"
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    width={"100%"}
                    height={"400px"}
                />
                <Carousel.Caption>
                    <h5 style={{ color: "white" }}>{item.title}</h5>
                    <p style={{ color: "red" }}>{item.description}</p>
                </Carousel.Caption>
            </Carousel.Item>
        );
    });

    const blogsCarsShow = blogsData.map((item, index) => {
        return (
            <Card
                style={{ transition: "0.5s" }}
                className="blog-box"
                key={index}
            >
                <Card.Img
                    variant="top"
                    src={
                        item.avatar === "uploads/blog.png"
                            ? `http://localhost:4000/api/${item.avatar}`
                            : `http://localhost:4000/api/uploads/blogs/${item.avatar}`
                    }
                    className="blog-img"
                />
                <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{stringCutter(item.content, 60)}</Card.Text>
                    <Button
                        variant="warning"
                        onClick={() => {
                            setShowBlog(true);
                            setBlogDetails(item);
                        }}
                    >
                        Read More
                    </Button>
                </Card.Body>
            </Card>
        );
    });

    const advantageItemsShow = advantageItemsData.map((item, index) => {
        return (
            <div className="advantage-item" key={index}>
                <FontAwesomeIcon icon={item.ic} className="advantage-icon" />
                <div className="advantage-text">
                    <h6 className="advantage-title">{item.title}</h6>
                    <p className="advantage-p">{item.description}</p>
                </div>
            </div>
        );
    });

    return (
        <div>
            <TopBar />

            <main className="main-home">
                {showBlog ? (
                    <Blog data={blogDetails} />
                ) : (
                    <>
                        <section className="carousel-section">
                            <Carousel
                                data-bs-theme="dark"
                                className="first-carousel"
                            >
                                {setupCarouselShow}
                            </Carousel>
                            <div className="carousel-section-imgs">
                                <img
                                    src={require("../../../Assets/pc_builds.webp")}
                                    alt={"pc builds"}
                                    width={"350px"}
                                    className="carousel-section-img"
                                />
                                <img
                                    src={require("../../../Assets/computer_parts.webp")}
                                    alt={"computer parts"}
                                    width={"350px"}
                                    className="carousel-section-img"
                                />
                            </div>
                        </section>

                        <section className="advantages-section">
                            {advantageItemsShow}
                        </section>

                        <section className="popular-section">
                            <h2 style={{ fontSize: "40px" }}>Go Shopping</h2>
                            <div className="diveInto-container">
                                <Button
                                    variant="outline-warning"
                                    className="categories-button"
                                    onClick={handler}
                                >
                                    Categories
                                </Button>
                                <div className="popular-section-links">
                                    <Link
                                        to={"/externals"}
                                        ref={(e) => (links.current[0] = e)}
                                        className="Externals-link"
                                    >
                                        Externals
                                    </Link>
                                    <Link
                                        to={"/internals"}
                                        ref={(e) => (links.current[1] = e)}
                                        className="Internals-link"
                                    >
                                        Internals
                                    </Link>
                                    <Link
                                        to={"/desks"}
                                        ref={(e) => (links.current[2] = e)}
                                        className="Desks-link"
                                    >
                                        Desks
                                    </Link>
                                </div>
                            </div>
                        </section>

                        <section className="last-news">
                            <div style={{ textAlign: "center" }}>
                                <h2 style={{ fontSize: "40px" }}>Last News</h2>
                            </div>

                            <div className="lastnews-item">
                                <div className="lastnews-offers">
                                    <h4 className="lastnews-subtitle">
                                        Offers
                                    </h4>
                                    <div>
                                        <Carousel
                                            data-bs-theme="dark"
                                            className="offer-carousel-card"
                                        >
                                            {offersCarouselShow}
                                        </Carousel>
                                    </div>
                                </div>
                                <div className="lastnews-blogs">
                                    <h4 className="lastnews-subtitle">Blogs</h4>
                                    <div className="blogCards">
                                        {loading ? (
                                            <SkeletonShow
                                                length="3"
                                                height="300px"
                                                width="300px"
                                            />
                                        ) : (
                                            blogsCarsShow
                                        )}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                )}
            </main>
            <button ref={arr} onClick={arrowHandler} className="arr-button">
                ^
            </button>
            <FootBar />
        </div>
    );
}
