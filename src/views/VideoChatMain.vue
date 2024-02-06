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
  src: 'https://dosant.github.io/video.mp4',
  poster: '',
  muted: false
}, {
  userName: '밥풀',
  poster: '../assets/images/avatar_1.png',
  src: '',
  muted: true,
  isVideo: false
}, {
  userName: '까미',
  src: '',
  muted: false
}, {
  userName: '서리태',
  src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  muted: false
}, {
  userName: '흑미',
  src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  muted: false
}, {
  userName: '',
  src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  muted: true
}, {
  userName: '보리',
  poster: '../assets/images/avatar_2.png',
  muted: true,
  isVideo: false
}, {
  userName: '콩이',
  src: '',
  muted: false
}, {
  userName: '찹쌀이',
  src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  muted: true
}])

onMounted(() => {
  document.addEventListener('resize', recalculateVideoArea)
  // window.addEventListener('resize', onResize)
})

const handleDragging = (e: MouseEvent) => {
  const percentage = (e.pageX / window.innerWidth) * 100

  if (percentage >= 20 && percentage <= 80) {
    dividerPosition.value = percentage.toFixed(2)
  }
  recalculateVideoArea()
}
const startDragging = () => {
  document.addEventListener('mousemove', handleDragging)
}
const endDragging = () => {
  document.removeEventListener('mousemove', handleDragging)
}

const recalculateVideoArea = () => {
  if (videos.value && videosWrap?.value) {

    const videoAreaWidth = videosWrap.value.getBoundingClientRect().width * (+dividerPosition.value / 100)
    videos.value?.recalculateLayout(videoAreaWidth)
  }
}

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', handleDragging)
  document.removeEventListener('resize', recalculateVideoArea)
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
  height: calc(100vh - 20px);
  width: 2px;
  background: var(--section-divider-color);
  transform: translateX(-3px);
  position: absolute;
  top: 0;
  z-index: 1;
  cursor: ew-resize;
  &:hover { background: $primary; }
  &:active { background: $primary; }
}

.user-videos {
  padding: $header-height $gap 0;
  max-height: 100vh;
}

</style>