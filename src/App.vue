<template>
  <Navigation />
  
  <main>
    <RouterView/>
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onBeforeMount } from 'vue';
import { user } from './models/user'
import { getToken, getId, config } from './utilities/storage';
import Navigation from './components/NavigationComponent.vue';
import axios from 'axios';
import type { IDocumentation } from './models/documentation';

const getUser = async (id: number): Promise<void> => {
    await  axios("http://localhost:3000/users/" + id, config())
      .then(res => {
        user.value = res.data
        user.value.authenticate = true
      })
      .then(async () => {
        const { headers } = config()
        await axios("http://localhost:3000/documentations", {params:{ userId: id}, headers})
          .then(res => {
              console.log(res.data)
              user.value.documentations = res.data
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))

}

onBeforeMount(async (): Promise<void> => {
  let token = getToken()
  let id = parseInt(getId())

  if (token && id) await getUser(id)
})
</script>
