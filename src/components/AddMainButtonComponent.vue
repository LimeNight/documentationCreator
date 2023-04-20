<template>
    <button class="plus-menu-btn" 
            @click="emit('addMain')">
            Add main title
    </button>
</template>
<script setup lang="ts">
import { defineEmits } from 'vue';
const emit = defineEmits(['addMain'])
</script>