<template>
    <div class="edit-form" v-if="selectedDocumentationItem">
        <label for="title">Title:</label>
        <textarea class="title-editor-area" v-model="selectedDocumentationItem.title">
        </textarea>
        <label for="discription">Discription(s)</label>
        <div v-for="discription in selectedDocumentationItem.discriptions"
             :key="discription.position"
             class="dic-editor-container">
            <textarea class="disc-editor-area" v-model="discription.paragraph"></textarea>
            <hr style="width: 50vw;">
            <button @click.prevent="addDiscription(<IDocumentation>selectedDocumentation, selectedDocumentationItem, discription.position)">Add paragraph</button>
        </div>
        <button v-if="selectedDocumentationItem.discriptions.length === 0" @click.prevent="addDiscription(<IDocumentation>selectedDocumentation, selectedDocumentationItem, 1)">Add paragraph</button>
        <button @click.prevent="save">Save</button>
    </div>
</template>

<script setup lang="ts">
import 
{ 
    selectedDocumentation,
    selectedDocumentationItem, 
    type IDocumentation,
    addDiscription
} from '@/models/documentation';
import { docRequest } from '@/models/requests';


const save = async (): Promise<void> => { if (selectedDocumentation.value) docRequest.update(selectedDocumentation.value) }
</script>