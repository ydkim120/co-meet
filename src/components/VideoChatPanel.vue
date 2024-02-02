<template>
  <div class="video-panel">
    <video
      v-if="props.src"
      :src="props.src"
      autoplay
      loop
      muted
      class="video-panel__video" />
    <div
      v-else
      class="video-panel__video __empty">
      <el-icon
        style="vertical-align: middle"
        size="40px"
        color="#fff">
        <VideoCamera />
      </el-icon>
    </div>
    <small class="video-panel__label">{{ props.userName || '알 수 없음' }}</small>
  </div>
</template>

<script setup lang="ts">
import { VideoCamera } from '@element-plus/icons-vue'
export interface Props {
  userName: string,
  src?: string | undefined
}
const props = withDefaults(defineProps<Props>(), {
  userName: '',
  src: 'https://dosant.github.io/video.mp4'
})

</script>

<style scoped lang="scss">
.video-panel {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
  // max-width: 500px;
  background-color: $gray-purple;
  border: 3px solid $background-color;
  // box-shadow: 0 4px 20px 0 rgba(224, 224, 224, 0.7);
  border-radius: $radius;
  &__video {
    width: 100%;
    height: 100%;
    object-fit: fill;
    &.__empty {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: inherit;
      // min-width: 500px;
    }
  }
  &__label {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0 10px;
    background-color: $black;
    color: $white;
    line-height: 24px;
  }
}
</style>