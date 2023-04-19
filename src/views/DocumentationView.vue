<template>
    <SideMenuComponent  v-if="user.documentations"
                        @setSelectedDocumentationItem="setSelectedDocumentationItem"/>
    <section class="edit-container">
        <DocumentEditorComponent/>
    </section>
</template>

<script setup lang="ts">
import SideMenuComponent from '@/components/SideMenuComponent.vue';
import DocumentEditorComponent from '@/components/DocumentEditorComponent.vue';
import 
{
    type IDocumentation,
    type MainMenuItem, 
    type SubMenuItem, 
    selectedDocumentation, 
    selectedDocumentaitonItem 
} from '../models/documentation';
import { user } from '@/models/user';
import { onBeforeUnmount } from 'vue';

const setSelectedDocumentationItem = (item: MainMenuItem | SubMenuItem | IDocumentation): void => { selectedDocumentaitonItem.value = item }

onBeforeUnmount(() => {
    selectedDocumentation.value = null
    selectedDocumentaitonItem.value = null
})
</script>