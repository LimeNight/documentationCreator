<template>
    <SideMenuComponent v-if="user.documentations"
                       :documentations="user?.documentations"
                       @setSelectedDocumentation="setSelectedDocumentation"/>
    <section class="edit-container">
        <DocumentEditorComponent v-if="selectedDocumentItem"
                                 :selectedDocumentItem="selectedDocumentItem"
                                 @save="save"/>
    </section>
</template>

<script setup lang="ts">
import SideMenuComponent from '@/components/SideMenuComponent.vue';
import DocumentEditorComponent from '@/components/DocumentEditorComponent.vue';
import { ref } from 'vue';
import axios from 'axios';
import { config } from '@/utilities/storage';
import { user } from '@/models/user';
import type { IDocumentation, MainMenuItem, SubMenuItem } from '../models/documentation';

const selectedDocumentItem = ref<MainMenuItem | SubMenuItem | IDocumentation | null>(null)

const setSelectedDocumentation = (item: MainMenuItem | SubMenuItem | IDocumentation): void => { selectedDocumentItem.value = item }

const save = async (documentation: IDocumentation) => {
    await axios.put("http://localhost:3000/documentations/" + user.value.id, documentation, config())
         .then(res => console.log(res.data))
         .catch(err => console.log(err));
}
</script>