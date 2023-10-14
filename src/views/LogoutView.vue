<script setup>
// import { ref, reactive } from 'vue';

import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/AuthStore'

const authStore = useAuthStore()
authStore.accessToken = null

const router = useRouter()
router.push("/login")

</script>


<template>
    logout
</template>

<style scoped></style>
