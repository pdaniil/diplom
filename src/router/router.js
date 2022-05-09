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
import OrderCreatedPage from "@/pages/OrderCreatedPage";
import OrdersItemsPage from "@/pages/OrdersItemsPage";
import AdminPage from "@/pages/AdminPage";
import StoragesPage from "@/components/AdminPage/StoragesPage";
import AdminChatManager from "@/pages/AdminChatManager";
import AdminChat from "@/pages/AdminChat";
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
        path: '/chat/:order_id',
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
    {
        path: '/order_created',
        component: OrderCreatedPage
    },
    {
        path: '/order_items/:order_id',
        component: OrdersItemsPage
    },
    {
        path: '/admin',
        component: AdminPage
    },
    {
        path: '/admin/storages',
        component: StoragesPage
    },
    {
        path: '/admin/chat_manager',
        component: AdminChatManager
    },
    {
        path: '/admin/chat/:order_id',
        component: AdminChat
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;