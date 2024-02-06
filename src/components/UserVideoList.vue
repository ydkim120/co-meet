<template>
  <ul
    class="user-video__list"
    ref="videoListRef">
    <li
      class="user-video__item"
      :style="{
        width: videoItemWidth + 'px',
        height: videoItemHeight + 'px'
      }"
      v-for="(video, idx) in props.userList"
      :key="idx">
      <VideoChatPanel
        :user-name="video.userName"
        :src="video.src"
        :poster="video.poster"
        :muted="video.muted"
        :is-video="video.isVideo" />
    </li>
  </ul> 
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { userVideoDefault } from '@/types'
import VideoChatPanel from '@/components/VideoChatPanel.vue'

export interface Props {
  userList?: Array<userVideoDefault>,
}

const props = withDefaults(defineProps<Props>(), {
  userList: []
})

const videoListRef = ref<HTMLCanvasElement | null>(null)
const videoItemWidth = ref(0)
const videoItemHeight = ref(0)

watch(props.userList, async () => {
  await nextTick()
  const gallery = videoListRef.value
  if (gallery) {
    const screenWidth = gallery?.getBoundingClientRect().width
    recalculateLayout(screenWidth)
  }
}, { immediate: true, deep: true })

const calculateLayout =(
  containerWidth: number,
  containerHeight: number,
  videoCount: number,
  aspectRatio: number
): { width: number; height: number; cols: number } => {
  let bestLayout = {
    area: 0,
    cols: 0,
    rows: 0,
    width: 0,
    height: 0
  }

  for (let cols = 1; cols <= videoCount; cols++) {
    const rows = Math.ceil(videoCount / cols)
    const hScale = containerWidth / (cols * aspectRatio)
    const vScale = containerHeight / rows
    let width
    let height
    if (hScale <= vScale) {
      width = Math.floor(containerWidth / cols)
      height = Math.floor(width / aspectRatio)
    } else {
      height = Math.floor(containerHeight / rows)
      width = Math.floor(height * aspectRatio)
    }
    const area = width * height
    if (area > bestLayout.area) {
      bestLayout = {
        area,
        width,
        height,
        rows,
        cols
      }
    }
  }
  return bestLayout
}

const recalculateLayout = (screenWidth: number) => {
    const gallery = videoListRef.value
    if (!gallery) return
    const aspectRatio = 16 / 9
    const screenHeight = gallery.getBoundingClientRect().height

    const screenWidthExceptPadding = screenWidth - 40
    const screenHeightExceptPadding = screenHeight - 80 

    const videoCount = props.userList.length

    const { width, height, cols } = calculateLayout(
      screenWidthExceptPadding,
      screenHeightExceptPadding,
      videoCount,
      aspectRatio
    )

    // if (videoListRef.value) videoListRef.value.style.maxWidth = (width * cols + 60) + 'px'
    videoItemWidth.value = width
    videoItemHeight.value = height

    // videoListRef.value.style.setProperty('--width', width + 'px')
    // videoListRef.value.style.setProperty('--height', height + 'px')
    // videoListRef.value.style.setProperty('--cols', cols + '')
}
defineExpose({
  recalculateLayout
})
</script>

<style scoped lang="scss">
.user-video__list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: auto $gap;
  width: 100%;
  // max-width: calc(var(--width) * var(--cols));
}
.user-video__item {
  // min-height: 300px;
  // min-width: 500px;
}

@media (min-width: 900px) {
  .user-video__list { grid-template-columns: repeat(3, 1fr); }
}

@media (min-width: 600px) {
  .user-video__list { grid-template-columns: repeat(2, 1fr); }
}
</style>