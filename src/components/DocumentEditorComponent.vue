<template>
    <form class="edit-form" v-if="selectedDocumentaitonItem">
        <label for="title">Documentation title:</label>
        <textarea cols="30" rows="1" v-model="selectedDocumentaitonItem.title">
        </textarea>
        <label for="discription">Discription</label>
        <ul>
            <li v-for="discription in selectedDocumentaitonItem.discriptions"
                :key="discription.position">
                <textarea cols="30" rows="10" v-model="discription.paragraph"></textarea>
                <hr>
                <button @click.prevent="addDiscription(<IDocumentation>selectedDocumentation, selectedDocumentaitonItem, discription.position)">Add paragraph</button>
            </li>
        </ul>
        <button @click.prevent="addDiscription(<IDocumentation>selectedDocumentation, selectedDocumentaitonItem, 1)">Add paragraph</button>
        <button @click.prevent="save">Save</button>
    </form>
</template>

<script setup lang="ts">
import { calculatePosition, 
         selectedDocumentation,
         selectedDocumentaitonItem, 
         type Discription, 
         type IDocumentation,
         type SubMenuItem,
         type MainMenuItem } from '@/models/documentation';
import { docRequest } from '@/models/requests';
import { reactive } from 'vue';

let newDiscription = reactive<Discription>({
    position: 1,
    paragraph: ''
})

const addDiscription = async (documentation: IDocumentation, selectedItem: IDocumentation | MainMenuItem | SubMenuItem | null , position: number): Promise<void> => {
    if(selectedItem){
        selectedItem.discriptions?.splice(position, 0, Object.assign({}, newDiscription))
        calculatePosition(selectedItem.discriptions)
        docRequest.update(documentation)
    }
}
const save = async (): Promise<void> => { if (selectedDocumentation.value) docRequest.update(selectedDocumentation.value) }
</script>