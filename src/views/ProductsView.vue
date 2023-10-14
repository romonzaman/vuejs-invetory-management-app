<script setup>
import { ref, onMounted, computed } from 'vue';

import UserLayout from '../components/UserLayout.vue'
document.title = "Products List"

const searchField = ref(["title", "description"]);
const searchValue = ref("");

const headers = [
    { text: "title", value: "title", width: 200, sortable: true },
    { text: "description", value: "description", width: 300 },
    { text: "price", value: "price", sortable: true },
    { text: "discountPercentage", value: "discountPercentage" },
    { text: "rating", value: "rating", sortable: true },
    { text: "stock", value: "stock", sortable: true },
    { text: "action", value: "action" }
];

const items = ref([]);

onMounted(async () => {
    loading.value = true
    const resJson = await fetch('https://dummyjson.com/products').then(resText => {
        return resText.json()
    })
    loading.value = false
    items.value = resJson.products
    console.log(items.value)
})


const loading = ref(false)

const total_items = computed(() => {
    return items.value.length
})
</script>


<template>
    <UserLayout :activeMenu="2">

        <div class="m-10">
            <div class="mb-8">
                <span class="text-2xl underline underline-offset-8">
                    Products List:
                </span>
            </div>
            <div class="flex  justify-between items-center mb-4">
                <input type="text" v-model="searchValue" placeholder="search"
                    class="px-2 py-1 w-1/4 shadow-sm shadow-blue-600 mb-3">
                <button @click="$router.push({ name: 'CreateProduct' })"
                    class="p-2 bg-blue-600 text-white rounded-lg border hover:bg-white hover:text-blue-800 hover:border">
                    Add Product
                </button>
            </div>
            <span class="text-sm flex justify-end items-end">Totals: {{ total_items }}</span>
            <EasyDataTable :loading="loading" :headers="headers" :items="items" :search-field="searchField"
                :rows-per-page="5" :search-value="searchValue" show-index alternating buttons-pagination>
                <template #item-title="{ id, title, thumbnail }">
                    <a :href="'/products/' + id" class="flex items-center">
                        <img :src="thumbnail" alt="" class="rounded-full w-6 h-6">
                        <span class="ml-2">
                            {{ title }}
                        </span>
                    </a>
                </template>
                <template #item-action="{ id }">
                    <a :href="'/products/' + id" class="bg-blue-800 text-white p-2 rounded-xl">Details</a>
                </template>
            </EasyDataTable>
        </div>

    </UserLayout>
</template>

<style scoped></style>
