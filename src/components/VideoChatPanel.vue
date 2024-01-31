<template>
  <div class="video-panel">
    <video
      :src="props.src"
      class="video-panel__video" />
  </div>
</template>

<script setup lang="ts">
export interface Props {
  src?: string | undefined
}
const props = withDefaults(defineProps<Props>(), {
  src: ''
})

</script>

<style scoped lang="scss">
.video-panel {
  width: 100%;
  max-width: 500px;
  min-height: 300px;
  background-color: $primary;
  box-shadow: 0 4px 20px 0 rgba(224, 224, 224, 0.7);
}
</style>