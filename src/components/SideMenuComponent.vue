<template>
    <aside class="exist-documentation-container">
        <DraggableDoc />
    </aside>
</template>

<script setup lang="ts">
import DraggableDoc from './DraggabbleDocComponent.vue'
import { selectedDocumentation } from '../models/documentation';
import { watch } from 'vue';

watch(selectedDocumentation , () => {
    console.log(selectedDocumentation.value)
})
</script>