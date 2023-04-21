<template>
    <nav>
        <p class="welcome-msg" v-if="user.authenticate">Üdv {{ user.username }}</p>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink v-if="user.authenticate" to="/create">Create</RouterLink>
        <RouterLink v-if="!user.authenticate" to="/login">Login</RouterLink>
        <RouterLink v-if="!user.authenticate" to="/register">Registration</RouterLink>
        <RouterLink v-else to="/login" @click="logout">Logout</RouterLink>
    </nav>
</template>
   
<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { User, user } from '../models/user'
import { deleteToken, deleteId } from '@/utilities/storage';

const logout = (): void => {
    deleteToken()
    deleteId()
    user.value = new User()
}
</script>