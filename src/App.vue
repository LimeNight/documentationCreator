<template>
  <Navigation />

  <main>
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onBeforeMount } from 'vue';
import { user } from './models/user'
import { getToken, getId } from './utilities/storage';
import Navigation from './components/NavigationComponent.vue';
import axios from 'axios';
import { config } from './models/requests';
import { docRequest } from './models/requests';

const getUser = async (id: number): Promise<void> => {
  await axios("http://localhost:3000/users/" + id, config())
    .then(res => {
      user.value = res.data
      user.value.authenticate = true
    })
    .then(async () => { user.value.documentations = await docRequest.read(id)})
    .catch(err => console.log(err))
}

onBeforeMount(async (): Promise<void> => {
  let token = getToken()
  let id = parseInt(getId())

  if (token && id) await getUser(id)
})
</script>
