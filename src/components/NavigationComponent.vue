<template>
    <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink v-if="user.authenticate" to="/create">Create</RouterLink>
        <RouterLink v-if="!user.authenticate" to="/login">Login</RouterLink>
        <RouterLink v-if="!user.authenticate" to="/register">Registration</RouterLink>
        <p v-else @click="logout" style="cursor: pointer; margin: 0;">Logout</p>
    </nav>
</template>
   
<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import { User, user } from '../models/user'
import { deleteToken, deleteId } from '@/utilities/storage';

const router = useRouter()

const logout = (): void => {
    router.replace('/login')
    deleteToken()
    deleteId()
    user.value = new User()
}
</script>