import {createRouter, createWebHistory} from "vue-router";

import PostsIndex from "@/components/Posts/Index.vue";
import PostsCreate from "@/components/Posts/Create.vue";
import PostsEdit from "@/components/Posts/Edit.vue";
import AuthenticatedLayout from '@/layouts/Authenticated.vue';
import GuestLayout from '@/layouts/Guest.vue';
import Login from '@/components/Auth/Login.vue';
import Register from "@/components/Auth/Register.vue";
import Homepage from "@/components/Homepage.vue";
import Blog from "@/layouts/Blog.vue";

function auth(to, from, next) {
    if (JSON.parse(localStorage.getItem('loggedIn'))) {
        next()
    } else {
        next('/login')
    }
}

const routes = [
    {
        component: Blog,
        children: [
            {
                path: '/home',
                name: 'homepage',
                component: Homepage
            },
        ]
    },
    {
        component: GuestLayout,
        children: [
            {
                path: '/login',
                name: 'login',
                component: Login
            },
            {
                path: '/register',
                name: 'register',
                component: Register
            },
        ]
    },
    {
        component: AuthenticatedLayout,
        beforeEnter: auth,
        children: [
            {
                path: '/posts',
                name: 'posts.index',
                meta: {title: 'Posts'},
                component: PostsIndex
            },
            {
                path: '/posts/create',
                name: 'posts.create',
                meta: {title: 'Add new post'},
                component: PostsCreate
            },
            {
                path: '/posts/edit/:id',
                name: 'posts.edit',
                meta: {title: 'Edit post'},
                component: PostsEdit
            }
        ]
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/home'
    },
]

export default createRouter({
    history: createWebHistory(),
    routes
})
