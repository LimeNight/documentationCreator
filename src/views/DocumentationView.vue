<template>
    <aside class="side-menu" v-if="user.documentations">
        <DraggableDoc />
    </aside>
    <section class="edit-container">
        <DocumentEditorComponent/>
    </section>
</template>

<script setup lang="ts">
import DocumentEditorComponent from '@/components/DocumentEditorComponent.vue';
import { selectedDocumentationItem, selectedDocumentation } from '../models/documentation';
import { user } from '@/models/user';
import { onBeforeUnmount } from 'vue';
import DraggableDoc from '../components/DraggabbleDocComponent.vue'
import { watch } from 'vue';

watch(selectedDocumentation , () => {
    console.log(selectedDocumentation.value)
})

onBeforeUnmount(() => {
    selectedDocumentation.value = null
    selectedDocumentationItem.value = null
})
</script>