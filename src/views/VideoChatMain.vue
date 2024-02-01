<template>
  <div
    class="video-chat__wrap"
    ref="videosWrap"
    @mouseup="endDragging()">
    <UserVideoList
      class="user-videos"
      :style="{
        width: `${dividerPosition}%`
      }"
      :user-list="userList"
      ref="videos" />
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
import { type Component, onMounted, onBeforeUnmount, ref } from 'vue'

import UserVideoList from '@/components/UserVideoList.vue'
import UserChatDrawer from '@/components/UserChatDrawer.vue'

const drawer = ref<Component | null>(null)
const videos = ref<InstanceType<typeof UserVideoList> | null>(null)
const videosWrap = ref<HTMLCanvasElement | null>(null)
const dividerPosition = ref<string | number>(50)
const userList = ref([{
  userName: '백미',
  src: 'https://dosant.github.io/video.mp4'
}, {
  userName: '밥풀',
  src: '../assets/images/avatar_1.png'
}, {
  userName: '까미',
  src: ''
}, {
  userName: '서리태',
  src: ''
}, {
  userName: '흑미',
  src: 'https://dosant.github.io/video.mp4'
}, {
  userName: '',
  src: ''
}, {
  userName: '보리',
  src: ''
}, {
  userName: '콩이',
  src: ''
}])

onMounted(() => {
  // window.addEventListener('resize', onResize)
})

const handleDragging = (e: MouseEvent) => {
  const percentage = (e.pageX / window.innerWidth) * 100

  if (percentage >= 10 && percentage <= 90) {
    dividerPosition.value = percentage.toFixed(2)
  }
  if (videos.value && videosWrap?.value) {
    const videoAreaWidth = videosWrap.value.getBoundingClientRect().width * (e.pageX / window.innerWidth)

    // debounce(function () { videos.value?.recalculateLayout(videoAreaWidth) }, 50)
    videos.value?.recalculateLayout(videoAreaWidth)
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
  padding-top: $header-height;
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

.user-videos {
  padding: $header-height $gap 0;
  max-height: 100vh;
}

</style>