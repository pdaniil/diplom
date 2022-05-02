import HomePage from "@/pages/HomePage";
import SearchPage from "@/pages/SearchPage";
import ChatPage from "@/pages/ChatPage";
import ManageChatPage from "@/pages/ManageChatPage";
import ProfilePage from "@/pages/ProfilePage";
import OrdersPage from "@/pages/OrdersPage";
import CartPage from "@/pages/CartPage";
import CartPageDelivery from "@/components/CartPage/CartPageDelivery";
import CartPagePayment from "@/components/CartPage/CartPagePayment";
import CartPageConfirm from "@/components/CartPage/CartPageConfirm";
import {createRouter, createWebHistory} from "vue-router";
const routes = [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/search',
        component: SearchPage
    },
    {
        path: '/chat',
        component: ChatPage
    },
    {
        path: '/manage-chat',
        component: ManageChatPage
    },
    {
        path: '/profile',
        component: ProfilePage
    },
    {
        path: '/orders',
        component: OrdersPage
    },
    {
        path: '/cart',
        component: CartPage
    },
    {
        path: '/cart/delivery',
        component: CartPageDelivery
    },
    {
        path: '/cart/payment',
        component: CartPagePayment
    },
    {
        path: '/cart/confirm',
        component: CartPageConfirm
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;