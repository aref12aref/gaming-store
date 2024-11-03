import {
    faAward,
    faDollarSign,
    faPlane,
    faTruckFast,
} from "@fortawesome/free-solid-svg-icons";

export const setupCarouselsData = [
    {
        imageSrc: require("../../../Assets/gamersSetup1.jpeg"),
        imageAlt: "Setup1",
    },
    {
        imageSrc: require("../../../Assets/gamersSetup2.jpeg"),
        imageAlt: "Setup2",
    },
    {
        imageSrc: require("../../../Assets/gamersSetup3.jpeg"),
        imageAlt: "Setup3",
    },
];

export const offersCarouselsData = [
    {
        imageSrc: require("../../../Assets/logitech_GPRO_mouse.webp"),
        imageAlt: "mouse",
        title: "Logitech G PRO mouse",
        description: "50% discount!",
    },
    {
        imageSrc: require("../../../Assets/logitech_keyboard.webp"),
        imageAlt: "keyboard",
        title: "Logitech Apex PRO keyboard",
        description: "20% discount!",
    },
    {
        imageSrc: require("../../../Assets/logitech fullkit.jpeg"),
        imageAlt: "fullkit",
        title: "Logitech fullkit",
        description: "Buy keyboard and mouse and get headset for free!",
    },
];

export const advantageItemsData = [
    {
        ic: faPlane,
        title: "Various shipping options",
        description: "Choose what suits you from a group of shipping companies",
    },
    {
        ic: faAward,
        title: "Guarantee for all products",
        description: "One year warranty on all products",
    },
    {
        ic: faTruckFast,
        title: "Express delivery service",
        description: "We provide express delivery service to customers",
    },
    {
        ic: faDollarSign,
        title: "Installments",
        description: "Payment options in installments via Tabby and Tamara",
    },
];
