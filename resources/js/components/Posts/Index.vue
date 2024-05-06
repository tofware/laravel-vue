<template>
    <div class="overflow-hidden overflow-x-auto p-6 bg-white border-gray-200">
        <div class="min-w-full align-middle">
            <table class="min-w-full divide-y divide-gray-200 border">
                <thead>
                <tr>
                    <th class="px-6 py-3 bg-gray-50 text-left">
                        <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">ID</span>
                    </th>
                    <th class="px-6 py-3 bg-gray-50 text-left">
                        <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Title</span>
                    </th>
                    <th class="px-6 py-3 bg-gray-50 text-left">
                        <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Content</span>
                    </th>
                    <th class="px-6 py-3 bg-gray-50 text-left">
                        <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Created at</span>
                    </th>
                </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200 divide-solid">
                <template v-if="posts && posts.data && posts.data.length > 0">
                    <tr v-for="post in posts.data" :key="post.id">
                        <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{{ post.id }}</td>
                        <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{{ post.title }}</td>
                        <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{{ post.content }}</td>
                        <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{{ post.created_at }}</td>
                    </tr>
                </template>
                <template v-else>
                    <tr>
                        <td colspan="4" class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">No posts found</td>
                    </tr>
                </template>
                </tbody>
            </table>
            <TailwindPagination :data="posts" @pagination-change-page="getPosts" class="mt-4" />
        </div>
    </div>
</template>
<script setup>
import {onMounted} from "vue";
import {TailwindPagination} from "laravel-vue-pagination";
import usePosts from "@/composables/posts";

const { posts, getPosts } = usePosts();

onMounted(() => {
    getPosts()
})
</script>
