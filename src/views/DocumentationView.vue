<template>
    <SideMenuComponent  v-if="user.documentations" />
    <section class="edit-container">
        <DocumentEditorComponent/>
    </section>
</template>

<script setup lang="ts">
import SideMenuComponent from '@/components/SideMenuComponent.vue';
import DocumentEditorComponent from '@/components/DocumentEditorComponent.vue';
import 
{
    selectedDocumentation, 
    selectedDocumentationItem 
} from '../models/documentation';
import { user } from '@/models/user';
import { onBeforeUnmount } from 'vue';

onBeforeUnmount(() => {
    selectedDocumentation.value = null
    selectedDocumentationItem.value = null
})
</script>