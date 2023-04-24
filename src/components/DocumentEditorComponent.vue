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
            <div style="display: flex; flex-direction: row; gap: 10px;">
                <button @click="sumbmitPrompt(discription.paragraph)">Ai Help</button>
                <button @click="addParahraph(<IDocumentation>selectedDocumentation, selectedDocumentationItem, discription.position)">Add</button>
                <button @click="deleteParagraph(<IDocumentation>selectedDocumentation, selectedDocumentationItem, discription.position)">Delete</button>
            </div>
            <div v-if="responseData" style="display: flex; flex-direction: row; gap: 10px;">
                <button @click="apply(responseData, discription)">Apply</button>
                <button @click="responseData = null">Cancel</button>
            </div>
        </div>
        <AiResponse v-if="responseData" 
                    :responseMsg="responseData"
                    @closeAi="closeAi"/>
        <button v-if="selectedDocumentationItem.discriptions.length === 0" 
                @click.prevent="addParahraph(<IDocumentation>selectedDocumentation, selectedDocumentationItem, 1)">
                Add paragraph
        </button>
    </div>
</template>

<script setup lang="ts">
import { deleteParagraph, Discription } from '@/models/documentation';
import { overView } from '@/utilities/overview';
import AiResponse from './AiResponseComponent.vue';
import 
{ 
    selectedDocumentation,
    selectedDocumentationItem, 
    type IDocumentation,
    addParahraph
} from '@/models/documentation';
import { docRequest } from '@/models/requests';
import { AiRequest } from '@/service/airequests';
import { ref } from 'vue';

const responseData = ref<string | string[] | null>(null)

const save = async (): Promise<void> => { if (selectedDocumentation.value) docRequest.update(selectedDocumentation.value) }

const sumbmitPrompt = async (prompt: string): Promise<void> => {
    if (prompt.length < 3) { console.error("Minimum 3 karakter hosszú szöveget meg kell adni.") }
    else { responseData.value = await new AiRequest(prompt).make() }
}

const apply = (aiDisc: string | string[] | null, currentDisc: Discription): void => {
    if (aiDisc){
        currentDisc.paragraph = ''
        for (const msg of aiDisc) {
            currentDisc.paragraph += msg
        }
    }
}

const closeAi = (): void => { responseData.value = null }
</script>