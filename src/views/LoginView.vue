<template>
    <div class="login-container">
        <h2>Login</h2>
        <LoginForm @login="login" />
    </div>
</template>

<script setup lang="ts">
import LoginForm from '../components/LoginFormComponent.vue';
import { useRouter } from 'vue-router';
import { type ILoginForm, user } from '@/models/user';
import axios from 'axios';
import { setToken, setId } from '../utilities/storage';
import { docRequest } from '../models/requests';

const router = useRouter()

const login = async (form: ILoginForm): Promise<void> => {
    await axios.post("http://localhost:3000/login", form)
        .then(res => {
            let resUser = res.data
            setToken(resUser.accessToken)
            setId(resUser.user.id)
            user.value = resUser.user
            user.value.authenticate = true
            return <number>resUser.user.id
        })
        .then(async (id: number) => {
            user.value.documentations = await docRequest.read(id)
            router.replace('/')
        })
        .catch(err => {
            console.log(err)
        })
}
</script>