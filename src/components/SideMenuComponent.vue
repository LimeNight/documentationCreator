<template>
    <aside class="exist-documentation-container">
            <draggable v-if="user.documentations.length > 0" :list="user.documentations" itemKey="position" :animation="300" @change="calculatePosition(user.documentations), docRequest.update(user.documentations)">
                <template #item="{ element: documentation }" >
                    <div  class="exist-documentation-list">
                        <div @click="selectedDocumentation = documentation" class="exist-documentation-list">

                            <p class="exist-document-title" @click="emit('setSelectedDocumentationItem', documentation)">
                                {{ documentation.title }} {{ documentation.position }}
                            </p>
                            <div v-if="documentation.mainMenuItems.length > 0" class="main-menu-items">
                                <div v-for="mainMenuItems in [documentation.mainMenuItems]" :key="mainMenuItems.position">
                                    <draggable :list="mainMenuItems" itemKey="position" @change="calculatePosition(documentation.mainMenuItems), docRequest.update(documentation)" :animation="300">
                                        <template #item="{ element: mainMenu }">
                                            <div class="main-menu-items">
                                                <p @click="emit('setSelectedDocumentationItem', mainMenu)"> {{ mainMenu.title }} {{ mainMenu.position }}</p>
                                                <div v-if="mainMenu.subMenuItems.length > 0">
                                                    <div v-for="subMenuItems in [mainMenu.subMenuItems]" :key="subMenuItems.position">
                                                        <draggable :list="subMenuItems" itemKey="position" @change="calculatePosition(mainMenu.subMenuItems), docRequest.update(documentation)" :animation="300">
                                                            <template #item="{element: subMenu}">
                                                                <div class="sub-menu-items">
                                                                <p @click.prevent="emit('setSelectedDocumentationItem', subMenu)">{{subMenu.title}} {{ subMenu.position }}</p>
                                                                <AddSubButton v-if="mainMenu.subMenuItems"
                                                                    @addSubMenu="addSubMenu(documentation, mainMenu, subMenu.position)" />
                                                                </div>
                                                            </template>
                                                        </draggable>
                                                    </div>
                                                </div>
                                                <AddSubButton v-else @addSubMenu="addSubMenu(documentation, mainMenu, 1)" />
                                                <AddMainButton @addMainMenu="addMainMenu(documentation, mainMenu.position)" />
                                            </div>
                                        </template>
                                    </draggable>
                                </div>
                            </div>
                            <AddMainButton v-else @addMainMenu="addMainMenu(documentation, 1)" />
                            <AddDocButton
                                @addNewDocumentation="addNewDocumentation(newDocumentation, documentation.position)" />
                        </div>
                    </div>
                </template>
            </draggable>
            <div v-else class="exist-documentation-list">
                <AddDocButton @addNewDocumentation="addNewDocumentation(newDocumentation, 0)" />
            </div>
    </aside>
</template>

<script setup lang="ts">
import AddMainButton from './AddMainButtonComponent.vue';
import AddDocButton from './AddDocButtonComponent.vue';
import AddSubButton from './AddSubButtonComponent.vue';
import { user } from '@/models/user';
import { docRequest } from '../models/requests';
import draggable from 'vuedraggable';
import {
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

const addSubMenu = async (documentation: IDocumentation, mainMenu: MainMenuItem, position: number = 1): Promise<void> => {
    mainMenu.subMenuItems.splice(position, 0, Object.assign({}, newSubMenu))
    calculatePosition(mainMenu.subMenuItems)
    docRequest.update(documentation)
}

const addMainMenu = async (documentation: IDocumentation, position: number = 1): Promise<void> => {
    documentation.mainMenuItems.splice(position, 0, Object.assign({}, newMainMenu))
    if (documentation.mainMenuItems) calculatePosition(documentation.mainMenuItems)
    docRequest.update(documentation)
}

const addNewDocumentation = async (newDocumentation: IDocumentation, position: number = 1 ): Promise<void> => {
    newDocumentation.userId = user.value.id
    console.log(user.value.documentations)
    user.value.documentations.splice(position, 0, Object.assign({}, newDocumentation))
    calculatePosition(<Documentation[]>user.value.documentations)
    const savedDocumentation = await docRequest.create(newDocumentation)
    const doc = user.value.documentations.find(({ id }) => id === 0)
    if (doc) doc.id = savedDocumentation.id
}
</script>