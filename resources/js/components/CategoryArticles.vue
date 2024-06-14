<template>
    <section v-if="categoryPosts && categoryPosts.data && categoryPosts.data.length > 0">
        <div class="container border rounded-l-md mb-5 bg-gray-50 px-4 py-4" v-for="post in categoryPosts.data" :key="post.id">
            <div class="flex justify-between">
                <h1 class="text-2xl">{{post.title}}</h1>
                <h1>{{post.created_at}}</h1>
                <h1>{{post.category}}</h1>
            </div>
            <div class="max-w-3xl mt-10">
                {{post.content}}
            </div>
            <div>
                <img src="https://e00-marca.uecdn.es/assets/multimedia/imagenes/2024/05/11/17154525650023.jpg"/>
            </div>
        </div>
    </section>
</template>
<script setup>
import {onMounted, watch} from "vue";
    import useHome from "@/composables/home.js";
    import {useRoute} from "vue-router";

    const {categoryPosts, getCategoryPosts } = useHome();
    const route = useRoute()

    onMounted(() => {
        getCategoryPosts(route.params.name);
    })
</script>
