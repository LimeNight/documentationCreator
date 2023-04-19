<template>
    <button class="plus-menu-btn" 
            @click="emit('addSubMenu')">
            Add sub title
    </button>
</template>
<script setup lang="ts">
import { defineEmits } from 'vue';
const emit = defineEmits(['addSubMenu'])
</script>