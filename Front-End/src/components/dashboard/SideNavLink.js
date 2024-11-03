import {
    faLayerGroup,
    faNewspaper,
    faTruck,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";

export const links = [
    {
        linkTo: "users",
        fIcon: faUsers,
        text: "Users",
    },
    {
        linkTo: "/dashboard/categories",
        fIcon: faLayerGroup,
        text: "Categories",
    },
    {
        linkTo: "/dashboard/products",
        fIcon: faTruck,
        text: "Products",
    },
    {
        linkTo: "/dashboard/blogs",
        fIcon: faNewspaper,
        text: "Blogs",
    },
];
