<template>
    <aside class="exist-documentation-container">
        <div v-for="documentation in props.documentations"
            :key="documentation.position" 
            class="exist-documentation-list">

            <p class="exist-document-title"
               @click.prevent="emit('setSelectedDocumentation', documentation)">
                {{ documentation.title }}
            </p>

            <div v-for="mainMenu in documentation.mainMenuItems" 
                :key="mainMenu.position"
                class="main-menu-items">
                <p @click.prevent="emit('setSelectedDocumentation', mainMenu)"> {{ mainMenu.title }} </p>
                <div v-for="subMenu in mainMenu.subMenuItems" 
                    :key="subMenu.position"
                    class="sub-menu-items">
                        <p @click.prevent="emit('setSelectedDocumentation', subMenu)">{{ subMenu.title }}</p>
                        <button class="plus-menu-btn" 
                                @click="addSubMenu(documentation, mainMenu, subMenu.position)">
                                Add sub title
                        </button>
                </div>
                <button class="plus-menu-btn"
                        @click="addMainMenu(documentation, mainMenu.position)">
                        Add main title
                </button>
            </div>
            <button class="plus-document-btn"
                    @click="addNewDocumentation()">
                    Add new documentation
            </button>
        </div>
    </aside>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, reactive } from 'vue';
import { user } from '@/models/user';
import axios from 'axios';
import { Documentation, type MainMenuItem, type Discription, type SubMenuItem, type IDocumentation } from '../models/documentation';
import { config } from '../utilities/storage';

const props = defineProps(['documentations', 'editTitle'])
const emit = defineEmits(['setSelectedDocumentation', 'editTitleState'])


let newDiscription = reactive<Discription>({
    paragraph: ''
})

let newSubMenu = reactive<SubMenuItem>({
    title: 'newest',
    position: 1,
    discription: [newDiscription]
})

let newMainMenu = reactive<MainMenuItem>({
    title: 'new',
    position: 1,
    discription: [newDiscription],
    subMenuItems: [newSubMenu]
})

let newDocumentation = reactive<IDocumentation>(new Documentation())

const addSubMenu = async (documentation: IDocumentation, mainMenu: MainMenuItem, position: number): Promise<void> => {
    mainMenu.subMenuItems?.splice(position, 0, Object.assign({}, newSubMenu))
    if (typeof(mainMenu.subMenuItems) !== 'undefined') calculatePosition(mainMenu.subMenuItems)
    updateDocumentation(documentation)
}

const addMainMenu = async (documentation: IDocumentation, position: number): Promise<void> => {
    documentation.mainMenuItems?.splice(position, 0, Object.assign({}, newMainMenu))
    calculatePosition(documentation.mainMenuItems)
    updateDocumentation(documentation)
}

const addNewDocumentation = async (): Promise<void> => {
    newDocumentation.userId = <number>user.value.id
    user.value.documentations?.push(newDocumentation)
    calculatePosition(<IDocumentation[]>user.value.documentations)
    await axios.post("http://localhost:3000/documentations/", newDocumentation, config())
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
}

const calculatePosition = (array: MainMenuItem[] | SubMenuItem[] | Documentation[]) => {
    let startPosition: number = 1;
    array.map(item => item.position = startPosition++)
}

const updateDocumentation = async (documentation: IDocumentation) => {
    await axios.put("http://localhost:3000/documentations/" + user.value.id , documentation, config())
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
}
</script>