<template>
    <div class="register-container">
        <h2>Registration</h2>
        <RegisterForm @register="register"/>        
    </div>
</template>
<script setup lang="ts">
import RegisterForm from '@/components/RegisterFormComponent.vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import type { IRegister } from '../models/user';

const router = useRouter()

const register = async (form: IRegister): Promise<void> => {
    await axios.post("http://localhost:3000/register", form)
    .then(() => { router.replace('/login') })
    .catch(err => { console.log(err) })
}
</script>