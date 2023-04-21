<template>
    <draggable :list="props.mainMenu.subMenuItems" 
               itemKey="position"
               @change="calculatePosition(props.mainMenu.subMenuItems), 
               docRequest.update(<IDocumentation>selectedDocumentation)" 
               :animation="300">

        <template #item="{ element: subMenu }">

            <div class="sub-container">

                <div class="title sub-menu-item" @click="selectedDocumentationItem = subMenu"> 
                    <p>{{ subMenu.title }}</p>
                    <span @click="deleteSub(<IDocumentation>selectedDocumentation ,props.mainMenu, subMenu.position)" class="del-btn">-</span>
                </div>
                
                <AddSubButton v-if="mainMenu.subMenuItems" @addSub="addSub(<IDocumentation>selectedDocumentation, props.mainMenu, subMenu.position)" />
            </div>
        </template>
    </draggable>
</template>

<script setup lang="ts">
import AddSubButton from './AddSubButtonComponent.vue';
import { docRequest } from '../models/requests';
import draggable from 'vuedraggable';
import 
{
    addSub,
    selectedDocumentation,
    calculatePosition,
    IDocumentation,
    deleteSub,
    selectedDocumentationItem
} from '../models/documentation';

const props = defineProps(['mainMenu'])
</script>