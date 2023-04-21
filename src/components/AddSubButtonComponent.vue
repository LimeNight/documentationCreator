<template>
    <button class="plus-menu-btn" 
            @click="emit('addSub')">
            Add sub
    </button>
</template>
<script setup lang="ts">
import { defineEmits } from 'vue';
const emit = defineEmits(['addSub'])
</script>