<template>
    <div class="overflow-hidden overflow-x-auto p-6 bg-white border-gray-200">
        <div class="min-w-full align-middle">
            <div class="flex justify-between">
                <router-link :to="{ name: 'categories.create' }" active-class="border-b-2 border-indigo-400" class="text-xl inline-flex items-center px-1 pt-1 font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out">
                    + Create
                </router-link>
            </div>

            <table class="min-w-full divide-y divide-gray-200 border">
                <thead>
                <tr>
                    <th class="px-6 py-3 bg-gray-50 text-left">
                        <div class="flex flex-row items-center justify-between cursor-pointer">
                            <div class="leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                ID
                            </div>
                        </div>
                    </th>
                    <th class="px-6 py-3 bg-gray-50 text-left">
                        <div class="flex flex-row items-center justify-between cursor-pointer">
                            <div class="leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </div>
                        </div>
                    </th>
                    <th class="px-6 py-3 bg-gray-50 text-left">
                        <span
                            class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Actions</span>
                    </th>
                </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200 divide-solid">
                <template v-if="categories && categories && categories.length > 0">
                    <tr v-for="category in categories" :key="category.id">
                        <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{{ category.id }}</td>
                        <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{{ category.name }}</td>
                        <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                            <router-link v-if="can('categories.update')" :to="{ name: 'categories.edit', params: { id: category.id } }">Edit</router-link>
                            <a href="#" v-if="can('categories.delete')" @click.prevent="deleteCategory(category.id)" class="ml-2">Delete</a>
                        </td>
                    </tr>
                </template>
                <template v-else>
                    <tr>
                        <td colspan="4" class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                            No categories found
                        </td>
                    </tr>
                </template>
                </tbody>
            </table>
            <TailwindPagination :data="categories" @pagination-change-page="page => getCategories(page)" class="mt-4" />
        </div>
    </div>
</template>
<script setup>
import {onMounted} from "vue";
import {TailwindPagination} from "laravel-vue-pagination";
import useCategories from "@/composables/categories";
import { useAbility } from '@casl/vue'

const {categories, getCategories, deleteCategory} = useCategories();
const { can } = useAbility()

onMounted(() => {
    getCategories()
})
</script>
