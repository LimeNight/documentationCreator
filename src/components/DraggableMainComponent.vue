<template>
    <draggable :list="props.documentation.mainMenuItems" 
               itemKey="position" 
               @change="calculatePosition(props.documentation.mainMenuItems),
               docRequest.update(props.documentation)" 
               :animation="300">

        <template #item="{ element: mainMenu }">

            <div class="main-menu-items">

                <p @click="selectedDocumentationItem = mainMenu"> {{ mainMenu.title }} {{ mainMenu.position }}
                    <span @click="deleteMain(<IDocumentation>selectedDocumentation, mainMenu.position)" class="del-btn">-</span>
                </p>

                <div v-if="mainMenu.subMenuItems.length > 0">
                    <!-- Entry point -->
                    <DraggableSub :mainMenu="mainMenu"/>
                </div>

                <AddSubButton v-else @addSuu="addSub(documentation, mainMenu, 1)" />
                <AddMainButton @addMain="addMain(documentation, mainMenu.position)" />
            </div>
        </template>
    </draggable>
</template>

<script setup lang="ts">
import DraggableSub from './DraggableSubComponent.vue';
import AddMainButton from './AddMainButtonComponent.vue';
import AddSubButton from './AddSubButtonComponent.vue';
import { docRequest } from '../models/requests';
import draggable from 'vuedraggable';
import {
    addMain,
    addSub,
    calculatePosition,
    deleteMain,
    selectedDocumentationItem,
    selectedDocumentation,
    IDocumentation
} from '../models/documentation';

const props = defineProps(['documentation'])
</script>