import {inject, ref} from "vue";
import {useRouter} from "vue-router";
import axios from "axios";

export default function useCategories() {
    const categories = ref({})
    const category = ref({})
    const router = useRouter()
    const validationErrors = ref({})
    const isLoading = ref(false)
    const swal = inject('$swal');

    const getCategory = async (id) => {
        axios.get('/api/categories/' + id)
            .then(response => {
                category.value = response.data.data;
            })
    }

    const getCategories = async (page = 1) => {
        axios.get('/api/categories')
            .then(response => {
                categories.value = response.data.data;
            })
    }

    const storeCategory = async (category) => {
        if (isLoading.value) return

        isLoading.value = true
        validationErrors.value = {}

        let serializedCategory = new FormData()
        for (let item in category) {
            if (category.hasOwnProperty(item)) {
                serializedCategory.append(item, category[item])
            }
        }

        axios.post('/api/categories', serializedCategory)
            .then(response => {
                router.push({name: 'categories.index'})
                swal({
                    icon: 'success',
                    title: 'Category saved successfully'
                })
            })
            .catch(error => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors
                }
            })
    }

    const updateCategory = async (category) => {
        if (isLoading.value) return

        isLoading.value = true
        validationErrors.value = {}

        axios.put('/api/categories/' + category.id, category)
            .then(response => {
                router.push({name: 'categories.index'})
                swal({
                    icon: 'success',
                    title: 'Category save successfully'
                })
            })
            .catch(error => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors
                }
            })
            .finally(() => isLoading.value = false)
    }

    const deleteCategory = async (id) => {
        swal({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this action!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            confirmButtonColor: '#ef4444',
            timer: 20000,
            timerProgressBar: true,
            reverseButtons: true
        })
            .then(result => {
                if (result.isConfirmed) {
                    axios.delete('/api/categories/' + id)
                        .then(response => {
                            getCategories()
                            router.push({name: 'categories.index'})
                            swal({
                                icon: "success",
                                title: "Category deleted successfully"
                            })
                        })
                        .catch(error => {
                            swal({
                                icon: "error",
                                title: "Something went wrong"
                            })
                        })
                }
            })
    }

    return {categories, category, getCategory, getCategories, storeCategory, updateCategory, deleteCategory}
}
