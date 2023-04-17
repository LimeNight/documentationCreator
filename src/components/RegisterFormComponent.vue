<template>
    <form @submit.prevent="emit('register', userForm)">
        <label for="name">Name</label>
        <input type="text" v-model="userForm.username" required>
        <label for="email">Email</label>
        <input type="text" v-model="userForm.email" required>
        <label for="password">Password</label>
        <input type="password" v-model="userForm.password" required>
        <button type="submit">Register</button>
    </form>
</template>
<script setup lang="ts">
import { defineEmits, reactive } from 'vue';
import type { IRegister } from '../models/user';

const emit = defineEmits(['register'])

let userForm = reactive<IRegister>({
    username: '',
    email: '',
    password: '',
    documentations: []
})
</script>
