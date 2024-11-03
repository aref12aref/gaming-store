import { Link } from "react-router-dom";
import TopBar from "../../../components/TopBar";
import "./productsStyle.css";
import FootBar from "../../../components/FootBar";
import { useEffect, useState } from "react";
import axios from "axios";
import SkeletonShow from "../../../components/SkeletonShow";
import { BASE_URL, cat_URL } from "../../../AxiosAPIs";

export default function AllCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`${BASE_URL}/${cat_URL}`)
            .then((data) => setCategories(data.data.data))
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    //get all categories

    const categoriesShow = categories.map((item, index) => {
        return (
            <section key={index} className="all-categories-section">
                <div className="all-categories-item1"></div>
                <div>
                    <h3>{item.title}</h3>
                    <Link to={`/${item.title}`} className="btn btn-warning">
                        Take a look
                    </Link>
                </div>
            </section>
        );
    });

    return (
        <div>
            <TopBar />

            <main className="main-products">
                <div>
                    <h1 className="main-title">ALL Categories</h1>
                </div>

                {loading ? (
                    <SkeletonShow length="3" height="200px" width="70%" />
                ) : (
                    categoriesShow
                )}

                <br />

                <FootBar />
            </main>
        </div>
    );
}
