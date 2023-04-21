<template>
  <div ref="draggableContainer" id="draggable-container" @mousedown="dragMouseDown">
    <span @click="emit('closeAi')">X</span>
    <hr>
    <hr>
    <p>{{ props.responseMsg }}</p>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, reactive, defineEmits } from 'vue';

const emit = defineEmits(['closeAi'])
const props = defineProps(['responseMsg'])
const draggableContainer = ref<HTMLDivElement>()

let positions = reactive({
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0
      })

const dragMouseDown = (event: any) => {
      event.preventDefault()
      // get the mouse cursor position at startup:
      positions.clientX = event.clientX
      positions.clientY = event.clientY
      document.onmousemove = elementDrag
      document.onmouseup = closeDragElement
    }
const elementDrag = (event: any) => {
      event.preventDefault()
    if (draggableContainer.value && positions.clientX && positions.clientY){
          positions.movementX = positions.clientX - event.clientX
          positions.movementY = positions.clientY - event.clientY
          positions.clientX = event.clientX
          positions.clientY = event.clientY
          // set the element's new position:
          draggableContainer.value.style.top = (draggableContainer.value.offsetTop - positions.movementY) + 'px'
          draggableContainer.value.style.left = (draggableContainer.value.offsetLeft - positions.movementX) + 'px'
        }
    }
const closeDragElement = () => {
      document.onmouseup = null
      document.onmousemove = null
    }
</script>

<style>
#draggable-container{
    position: fixed;
    right: 0;
    top: 0;
    cursor: pointer;
    background-color: black;
    padding: 0 20px;
    min-height: 300px;
    max-height: 400px;
    min-width: 300px;
    max-width: 300px;
    border-radius: 5px;
    word-wrap: break-word;
    word-break: break-all;
    overflow-y: scroll;
}
hr{
    width: 80%;
}
</style>