<template>
  <div
    class="video-chat__wrap"
    @mouseup="endDragging()">
    <ul
      class="video-chat__list"
      :style="{
        width: `${dividerPosition}%`
      }">
      <li
        class="video-chat__item"
        v-for="i in 8"
        :key="i">
        <VideoChatPanel />
      </li>
    </ul>
    <span
      class="section-divider"
      :style="{
        left: `${dividerPosition}%`
      }"
      @mousedown="startDragging()" />
    <UserChatDrawer
      class="user-chat-drawer"
      :style="{
        width: `${100 - +dividerPosition}%`
      }"
      ref="drawer" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import VideoChatPanel from '@/components/VideoChatPanel.vue'
import UserChatDrawer from '@/components/UserChatDrawer.vue'

const drawer = ref(null)
const dividerPosition = ref<string | number>(50)

onMounted(() => {
  // window.addEventListener('resize', onResize)
})

const handleDragging = (e: MouseEvent) => {
  const percentage = (e.pageX / window.innerWidth) * 100

  if (percentage >= 10 && percentage <= 90) {
    dividerPosition.value = percentage.toFixed(2)
  }
}
const startDragging = () => {
  document.addEventListener('mousemove', handleDragging)
}
const endDragging = () => {
  document.removeEventListener('mousemove', handleDragging)
}

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', handleDragging)
})
</script>

<style scoped lang="scss">
.video-chat__wrap {
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.user-chat-drawer {
  // position: fixed;
  // top: 0;
  // bottom: 0;
  // right: 0;
  background-color: $background-color;
}

.section-divider {
  display: block;
  height: 100vh;
  width: 6px;
  background: red;
  transform: translateX(-3px);
  position: absolute;
  top: 0;
  z-index: 1;
  cursor: ew-resize;
}

.video-chat__list {
  overflow-y: auto;
  max-height: 100vh;
  display: grid;
  grid-gap: 20px;
  grid-template-rows: minmax(100px, auto);
  .video-chat__item { max-width: 500px; }
}
@media (min-width: 900px) {
  .video-chat__list { grid-template-columns: repeat(3, 1fr); }
}

@media (min-width: 600px) {
  .video-chat__list { grid-template-columns: repeat(2, 1fr); }
}
</style>