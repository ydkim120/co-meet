<template>
  <div class="video-panel">
    <ol class="video-status__list">
      <li
        class="video-status__item"
        v-if="props.muted">
        <el-icon><Microphone /></el-icon>
      </li>
      <li
        class="video-status__item"
        v-if="!props.src">
        <el-icon><VideoCamera /></el-icon>
      </li>
    </ol>
    <!-- 비디오 소스 있고 비디오모드 일 때 -->
    <video
      v-if="props.src && props.isVideo"
      autoplay
      loop
      :muted="props.muted"
      :poster="getImageUrl(props.poster)"
      class="video-panel__video">
      <source
        :src="props.src"
        type="video/mp4" />
    </video>

    <!-- 썸네일 있고 비디오모드 아닐 때 -->
    <div
      class="video-panel__video __img"
      v-if="props.poster && !props.isVideo">
      <img
        :src="getImageUrl(props.poster)"
        alt="썸네일" />
    </div>

    <!-- 그 외 -->
    <div
      v-else
      class="video-panel__video __empty">
      <el-icon
        style="vertical-align: middle"
        size="40px">
        <Sugar />
      </el-icon>
    </div>
    <small class="video-panel__label">{{ props.userName || '알 수 없음' }}</small>
  </div>
</template>

<script setup lang="ts">
// import { VideoCamera, Mute, User } from '@element-plus/icons-vue'

export interface Props {
  userName: string,
  src?: string | undefined,
  poster?: string | undefined,
  muted?: boolean,
  isVideo?: boolean // 비디오 활성화 유무
}
const props = withDefaults(defineProps<Props>(), {
  userName: '',
  src: '',
  poster: '',
  muted: false,
  isVideo: true
})

const getImageUrl = (imgSrc: string) => {
  return new URL(imgSrc, import.meta.url).href
}

</script>

<style scoped lang="scss">
.video-panel {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: $gray-purple;
  border: 3px solid var(--background-color);
  border-radius: $radius;
  &__video {
    width: 100%;
    height: 100%;
    object-fit: fill;
    &[poster]{ 
      width: 100%;
      height: 100%;
    }
    &.__img {
      background-color: $dark-gray;
      text-align: center;
      img {
        width: auto;
        height: 100%;
      }
    }
    &.__empty {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: inherit;
      color: var(--text-color-white);
    }
  }
  &__label {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0 10px;
    background-color: rgba($color: #000000, $alpha: 0.5);
    color: var(--text-color-white);
    line-height: 24px;
  }
}

.video-status {
  &__list {
    position: absolute;
    bottom: $gap-s;
    left: $gap-s;
    display: flex;
    align-items: center;
    gap: $gap-xs;
    background-color: transparent;
  }
  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba($color: #000000, $alpha: 0.4);
    width: 30px;
    height: 30px;
    border-radius: 50%;
    font-size: 18px;
    color: var(--text-color-white);
    &::before {
      content: '';
      position: absolute;
      width: 20px;
      height: 1px;
      background-color: var(--text-color-white);
      transform: rotate(-45deg);
    }
  }
}
</style>