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
import { config } from '../utilities/storage';
import { setToken, setId } from '../utilities/storage';
import type { IDocumentation } from '../models/documentation';

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
            const { headers } = config()
            await axios("http://localhost:3000/documentations", {params:{ userId: id}, headers})
                .then(res => {
                    console.log(res.data)
                    user.value.documentations = res.data
                    console.log(user.value.documentations)
                    router.replace('/')
                })
                .catch(() => {
                    console.log('Nincs még dokumentáció!')
                    router.replace('/')
                })
        })
        .catch(err => {
            console.log(err)
        })
}
</script>