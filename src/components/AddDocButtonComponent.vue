<template>
    <button class="plus-menu-btn" 
            @click="emit('addNewDocumentation')">
            Add new doc
    </button>
</template>
<script setup lang="ts">
import { defineEmits } from 'vue';
const emit = defineEmits(['addNewDocumentation'])
</script>