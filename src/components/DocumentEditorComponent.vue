<template>
    <div class="edit-form" v-if="selectedDocumentationItem" @focusout="save">
        <button @click="overView(<IDocumentation>selectedDocumentation)">OverView</button>
        <label for="title">Title:</label>
        <textarea class="title-editor-area" v-model="selectedDocumentationItem.title">
        </textarea>
        <label for="discription">Discription(s)</label>
        <div v-for="discription in selectedDocumentationItem.discriptions"
             :key="discription.position"
             class="dic-editor-container">
            <textarea class="disc-editor-area" v-model="discription.paragraph"></textarea>
            <hr style="width: 50vw;">
            <button @click.prevent="addParahraph(<IDocumentation>selectedDocumentation, selectedDocumentationItem, discription.position)">Add paragraph</button>
            <button @click.prevent="deleteParagraph(<IDocumentation>selectedDocumentation, selectedDocumentationItem, discription.position)">Delete</button>
        </div>
        <button v-if="selectedDocumentationItem.discriptions.length === 0" @click.prevent="addParahraph(<IDocumentation>selectedDocumentation, selectedDocumentationItem, 1)">Add paragraph</button>
    </div>
</template>

<script setup lang="ts">
import { deleteParagraph } from '@/models/documentation';
import { overView } from '@/utilities/overview';
import 
{ 
    selectedDocumentation,
    selectedDocumentationItem, 
    type IDocumentation,
    addParahraph
} from '@/models/documentation';
import { docRequest } from '@/models/requests';


const save = async (): Promise<void> => { 
    console.log('save');
    if (selectedDocumentation.value) docRequest.update(selectedDocumentation.value) 
}


</script>