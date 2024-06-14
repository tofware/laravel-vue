import {ref} from "vue";
import axios from "axios";

export default function useHome() {
    const posts = ref({})
    const categories = ref({})
    const categoryPosts = ref({})

    const getPosts = async () => {
        axios.get('/api/home/posts')
            .then(response => {
                posts.value = response.data;
            })
    }

    const getCategories = async () => {
        axios.get('/api/home/categories')
            .then(response => {
                categories.value = response.data;
            })
    }

    const getCategoryPosts = async (name) => {
        axios.get('/api/' + name)
            .then(response => {
                categoryPosts.value = response.data;
            })
    }

    return {posts, categories, categoryPosts, getPosts, getCategories, getCategoryPosts}
}
