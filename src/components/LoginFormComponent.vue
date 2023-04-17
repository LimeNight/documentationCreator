<template>
    <form @submit.prevent="emit('login', userForm)">
        <label for="name">Email</label>
        <input type="text" v-model="userForm.email" required>
        <label for="name">Password</label>
        <input type="password" v-model="userForm.password" required>
        <button type="submit">Login</button>
    </form>
</template>

<script setup lang="ts">
import type { ILoginForm } from '@/models/user'
import { defineEmits, reactive } from 'vue';

const emit = defineEmits(['login'])
let userForm = reactive<ILoginForm>({
    email: '',
    password: ''
})
</script>