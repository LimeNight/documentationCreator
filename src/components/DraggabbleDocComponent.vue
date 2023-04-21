<template>
    <draggable v-if="user.documentations.length > 0" 
               :list="user.documentations" 
               itemKey="position" 
               :animation="300"
               @change="calculatePosition(user.documentations),
               docRequest.update(user.documentations)">

        <template #item="{ element: documentation }">
            <div @mouseover="selectedDocumentation = documentation"
                 class="document-container">

                <div class="title document-menu-item" @click="selectedDocumentationItem = documentation">
                    <p>{{ documentation.title }}</p>
                    <span @click="deleteDoc(documentation.id, documentation.position)" class="del-btn">-</span>
                </div>

                <!-- Entry point -->
                <DraggableMain v-if="documentation.mainMenuItems.length > 0" :documentation="documentation" />
    
                <AddMainButton @addMain="addMain(documentation, 1)" v-else />
                <AddDocButton @addNewDocumentation="addNewDocumentation(newDocumentation, documentation.position)" />
            </div>
        </template>
    </draggable>
    <div v-else >
        <AddDocButton @addNewDocumentation="addNewDocumentation(newDocumentation, 0)" />
    </div>
</template>

<script setup lang="ts">
import AddMainButton from './AddMainButtonComponent.vue';
import AddDocButton from './AddDocButtonComponent.vue';
import DraggableMain from './DraggableMainComponent.vue';
import { user } from '@/models/user';
import { docRequest } from '../models/requests';
import draggable from 'vuedraggable';
import {
    addMain,
    addNewDocumentation,
    newDocumentation,
    selectedDocumentation,
    calculatePosition,
    selectedDocumentationItem,
    deleteDoc
} from '../models/documentation';

</script>