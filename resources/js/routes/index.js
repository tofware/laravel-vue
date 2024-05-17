import {createRouter, createWebHistory} from "vue-router";

import PostsIndex from "@/components/Posts/Index.vue";
import PostsCreate from "@/components/Posts/Create.vue";
import PostsEdit from "@/components/Posts/Edit.vue";

const routes = [
    {
        path: '/',
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

export default createRouter({
    history: createWebHistory(),
    routes
})
