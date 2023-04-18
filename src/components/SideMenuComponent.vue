<template>
    <aside class="exist-documentation-container">
        <div v-if="props.documentations">
            <div v-for="documentation in props.documentations" 
                @click="selectedDocumentation = documentation"
                :key="documentation.position" 
                class="exist-documentation-list">

                <p class="exist-document-title" 
                   @click="emit('setSelectedDocumentationItem', documentation)">
                    {{ documentation.title }} {{ documentation.position }}
                </p>

                <div v-for="mainMenu in documentation.mainMenuItems" 
                    :key="mainMenu.position" 
                    class="main-menu-items">

                    <p @click="emit('setSelectedDocumentationItem', mainMenu)"> {{ mainMenu.title }} </p>

                    <div v-for="subMenu in mainMenu.subMenuItems" 
                        :key="subMenu.position" 
                        class="sub-menu-items">

                        <p @click.prevent="emit('setSelectedDocumentationItem', subMenu)">{{ subMenu.title }}</p>

                        <button class="plus-menu-btn" 
                                @click="addSubMenu(documentation, mainMenu, subMenu.position)">
                                Add sub title
                        </button>
                    </div>
                    <button v-if="mainMenu.subMenuItems" 
                            class="plus-menu-btn"
                            @click="addSubMenu(documentation, mainMenu, 1)">
                            Add sub title
                    </button>
                    <button class="plus-menu-btn" 
                            @click="addMainMenu(documentation, mainMenu.position)">
                            Add main title
                    </button>
                </div>
                <button v-if="documentation.mainMenuItems" 
                        class="plus-menu-btn" 
                        @click="addMainMenu(documentation, 1)">
                    Add main title
                </button>
                <button class="plus-document-btn" 
                        @click="addNewDocumentation()">
                    Add new documentation
                </button>
            </div>
        </div>
        <div v-else class="exist-documentation-list">
            <button class="plus-document-btn" 
                    @click="addNewDocumentation()">
                Add new documentation
            </button>
        </div>
    </aside>
</template>

<script setup lang="ts">
import { user } from '@/models/user';
import { docRequest } from '../models/requests';
import {
    defineProps,
    defineEmits,
    reactive
} from 'vue';
import {
    type MainMenuItem,
    type SubMenuItem,
    type IDocumentation,
    Documentation,
    selectedDocumentation,
    calculatePosition
} from '../models/documentation';

const props = defineProps(['documentations'])
const emit = defineEmits(['setSelectedDocumentationItem'])

let newSubMenu = reactive<SubMenuItem>({
    title: 'newest',
    position: 1,
    discriptions: []
})

let newMainMenu = reactive<MainMenuItem>({
    title: 'new',
    position: 1,
    discriptions: [],
    subMenuItems: []
})

let newDocumentation = reactive<Documentation>(new Documentation())

const addSubMenu = async (documentation: IDocumentation, mainMenu: MainMenuItem, position: number): Promise<void> => {
    mainMenu.subMenuItems.splice(position, 0, Object.assign({}, newSubMenu))
    calculatePosition(mainMenu.subMenuItems)
    // docRequest.update(documentation)
}

const addMainMenu = async (documentation: IDocumentation, position: number): Promise<void> => {
    documentation.mainMenuItems?.splice(position, 0, Object.assign({}, newMainMenu))
    if (documentation.mainMenuItems) calculatePosition(documentation.mainMenuItems)
    // docRequest.update(documentation)
}

const addNewDocumentation = async (): Promise<void> => {
    newDocumentation.userId = <number>user.value.id
    console.log(user.value.documentations)
    user.value.documentations.push(newDocumentation)
    // if (user.value.documentations) calculatePosition(<Set<IDocumentation>>user.value.documentations)
    // await docRequest.create(newDocumentation)
}
</script>