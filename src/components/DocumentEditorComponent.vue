<template>
    <form class="edit-form">
        <label for="title">Documentation title:</label>
        <textarea cols="30" rows="1" v-model="props.selectedDocumentItem.title">
        </textarea>
        <label for="discription">Discription</label>
        <textarea cols="30" rows="10" v-model="props.selectedDocumentItem.discription"></textarea>
        <button @click.prevent="emit('save', props.selectedDocumentItem)">save</button>
    </form>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const emit = defineEmits(['save'])
const props = defineProps(['selectedDocumentItem'])
</script>