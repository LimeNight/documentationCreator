<template>
    <SideMenuComponent v-if="user.documentations"
                       :documentations="user?.documentations"
                       @setSelectedDocumentationItem="setSelectedDocumentationItem"/>
    <section class="edit-container">
        <DocumentEditorComponent v-if="selectedDocumentaitonItem"
                                 @save="save"/>
    </section>
</template>

<script setup lang="ts">
import SideMenuComponent from '@/components/SideMenuComponent.vue';
import DocumentEditorComponent from '@/components/DocumentEditorComponent.vue';
import { ref } from 'vue';
import { docRequest } from '@/models/requests';
import { user } from '@/models/user';
import type { IDocumentation, MainMenuItem, SubMenuItem } from '../models/documentation';
import { selectedDocumentation, selectedDocumentaitonItem } from '../models/documentation';

const setSelectedDocumentationItem = (item: MainMenuItem | SubMenuItem | IDocumentation): void => { selectedDocumentaitonItem.value = item }

const save = async () => {
    if (selectedDocumentation.value !== null){
        const res = await docRequest.update(selectedDocumentation.value)
        console.log(res)
    }
}
</script>