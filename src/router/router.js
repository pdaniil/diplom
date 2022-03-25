import HomePage from "@/pages/HomePage";
import SearchPage from "@/pages/SearchPage";
import ChatPage from "@/pages/ChatPage";
import ManageChatPage from "@/pages/ManageChatPage";
import ProfilePage from "@/pages/ProfilePage";

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
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;