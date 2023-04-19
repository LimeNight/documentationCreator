<template>
    <button class="plus-menu-btn" 
            @click="emit('addMainMenu')">
            Add main title
    </button>
</template>
<script setup lang="ts">
import { defineEmits } from 'vue';
const emit = defineEmits(['addMainMenu'])
</script>